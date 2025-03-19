const fs = require("fs");

const contrato = process.argv[2];
let contractName;

if (contrato == "alg1"){
  contractName = "Alg1A"; // Deploy Alg1
}else if (contrato === "alg2") {
  contractName = "Alg2A"; // Deploy Alg2
} else if (contrato === "alg3") {
  contractName = "Alg3A"; // Deploy Alg3
}

const config = `
const SCContract = artifacts.require("${contractName}");
const IBCClient = artifacts.require("@hyperledger-labs/yui-ibc-solidity/IBCClient");
const IBCConnection = artifacts.require("@hyperledger-labs/yui-ibc-solidity/IBCConnection");
const IBCChannelHandshake = artifacts.require("@hyperledger-labs/yui-ibc-solidity/IBCChannelHandshake");
const IBCPacket = artifacts.require("@hyperledger-labs/yui-ibc-solidity/IBCPacket");
const IBCHandler = artifacts.require("@hyperledger-labs/yui-ibc-solidity/OwnableIBCHandler");
const MockClient = artifacts.require("@hyperledger-labs/yui-ibc-solidity/MockClient");

const PortTransfer = "transfer"
const MockClientType = "mock-client"

const deployCore = async (deployer) => {
  await deployer.deploy(IBCClient);
  await deployer.deploy(IBCConnection);
  await deployer.deploy(IBCChannelHandshake);
  await deployer.deploy(IBCPacket);
  await deployer.deploy(IBCHandler, IBCClient.address, IBCConnection.address, IBCChannelHandshake.address, IBCPacket.address);

  await deployer.deploy(MockClient, IBCHandler.address);
};

const deployApp = async (deployer) => {
  //await deployer.deploy(MiniToken, IBCHandler.address);
  await deployer.deploy(SCContract, IBCHandler.address);
};

const init = async (deployer) => {
  const ibcHandler = await IBCHandler.deployed();

  for(const promise of [
    //() => ibcHandler.bindPort(PortTransfer, MiniToken.address),
    () => ibcHandler.bindPort(PortTransfer, SCContract.address),
    () => ibcHandler.registerClient(MockClientType, MockClient.address),
  ]) {
    const result = await promise();
    if(!result.receipt.status) {
      throw new Error('transaction failed to execute', result.tx);
  }
}
}

module.exports = async function(deployer, network) {
  await deployCore(deployer);
  await deployApp(deployer);
  await init(deployer);
};


`;

fs.writeFileSync("../contracts/access/migrations/2_token_migration.js", config);
console.log("Updated token-migrations.js to deploy contract:", contrato);
