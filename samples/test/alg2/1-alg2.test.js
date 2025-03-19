const ContractA = artifacts.require("Alg2A");

contract("Alg2A", (accounts) => {
  it("Gavin sent via IBC!", async () => {
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
          "Gavin was not sent via IBC"
        );
      });
  });
});
