/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ERC1155Upgradeable,
  ERC1155UpgradeableInterface,
} from "../ERC1155Upgradeable";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50612599806100206000396000f3fe608060405234801561001057600080fd5b50600436106100875760003560e01c80634e1273f41161005b5780634e1273f414610138578063a22cb46514610168578063e985e9c514610184578063f242432a146101b457610087565b8062fdd58e1461008c57806301ffc9a7146100bc5780630e89341c146100ec5780632eb2c2d61461011c575b600080fd5b6100a660048036038101906100a1919061138d565b6101d0565b6040516100b391906113dc565b60405180910390f35b6100d660048036038101906100d1919061144f565b61029a565b6040516100e39190611497565b60405180910390f35b610106600480360381019061010191906114b2565b61037c565b6040516101139190611578565b60405180910390f35b61013660048036038101906101319190611797565b610410565b005b610152600480360381019061014d9190611929565b6104b1565b60405161015f9190611a5f565b60405180910390f35b610182600480360381019061017d9190611aad565b6105ca565b005b61019e60048036038101906101999190611aed565b6105e0565b6040516101ab9190611497565b60405180910390f35b6101ce60048036038101906101c99190611b2d565b610674565b005b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610241576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161023890611c36565b60405180910390fd5b6065600083815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b60007fd9b67a26000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061036557507f0e89341c000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b80610375575061037482610715565b5b9050919050565b60606067805461038b90611c85565b80601f01602080910402602001604051908101604052809291908181526020018280546103b790611c85565b80156104045780601f106103d957610100808354040283529160200191610404565b820191906000526020600020905b8154815290600101906020018083116103e757829003601f168201915b50505050509050919050565b61041861077f565b73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16148061045e575061045d8561045861077f565b6105e0565b5b61049d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161049490611d29565b60405180910390fd5b6104aa8585858585610787565b5050505050565b606081518351146104f7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104ee90611dbb565b60405180910390fd5b6000835167ffffffffffffffff8111156105145761051361159f565b5b6040519080825280602002602001820160405280156105425781602001602082028036833780820191505090505b50905060005b84518110156105bf5761058f85828151811061056757610566611ddb565b5b602002602001015185838151811061058257610581611ddb565b5b60200260200101516101d0565b8282815181106105a2576105a1611ddb565b5b602002602001018181525050806105b890611e39565b9050610548565b508091505092915050565b6105dc6105d561077f565b8383610a9e565b5050565b6000606660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b61067c61077f565b73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614806106c257506106c1856106bc61077f565b6105e0565b5b610701576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106f890611ef4565b60405180910390fd5b61070e8585858585610c0b565b5050505050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b600033905090565b81518351146107cb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107c290611f86565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141561083b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161083290612018565b60405180910390fd5b600061084561077f565b9050610855818787878787610e90565b60005b8451811015610a0957600085828151811061087657610875611ddb565b5b60200260200101519050600085838151811061089557610894611ddb565b5b6020026020010151905060006065600084815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610937576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161092e906120aa565b60405180910390fd5b8181036065600085815260200190815260200160002060008c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816065600085815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546109ee91906120ca565b9250508190555050505080610a0290611e39565b9050610858565b508473ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8787604051610a80929190612120565b60405180910390a4610a96818787878787610e98565b505050505050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610b0d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b04906121c9565b60405180910390fd5b80606660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051610bfe9190611497565b60405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161415610c7b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c7290612018565b60405180910390fd5b6000610c8561077f565b9050610ca5818787610c9688611070565b610c9f88611070565b87610e90565b60006065600086815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905083811015610d3d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d34906120aa565b60405180910390fd5b8381036065600087815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550836065600087815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610df491906120ca565b925050819055508573ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f628888604051610e719291906121e9565b60405180910390a4610e878288888888886110ea565b50505050505050565b505050505050565b610eb78473ffffffffffffffffffffffffffffffffffffffff166112c2565b15611068578373ffffffffffffffffffffffffffffffffffffffff1663bc197c8187878686866040518663ffffffff1660e01b8152600401610efd959493929190612276565b6020604051808303816000875af1925050508015610f3957506040513d601f19601f82011682018060405250810190610f3691906122f3565b60015b610fdf57610f4561232d565b806308c379a01415610fa25750610f5a61234f565b80610f655750610fa4565b806040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f999190611578565b60405180910390fd5b505b6040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fd690612457565b60405180910390fd5b63bc197c8160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614611066576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161105d906124e9565b60405180910390fd5b505b505050505050565b60606000600167ffffffffffffffff81111561108f5761108e61159f565b5b6040519080825280602002602001820160405280156110bd5781602001602082028036833780820191505090505b50905082816000815181106110d5576110d4611ddb565b5b60200260200101818152505080915050919050565b6111098473ffffffffffffffffffffffffffffffffffffffff166112c2565b156112ba578373ffffffffffffffffffffffffffffffffffffffff1663f23a6e6187878686866040518663ffffffff1660e01b815260040161114f959493929190612509565b6020604051808303816000875af192505050801561118b57506040513d601f19601f8201168201806040525081019061118891906122f3565b60015b6112315761119761232d565b806308c379a014156111f457506111ac61234f565b806111b757506111f6565b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111eb9190611578565b60405180910390fd5b505b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161122890612457565b60405180910390fd5b63f23a6e6160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916146112b8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112af906124e9565b60405180910390fd5b505b505050505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611324826112f9565b9050919050565b61133481611319565b811461133f57600080fd5b50565b6000813590506113518161132b565b92915050565b6000819050919050565b61136a81611357565b811461137557600080fd5b50565b60008135905061138781611361565b92915050565b600080604083850312156113a4576113a36112ef565b5b60006113b285828601611342565b92505060206113c385828601611378565b9150509250929050565b6113d681611357565b82525050565b60006020820190506113f160008301846113cd565b92915050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b61142c816113f7565b811461143757600080fd5b50565b60008135905061144981611423565b92915050565b600060208284031215611465576114646112ef565b5b60006114738482850161143a565b91505092915050565b60008115159050919050565b6114918161147c565b82525050565b60006020820190506114ac6000830184611488565b92915050565b6000602082840312156114c8576114c76112ef565b5b60006114d684828501611378565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156115195780820151818401526020810190506114fe565b83811115611528576000848401525b50505050565b6000601f19601f8301169050919050565b600061154a826114df565b61155481856114ea565b93506115648185602086016114fb565b61156d8161152e565b840191505092915050565b60006020820190508181036000830152611592818461153f565b905092915050565b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6115d78261152e565b810181811067ffffffffffffffff821117156115f6576115f561159f565b5b80604052505050565b60006116096112e5565b905061161582826115ce565b919050565b600067ffffffffffffffff8211156116355761163461159f565b5b602082029050602081019050919050565b600080fd5b600061165e6116598461161a565b6115ff565b9050808382526020820190506020840283018581111561168157611680611646565b5b835b818110156116aa57806116968882611378565b845260208401935050602081019050611683565b5050509392505050565b600082601f8301126116c9576116c861159a565b5b81356116d984826020860161164b565b91505092915050565b600080fd5b600067ffffffffffffffff8211156117025761170161159f565b5b61170b8261152e565b9050602081019050919050565b82818337600083830152505050565b600061173a611735846116e7565b6115ff565b905082815260208101848484011115611756576117556116e2565b5b611761848285611718565b509392505050565b600082601f83011261177e5761177d61159a565b5b813561178e848260208601611727565b91505092915050565b600080600080600060a086880312156117b3576117b26112ef565b5b60006117c188828901611342565b95505060206117d288828901611342565b945050604086013567ffffffffffffffff8111156117f3576117f26112f4565b5b6117ff888289016116b4565b935050606086013567ffffffffffffffff8111156118205761181f6112f4565b5b61182c888289016116b4565b925050608086013567ffffffffffffffff81111561184d5761184c6112f4565b5b61185988828901611769565b9150509295509295909350565b600067ffffffffffffffff8211156118815761188061159f565b5b602082029050602081019050919050565b60006118a56118a084611866565b6115ff565b905080838252602082019050602084028301858111156118c8576118c7611646565b5b835b818110156118f157806118dd8882611342565b8452602084019350506020810190506118ca565b5050509392505050565b600082601f8301126119105761190f61159a565b5b8135611920848260208601611892565b91505092915050565b600080604083850312156119405761193f6112ef565b5b600083013567ffffffffffffffff81111561195e5761195d6112f4565b5b61196a858286016118fb565b925050602083013567ffffffffffffffff81111561198b5761198a6112f4565b5b611997858286016116b4565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6119d681611357565b82525050565b60006119e883836119cd565b60208301905092915050565b6000602082019050919050565b6000611a0c826119a1565b611a1681856119ac565b9350611a21836119bd565b8060005b83811015611a52578151611a3988826119dc565b9750611a44836119f4565b925050600181019050611a25565b5085935050505092915050565b60006020820190508181036000830152611a798184611a01565b905092915050565b611a8a8161147c565b8114611a9557600080fd5b50565b600081359050611aa781611a81565b92915050565b60008060408385031215611ac457611ac36112ef565b5b6000611ad285828601611342565b9250506020611ae385828601611a98565b9150509250929050565b60008060408385031215611b0457611b036112ef565b5b6000611b1285828601611342565b9250506020611b2385828601611342565b9150509250929050565b600080600080600060a08688031215611b4957611b486112ef565b5b6000611b5788828901611342565b9550506020611b6888828901611342565b9450506040611b7988828901611378565b9350506060611b8a88828901611378565b925050608086013567ffffffffffffffff811115611bab57611baa6112f4565b5b611bb788828901611769565b9150509295509295909350565b7f455243313135353a2062616c616e636520717565727920666f7220746865207a60008201527f65726f2061646472657373000000000000000000000000000000000000000000602082015250565b6000611c20602b836114ea565b9150611c2b82611bc4565b604082019050919050565b60006020820190508181036000830152611c4f81611c13565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680611c9d57607f821691505b60208210811415611cb157611cb0611c56565b5b50919050565b7f455243313135353a207472616e736665722063616c6c6572206973206e6f742060008201527f6f776e6572206e6f7220617070726f7665640000000000000000000000000000602082015250565b6000611d136032836114ea565b9150611d1e82611cb7565b604082019050919050565b60006020820190508181036000830152611d4281611d06565b9050919050565b7f455243313135353a206163636f756e747320616e6420696473206c656e67746860008201527f206d69736d617463680000000000000000000000000000000000000000000000602082015250565b6000611da56029836114ea565b9150611db082611d49565b604082019050919050565b60006020820190508181036000830152611dd481611d98565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611e4482611357565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415611e7757611e76611e0a565b5b600182019050919050565b7f455243313135353a2063616c6c6572206973206e6f74206f776e6572206e6f7260008201527f20617070726f7665640000000000000000000000000000000000000000000000602082015250565b6000611ede6029836114ea565b9150611ee982611e82565b604082019050919050565b60006020820190508181036000830152611f0d81611ed1565b9050919050565b7f455243313135353a2069647320616e6420616d6f756e7473206c656e6774682060008201527f6d69736d61746368000000000000000000000000000000000000000000000000602082015250565b6000611f706028836114ea565b9150611f7b82611f14565b604082019050919050565b60006020820190508181036000830152611f9f81611f63565b9050919050565b7f455243313135353a207472616e7366657220746f20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b60006120026025836114ea565b915061200d82611fa6565b604082019050919050565b6000602082019050818103600083015261203181611ff5565b9050919050565b7f455243313135353a20696e73756666696369656e742062616c616e636520666f60008201527f72207472616e7366657200000000000000000000000000000000000000000000602082015250565b6000612094602a836114ea565b915061209f82612038565b604082019050919050565b600060208201905081810360008301526120c381612087565b9050919050565b60006120d582611357565b91506120e083611357565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561211557612114611e0a565b5b828201905092915050565b6000604082019050818103600083015261213a8185611a01565b9050818103602083015261214e8184611a01565b90509392505050565b7f455243313135353a2073657474696e6720617070726f76616c2073746174757360008201527f20666f722073656c660000000000000000000000000000000000000000000000602082015250565b60006121b36029836114ea565b91506121be82612157565b604082019050919050565b600060208201905081810360008301526121e2816121a6565b9050919050565b60006040820190506121fe60008301856113cd565b61220b60208301846113cd565b9392505050565b61221b81611319565b82525050565b600081519050919050565b600082825260208201905092915050565b600061224882612221565b612252818561222c565b93506122628185602086016114fb565b61226b8161152e565b840191505092915050565b600060a08201905061228b6000830188612212565b6122986020830187612212565b81810360408301526122aa8186611a01565b905081810360608301526122be8185611a01565b905081810360808301526122d2818461223d565b90509695505050505050565b6000815190506122ed81611423565b92915050565b600060208284031215612309576123086112ef565b5b6000612317848285016122de565b91505092915050565b60008160e01c9050919050565b600060033d111561234c5760046000803e612349600051612320565b90505b90565b600060443d101561235f576123e2565b6123676112e5565b60043d036004823e80513d602482011167ffffffffffffffff8211171561238f5750506123e2565b808201805167ffffffffffffffff8111156123ad57505050506123e2565b80602083010160043d0385018111156123ca5750505050506123e2565b6123d9826020018501866115ce565b82955050505050505b90565b7f455243313135353a207472616e7366657220746f206e6f6e204552433131353560008201527f526563656976657220696d706c656d656e746572000000000000000000000000602082015250565b60006124416034836114ea565b915061244c826123e5565b604082019050919050565b6000602082019050818103600083015261247081612434565b9050919050565b7f455243313135353a204552433131353552656365697665722072656a6563746560008201527f6420746f6b656e73000000000000000000000000000000000000000000000000602082015250565b60006124d36028836114ea565b91506124de82612477565b604082019050919050565b60006020820190508181036000830152612502816124c6565b9050919050565b600060a08201905061251e6000830188612212565b61252b6020830187612212565b61253860408301866113cd565b61254560608301856113cd565b8181036080830152612557818461223d565b9050969550505050505056fea2646970667358221220eeb4b245ce68d829f11b1d74451eb7720f0e9a13bb01e04547fb731a1df86f1c64736f6c634300080a0033";

type ERC1155UpgradeableConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC1155UpgradeableConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC1155Upgradeable__factory extends ContractFactory {
  constructor(...args: ERC1155UpgradeableConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ERC1155Upgradeable> {
    return super.deploy(overrides || {}) as Promise<ERC1155Upgradeable>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ERC1155Upgradeable {
    return super.attach(address) as ERC1155Upgradeable;
  }
  connect(signer: Signer): ERC1155Upgradeable__factory {
    return super.connect(signer) as ERC1155Upgradeable__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC1155UpgradeableInterface {
    return new utils.Interface(_abi) as ERC1155UpgradeableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC1155Upgradeable {
    return new Contract(address, _abi, signerOrProvider) as ERC1155Upgradeable;
  }
}