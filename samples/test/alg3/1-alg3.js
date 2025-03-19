const ContractA = artifacts.require("Alg3A");

module.exports = async (callback) => {
  const accounts = await web3.eth.getAccounts();
  const alice = accounts[1];
  const bob = accounts[2];

  const namesent = "Alex";
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

  await contractA.sendTransfer(namesent, bob, params , {
    from: bob,
  });

  const sendTransfer = await contractA.getPastEvents("SendTransfer", {
    fromBlock: 0,
  });
  
  console.log(sendTransfer);

  callback();
};

