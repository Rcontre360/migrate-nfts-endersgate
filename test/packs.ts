import {ethers, network} from "hardhat";
import {getContractAddress} from "@ethersproject/address";
import {expect, assert} from "chai";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import {EndersGate, EndersPack} from "../types";
import {getPacksConfig} from "../utils/packs";

const hash = ethers.utils.id(Math.random().toString());
const URI = "https://some/url/";
const TEST_AMOUNT = 1;
let accountCount = 3;

describe("Packs ERC1155", function () {
  let endersGate: EndersGate, accounts: SignerWithAddress[], pack: EndersPack, library: any;
  const packsConfig = getPacksConfig();

  describe("Configuration", () => {
    it("Should deploy properly", async () => {
      library = await (await ethers.getContractFactory("LootBoxRandomness")).deploy();

      accounts = await ethers.getSigners();
      endersGate = (await (
        await ethers.getContractFactory("EndersGate")
      ).deploy("Enders Gate", "GATE", hash, "https://ipfs.io/ipfs/")) as EndersGate;
      pack = await (
        await ethers.getContractFactory("EndersPack", {
          libraries: {
            LootBoxRandomness: library.address,
          },
        })
      ).deploy("Enders Gate Pack", "PACK", URI, "https://ipfs.io/ipfs/");

      await endersGate.grantRole(await endersGate.MINTER_ROLE(), pack.address);
      await endersGate.mintBatch(pack.address, [0, 1, 2], [200, 200, 200], ["", "", ""]);
      await pack.setState(endersGate.address, packsConfig.NUM_CARDS, packsConfig.NUM_TYPES, 5);
    });

    it("Should set class for each card", async () => {
      for await (let i of packsConfig.cards) {
        await pack.setOptionSettings(
          i.id,
          i.mintLimit,
          i.types.map(({id}) => id),
          i.types.map(({inferiorLimit}) => inferiorLimit),
          i.types.map(({superiorLimit}) => superiorLimit)
        );
      }
      const testCard = packsConfig.cards[0];
      await expect(
        pack.connect(accounts[1]).setOptionSettings(
          testCard.id,
          testCard.mintLimit,
          testCard.types.map(({id}) => id),
          testCard.types.map(({inferiorLimit}) => inferiorLimit),
          testCard.types.map(({superiorLimit}) => superiorLimit)
        )
      ).to.be.revertedWith("");
    });

    it("Should set tokens for each type", async () => {
      for await (let i of packsConfig.types) await pack.setTokensForTypes(i.id, i.nftsIds);
      const testType = packsConfig.types[0];
      await expect(
        pack.connect(accounts[1]).setTokensForTypes(testType.id, testType.nftsIds)
      ).to.be.revertedWith("");
    });

    it("Only owner should mint packs normally", async () => {
      const mintId = packsConfig.COMMON_ID,
        amount = "100";
      await pack.mint(accounts[0].address, mintId, amount, []);

      await expect(
        pack.connect(accounts[1]).mint(accounts[0].address, mintId, amount, [])
      ).to.revertedWith("");
      expect(await pack.balanceOf(accounts[0].address, mintId)).to.be.equal(amount);
    });

    it("Only owner should mint batch packs normally", async () => {
      const mintIds = [packsConfig.RARE_ID, packsConfig.EPIC_ID, packsConfig.LEGENDARY_ID],
        amounts = mintIds.map(() => 100);
      await pack.mintBatch(accounts[0].address, mintIds, amounts, []);
      const balances = await pack.balanceOfBatch(
        mintIds.map(() => accounts[0].address),
        mintIds
      );

      await expect(
        pack.connect(accounts[1]).mint(accounts[0].address, mintIds, amounts, [])
      ).to.revertedWith("");
      assert(
        balances.every((bal, i) => bal.toString() === amounts[i].toString()),
        "Wrong balances"
      );
    });
  });

  describe("Unpack nfts", () => {
    const errorMargin = 1000; // 10%%
    const isWithinMargin = (amount: number, realAmount: number) => {
      const lowerBound = amount - (amount / 1000) * errorMargin;
      const upperBound = amount + (amount / 1000) * errorMargin;
      return lowerBound < realAmount && upperBound > realAmount;
    };

    it("COMMON_PACK: individual quantities", async () => {
      const option = packsConfig.COMMON_ID,
        amount = TEST_AMOUNT,
        card = packsConfig.getCard(packsConfig.COMMON_ID);

      for (let i = 0; i < amount; i++) {
        const account = accounts[accountCount++];
        await pack.mint(account.address, option, amount, []);
        const receipt = await (await pack.connect(account).unpack(option, 1)).wait();

        const {types, sent, typesByID} = packsConfig.getCountsInReceipt(receipt, endersGate);
        const actualBalance = await endersGate.balanceOfBatch(
          sent.map(() => account.address),
          sent.map(({id}) => id)
        );

        const mintCorrectly = sent.every(
          ({amount}, i) => amount === actualBalance[i].toNumber()
        );
        const guaranteed = card.types.every(
          (typ) => typ.inferiorLimit <= (typesByID[typ.id] || 0)
        );
        const superiorLimit = card.types.every(
          (typ) => typ.superiorLimit >= (typesByID[typ.id] || 0)
        );

        if (!mintCorrectly || !guaranteed || !superiorLimit) {
          console.log(types, sent, actualBalance, {
            mintCorrectly,
            guaranteed,
            superiorLimit,
          });
          throw new Error("yikes");
        }
        assert(mintCorrectly, "Mint correctly");
        assert(guaranteed, "Not guaranteed");
        assert(superiorLimit, "Superior limit");
      }
    });

    it("COMMON_PACK: overall quantities", async () => {
      const account = accounts[accountCount++];
      const option = packsConfig.COMMON_ID,
        amount = TEST_AMOUNT,
        card = packsConfig.getCard(packsConfig.COMMON_ID);
      await pack.mint(account.address, option, amount, []);
      const receipt = await (await pack.connect(account).unpack(option, amount)).wait();

      const {types, sent, typesByID} = packsConfig.getCountsInReceipt(receipt, endersGate);
      const actualBalance = await endersGate.balanceOfBatch(
        sent.map(() => account.address),
        sent.map(({id}) => id)
      );
      const mintAmount = actualBalance.reduce((acc, cur) => acc + cur.toNumber(), 0);

      expect(mintAmount, "Incorrect mint amount").to.be.equal(amount * 5);
      expect(
        Object.values(types).reduce((acc, cur) => acc + cur, 0),
        "Mint amount mismatch"
      ).to.be.equal(mintAmount);
    });

    it("RARE_PACK:individual quantities", async () => {
      const option = packsConfig.RARE_ID,
        amount = TEST_AMOUNT,
        card = packsConfig.getCard(packsConfig.RARE_ID);

      for (let i = 0; i < amount; i++) {
        const account = accounts[accountCount++];
        await pack.mint(account.address, option, amount, []);
        const receipt = await (await pack.connect(account).unpack(option, 1)).wait();

        const {types, sent, typesByID} = packsConfig.getCountsInReceipt(receipt, endersGate);
        const actualBalance = await endersGate.balanceOfBatch(
          sent.map(() => account.address),
          sent.map(({id}) => id)
        );

        const mintCorrectly = sent.every(
          ({amount}, i) => amount === actualBalance[i].toNumber()
        );
        const guaranteed = card.types.every(
          (typ) => typ.inferiorLimit <= (typesByID[typ.id] || 0)
        );
        const superiorLimit = card.types.every(
          (typ) => typ.superiorLimit >= (typesByID[typ.id] || 0)
        );

        if (!mintCorrectly || !guaranteed || !superiorLimit) {
          console.log(types, sent, actualBalance, {
            mintCorrectly,
            guaranteed,
            superiorLimit,
          });
          throw new Error("yikes");
        }
        assert(mintCorrectly, "Mint correctly");
        assert(guaranteed, "Not guaranteed");
        assert(superiorLimit, "Superior limit");
      }
    });

    it("RARE_PACK: overall quantities", async () => {
      const account = accounts[accountCount++];
      const option = packsConfig.RARE_ID,
        amount = TEST_AMOUNT,
        card = packsConfig.getCard(packsConfig.RARE_ID);
      await pack.mint(account.address, option, amount, []);
      const receipt = await (await pack.connect(account).unpack(option, amount)).wait();

      const {types, sent} = packsConfig.getCountsInReceipt(receipt, endersGate);
      const actualBalance = await endersGate.balanceOfBatch(
        sent.map(() => account.address),
        sent.map(({id}) => id)
      );
      const mintAmount = actualBalance.reduce((acc, cur) => acc + cur.toNumber(), 0);

      expect(mintAmount, "Incorrect mint amount").to.be.equal(amount * 5);
      expect(
        Object.values(types).reduce((acc, cur) => acc + cur, 0),
        "Mint amount mismatch"
      ).to.be.equal(mintAmount);
    });

    it("EPIC_PACK:individual quantities", async () => {
      const option = packsConfig.EPIC_ID,
        amount = TEST_AMOUNT,
        card = packsConfig.getCard(packsConfig.EPIC_ID);

      for (let i = 0; i < amount; i++) {
        const account = accounts[accountCount++];
        await pack.mint(account.address, option, amount, []);
        const receipt = await (await pack.connect(account).unpack(option, 1)).wait();

        const {types, sent, typesByID} = packsConfig.getCountsInReceipt(receipt, endersGate);
        const actualBalance = await endersGate.balanceOfBatch(
          sent.map(() => account.address),
          sent.map(({id}) => id)
        );

        const mintCorrectly = sent.every(
          ({amount}, i) => amount === actualBalance[i].toNumber()
        );
        const guaranteed = card.types.every(
          (typ) => typ.inferiorLimit <= (typesByID[typ.id] || 0)
        );
        const superiorLimit = card.types.every(
          (typ) => typ.superiorLimit >= (typesByID[typ.id] || 0)
        );

        if (!mintCorrectly || !guaranteed || !superiorLimit) {
          console.log(types, sent, actualBalance, {
            mintCorrectly,
            guaranteed,
            superiorLimit,
          });
          throw new Error("yikes");
        }
        assert(mintCorrectly, "Mint correctly");
        assert(guaranteed, "Not guaranteed");
        assert(superiorLimit, "Superior limit");
      }
    });

    it("EPIC_PACK: overall quantities", async () => {
      const account = accounts[accountCount++];
      const option = packsConfig.EPIC_ID,
        amount = TEST_AMOUNT,
        card = packsConfig.getCard(packsConfig.EPIC_ID);
      await pack.mint(account.address, option, amount, []);
      const receipt = await (await pack.connect(account).unpack(option, amount)).wait();

      const {types, sent} = packsConfig.getCountsInReceipt(receipt, endersGate);
      const actualBalance = await endersGate.balanceOfBatch(
        sent.map(() => account.address),
        sent.map(({id}) => id)
      );
      const mintAmount = actualBalance.reduce((acc, cur) => acc + cur.toNumber(), 0);

      expect(mintAmount, "Incorrect mint amount").to.be.equal(amount * 5);
      expect(
        Object.values(types).reduce((acc, cur) => acc + cur, 0),
        "Mint amount mismatch"
      ).to.be.equal(mintAmount);
    });

    it("LEGENDARY_PACK:individual quantities", async () => {
      const option = packsConfig.LEGENDARY_ID,
        amount = TEST_AMOUNT,
        card = packsConfig.getCard(packsConfig.LEGENDARY_ID);

      for (let i = 0; i < amount; i++) {
        const account = accounts[accountCount++];
        await pack.mint(account.address, option, amount, []);
        const receipt = await (await pack.connect(account).unpack(option, 1)).wait();

        const {types, sent, typesByID} = packsConfig.getCountsInReceipt(receipt, endersGate);
        const actualBalance = await endersGate.balanceOfBatch(
          sent.map(() => account.address),
          sent.map(({id}) => id)
        );

        const mintCorrectly = sent.every(
          ({amount}, i) => amount === actualBalance[i].toNumber()
        );
        const guaranteed = card.types.every(
          (typ) => typ.inferiorLimit <= (typesByID[typ.id] || 0)
        );
        const superiorLimit = card.types.every(
          (typ) => typ.superiorLimit >= (typesByID[typ.id] || 0)
        );

        if (!mintCorrectly || !guaranteed || !superiorLimit) {
          console.log(types, sent, actualBalance, {
            mintCorrectly,
            guaranteed,
            superiorLimit,
          });
          throw new Error("yikes");
        }
        assert(mintCorrectly, "Mint correctly");
        assert(guaranteed, "Not guaranteed");
        assert(superiorLimit, "Superior limit");
      }
    });

    it("LEGENDARY_PACK: overall quantities", async () => {
      const account = accounts[accountCount++];
      const option = packsConfig.LEGENDARY_ID,
        amount = TEST_AMOUNT,
        card = packsConfig.getCard(packsConfig.LEGENDARY_ID);
      await pack.mint(account.address, option, amount, []);
      const receipt = await (await pack.connect(account).unpack(option, amount)).wait();

      const {types, sent} = packsConfig.getCountsInReceipt(receipt, endersGate);
      const actualBalance = await endersGate.balanceOfBatch(
        sent.map(() => account.address),
        sent.map(({id}) => id)
      );
      const mintAmount = actualBalance.reduce((acc, cur) => acc + cur.toNumber(), 0);

      expect(mintAmount, "Incorrect mint amount").to.be.equal(amount * 5);
      expect(
        Object.values(types).reduce((acc, cur) => acc + cur, 0),
        "Mint amount mismatch"
      ).to.be.equal(mintAmount);
    });
  });

  describe("URI settings and minting/burning", async () => {
    it("Should set uri for only setter role", async () => {
      await pack.setURI(URI);
      await expect(pack.connect(accounts[1]).setURI("SOME FALCE URI")).to.revertedWith("");
      expect(await pack.tokenURIPrefix(), "URI Not set properly").to.be.equal(URI);
    });

    it("Should set ipfs only setter role", async () => {
      const ids = [1];
      const hashes = [ethers.utils.id(Math.random().toString())];

      await expect(pack.connect(accounts[1]).setIpfsHashBatch(ids, hashes)).to.revertedWith(
        ""
      );
      await expect(pack.setIpfsHashBatch(ids, hashes)).to.not.revertedWith("");
      expect(await pack.uri(ids[0])).to.be.equal(URI + hashes[0]);
    });

    it("Should burn tokens", async () => {
      const balance = await pack.balanceOf(accounts[0].address, packsConfig.COMMON_ID);
      await pack.burn(accounts[0].address, packsConfig.COMMON_ID, 1);
      const currentBalance = await pack.balanceOf(accounts[0].address, packsConfig.COMMON_ID);

      expect(balance.sub(1).toString()).to.equal(currentBalance.toString());
    });

    it("Should burn batch tokens", async () => {
      const balances = await pack.balanceOfBatch(
        [accounts[0].address, accounts[0].address],
        [packsConfig.COMMON_ID, packsConfig.LEGENDARY_ID]
      );
      await pack.burnBatch(
        accounts[0].address,
        [packsConfig.COMMON_ID, packsConfig.LEGENDARY_ID],
        [1, 1]
      );
      const currentBalances = await pack.balanceOfBatch(
        [accounts[0].address, accounts[0].address],
        [packsConfig.COMMON_ID, packsConfig.LEGENDARY_ID]
      );

      balances.forEach((bal, i) => {
        expect(bal.sub(1).toString()).to.equal(currentBalances[i].toString());
      });
    });
  });

  describe("Packs should emmit correct events", async () => {
    it("Should have fired the unpack event on this block", async () => {
      await network.provider.send("evm_mine");

      const account = accounts[accountCount++];
      const option = packsConfig.COMMON_ID,
        amount = 10;
      await pack.mint(account.address, option, amount, []);
      const currentBlock = await ethers.provider.getBlockNumber();

      await (await pack.connect(account).unpack(option, amount)).wait();

      const packLogs = (
        await ethers.provider.getLogs({address: pack.address, fromBlock: currentBlock})
      ).map((ev) => pack.interface.parseLog(ev));
      const nftLogs = (
        await ethers.provider.getLogs({address: endersGate.address, fromBlock: currentBlock})
      ).map((ev) => endersGate.interface.parseLog(ev));

      expect(packLogs.filter(({name}) => name === "LootBoxOpened").length).to.be.equal(
        amount
      );
      expect(nftLogs.filter(({name}) => name === "TransferSingle").length).to.be.equal(
        amount * 5
      );
    });
  });

  describe("Security checks", async () => {
    it("Should not allow contracts to unpack", async () => {
      const amount = 10;
      const ID = packsConfig.COMMON_ID;
      const accountContract = await (await ethers.getContractFactory("Account")).deploy();

      const signature = pack.interface.encodeFunctionData("unpack", [ID, amount]);

      await pack.safeTransferFrom(
        accounts[0].address,
        accountContract.address,
        ID,
        amount,
        []
      );
      await expect(
        accountContract.execute([pack.address], [0], [signature])
      ).to.be.revertedWith("");
    });

    it("Should not allow contracts to unpack from constructor", async () => {
      const amount = 10;
      const ID = packsConfig.COMMON_ID;
      const signature = pack.interface.encodeFunctionData("unpack", [ID, amount]);
      const nonce = await accounts[0].getTransactionCount();

      const futureAddress = getContractAddress({
        from: accounts[0].address,
        nonce,
      });
      await pack.safeTransferFrom(accounts[0].address, futureAddress, ID, amount, []);
      await expect(
        (
          await ethers.getContractFactory("AccountConstructor")
        ).deploy([pack.address], [0], [signature])
        , 'Not unpack').to.be.revertedWith("");
    });
  });
});
