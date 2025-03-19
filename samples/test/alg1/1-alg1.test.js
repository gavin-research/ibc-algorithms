const ContractA = artifacts.require("Alg1A");

contract("Alg1A", (accounts) => {
  it("Number 33 sent via IBC!", async () => {
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
          "33 was not returned"
        );
      });
  });
});
