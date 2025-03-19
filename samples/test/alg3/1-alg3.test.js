const ContractA = artifacts.require("Alg3A");

contract("Alg3A", (accounts) => {
  it("Transaction sent to get Alex certificate", async () => {
    const block = await web3.eth.getBlockNumber();
    ContractA.deployed()
      .then((instance) =>
        instance.getPastEvents("SendTransfer", {
          fromBlock: block,
        })
      )
      .then((evt) => {
        assert.equal(
          evt[0].args.amount.valueOf(),
          "",
          "Transaction IBC was not found"
        );
      });
  });
});
