const ContractA = artifacts.require("Alg2A");

module.exports = async (callback) => {
  const accounts = await web3.eth.getAccounts();
  const alice = accounts[1];
  const bob = accounts[2];

  const datatostore = "Gavin";
  const port = "transfer";
  const channel = "channel-0";
  const timeoutHeight = 0;

  const contractA = await ContractA.deployed();

  const params = {
    sourcePort: port,
    sourceChannel: channel,
    timeoutHeight: timeoutHeight
  };

  //-------------------------///

  // bob solicita acceso para verificar el certificado cheddar
  await contractA.sendTransfer(datatostore, bob, params , {
    from: bob,
  });

  const sendTransfer = await contractA.getPastEvents("SendTransfer", {
    fromBlock: 0,
  });
  
  console.log(sendTransfer);

  callback();
};

