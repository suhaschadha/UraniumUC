var Web3 = require('web3');
var NodeURL = "http://13.126.168.128:22000";
var account = '0xed9d02e382b34818e88b88a309c7fe71e65f419d';
var PrivateTo = "ROAZBWtSacxXQrOe3FGAqJDyJjFePR5ce4TSIzmJ0Bc=";
var dbUrl = require("../config/db");
var contractFolder = '../contract/';
var abiDefination = require('../config/abi');
var mongojs = require("mongojs");

function GetContract() {
SetWeb3();
ContractCM = web3.eth.contract(abiandcode.abi).at(address);
}

function SetWeb3() {
if (typeof web3 !== 'undefined') { web3 = new Web3(web3.currentProvider); }
else { web3 = new Web3(new Web3.providers.HttpProvider(NodeURL)); }
} 

module.exports = {


  getData : function(Data_ID,callback) {
    var db = mongojs(dbUrl.url, ['SmartContract']);
    //db.SmartContracst.findOne({ contractid: Data_ID }, function (err, docc) {
      db.SmartContract.findOne({ contractid: Data_ID }, function (err, docc) {
      if (docc) {
        if (typeof web3 !== 'undefined') {
          web3 = new Web3(web3.currentProvider);
        }
        else {
          web3 = new Web3(new Web3.providers.HttpProvider(NodeURL));
        }
       var ContractAddress = docc.contractaddress;
       var abi = docc.abi;
       var MyContract = web3.eth.contract(abi).at(ContractAddress);
       //var Data = JSON.parse(MyContract.getHashData(Data_ID));
       //var Data = JSON.parse(MyContract.RealData(),MyContract.HashData(),MyContract.FileHash(),MyContract.blockNumber());
      var Data =[MyContract.RealData(),MyContract.HashData(),MyContract.FileHash(),MyContract.blockNumber()];
       db.close();
      callback(Data);
      }
      });
  },

  saveData : function(Data_ID, RealData, HashData, FileHash, callback){
    if (typeof web3 !== 'undefined') { web3 = new Web3(web3.currentProvider); }
    else { web3 = new Web3(new Web3.providers.HttpProvider(NodeURL)); }
    web3.eth.defaultAccount = account;
    var Bytecode = "608060405234801561001057600080fd5b506040516106f83803806106f88339810180604052810190808051820192919060200180518201929190602001805182019291906020018051820192919050505083600090805190602001906100679291906100bd565b50826001908051906020019061007e9291906100bd565b5081600290805190602001906100959291906100bd565b5080600390805190602001906100ac9291906100bd565b504360048190555050505050610162565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100fe57805160ff191683800117855561012c565b8280016001018555821561012c579182015b8281111561012b578251825591602001919060010190610110565b5b509050610139919061013d565b5090565b61015f91905b8082111561015b576000816000905550600101610143565b5090565b90565b610587806101716000396000f30060806040526004361061006d576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631bbc661214610072578063475169101461010257806357e871e714610192578063991ffe33146101bd578063f024412e1461024d575b600080fd5b34801561007e57600080fd5b506100876102dd565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100c75780820151818401526020810190506100ac565b50505050905090810190601f1680156100f45780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561010e57600080fd5b5061011761037b565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561015757808201518184015260208101905061013c565b50505050905090810190601f1680156101845780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561019e57600080fd5b506101a7610419565b6040518082815260200191505060405180910390f35b3480156101c957600080fd5b506101d261041f565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102125780820151818401526020810190506101f7565b50505050905090810190601f16801561023f5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561025957600080fd5b506102626104bd565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102a2578082015181840152602081019050610287565b50505050905090810190601f1680156102cf5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103735780601f1061034857610100808354040283529160200191610373565b820191906000526020600020905b81548152906001019060200180831161035657829003601f168201915b505050505081565b60038054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104115780601f106103e657610100808354040283529160200191610411565b820191906000526020600020905b8154815290600101906020018083116103f457829003601f168201915b505050505081565b60045481565b60028054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104b55780601f1061048a576101008083540402835291602001916104b5565b820191906000526020600020905b81548152906001019060200180831161049857829003601f168201915b505050505081565b60018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105535780601f1061052857610100808354040283529160200191610553565b820191906000526020600020905b81548152906001019060200180831161053657829003601f168201915b5050505050815600a165627a7a723058209866afed38561f0a78c1b54a4565adf984809dab4c7dff46407992339e7cea070029";
    var simpleContract =web3.eth.contract(abiDefination.abi);
    var simple = simpleContract.new(JSON.stringify(Data_ID), JSON.stringify(RealData),JSON.stringify(HashData), JSON.stringify(FileHash), { from: web3.eth.defaultAccount, data: Bytecode, gas: 30000000, privateFor: [PrivateTo] }, function (e, contract) {
      if (e) {
        console.log("err creating contract:", e);
      } else {
        if (!contract.address) {
          var transactionHash = contract.transactionHash;
          var contractaddress = contract.address;
          console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
        } else {
          var transactionHash = contract.transactionHash;
          var contractaddress = contract.address;
          console.log("Contract mined! Address: " + contract.address);
          //Save all the contract details in MongoDB
          var db = mongojs(dbUrl.url, ['SmartContract']);
          var cData = { 'contractid': JSON.stringify(Data_ID).replace(/"/g, ""),  'abi': abiDefination.abi, 'contractaddress': contractaddress, 'contracthash': transactionHash };
          db.SmartContract.insert(cData, function (err, doc) {
            if (err) { console.log(" Woops! The error took place here... "); }
            else { db.close(); //callback('ok', doc);
           callback("Saved");
          }
          });
        }
      }
    });
    
  }

};

/*

 var mongojs = require('mongojs');
    var db = mongojs(dbUrl.url, ['SmartContractNuclearFuel']);
    db.SmartContracst.findOne({ contractid: Data_ID }, function (err, docc) {
      if (docc) {
        if (typeof web3 !== 'undefined') {
          web3 = new Web3(web3.currentProvider);
        }
        else {
          web3 = new Web3(new Web3.providers.HttpProvider(NodeURL));
        }
       var ContractAddress = docc.contractaddress;
       var abi = docc.abi;
       var MyContract = web3.eth.contract(abi).at(ContractAddress);
       var flag = MyContract.addHashdata(JSON.stringify(Data_ID), JSON.stringify(RealData),JSON.stringify(HashData), JSON.stringify(FileHash), { from: web3.eth.coinbase, gas: 60000000, privateFor: [PrivateTo] });
      db.close();
       callback(flag);
      }
    });



module.exports = {
   getData : function(Data_ID,callback) {
    UraniumContract.getHashData(Data_ID, function (error, result) {
      if (error) { throw error }
      callback(result);
    });
  },
  saveData : function(Data_ID, RealData, HashData, FileHash, callback){
    UraniumContract.addHashdata(Data_ID, RealData, HashData, FileHash,function(error,result){
      if(error){throw error;}
      callback("Saved");
    });
  }
};
*/