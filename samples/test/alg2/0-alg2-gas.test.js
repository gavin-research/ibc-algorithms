const ContractA = artifacts.require("Alg2A");

contract('ContractA', function(accounts) {
  it("Test gas", async () => {
    const contractA = await ContractA.deployed();

    const accounts = await web3.eth.getAccounts();
    const alice = accounts[1];

    const datatostore = "Gavin";
    const port = "transfer";
    const channel = "channel-0";
    const timeoutHeight = 0;

    const params = {
      sourcePort: port,
      sourceChannel: channel,
      timeoutHeight: timeoutHeight
    };

    
    // Initial balance of the second account
    const initial = await web3.eth.getBalance(alice);
    console.log(`Initial: ${initial.toString()}`);
      
    // Obtain gas used from the receipt
    const receipt = await contractA.sendTransfer(datatostore, alice, params , {
        from: alice,
      });
    const gasUsed = receipt.receipt.gasUsed;
    console.log(`GasUsed: ${receipt.receipt.gasUsed}`);

    // Obtain gasPrice from the transaction
    const tx = await web3.eth.getTransaction(receipt.tx);
    const gasPrice = tx.gasPrice;
    console.log(`GasPrice: ${tx.gasPrice}`);

    // Final balance
    const final = await web3.eth.getBalance(accounts[1]);
    console.log(`Final: ${final.toString()}`);
  });
});