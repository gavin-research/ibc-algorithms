const ContractB = artifacts.require("Alg2B");

contract("Alg2B", (accounts) => {
  it("Gavin was stored!!", () =>
    ContractB.deployed()
      .then((instance) => instance.storingData(accounts[2]))
      .then((mensajin) => {
        assert.equal(mensajin.valueOf(), "Gavin", "Gavin  wasn't sent via IBC");
      }));
});
