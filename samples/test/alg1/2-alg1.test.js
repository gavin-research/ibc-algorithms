const ContractB = artifacts.require("Alg1B");

contract("Alg1B", (accounts) => {
  it("33!!", () =>
    ContractB.deployed()
      .then((instance) => instance.storingData(accounts[2]))
      .then((mensajin) => {
        assert.equal(mensajin.valueOf(), 33, "33  wasn't sent via IBC");
      }));
});
