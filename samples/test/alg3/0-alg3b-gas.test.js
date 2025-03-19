const ContractB = artifacts.require("Alg3B");
const MiniMessagePacketData = artifacts.require("MiniMessagePacketData");

contract('ContractB', function(accounts) {
  it("Test gas", async () => {
    const contractB = await ContractB.deployed();

    //UPDATE TRANSACTION HASH FROM BLOCKCHAIN B WITH DESTINATION OWNABLEIBCHANDLER HERE
    const hashTransaction = "0x8c5a2ffd807c304771ca99b79262f473889729da27c7e731f3c597f148819b62";

    const accounts = await web3.eth.getAccounts();
    const alice = accounts[1];

    const port = "transfer";
    const channel = "channel-0";
    const timeoutHeight = 0;

    const data = {
        message: "Alex", 
        sender: alice,
        receiver: alice
    }

    
    
    // Initial balance of the second account
    const initial = await web3.eth.getBalance(alice);
    console.log(`Initial: ${initial.toString()}`);
      
    // Obtain gas used from the receipt
    const receipt = await web3.eth.getTransactionReceipt(hashTransaction);
   // console.log(receipt);
    const gasUsed = receipt.gasUsed;
    console.log(`GasUsed: ${gasUsed}`);

    // Obtain gasPrice from the transaction
    const gasPrice = receipt.effectiveGasPrice;
    console.log(`GasPrice: ${gasPrice}`);

    // Final balance
    const final = await web3.eth.getBalance(accounts[1]);
    console.log(`Final: ${final.toString()}`);
  });
});