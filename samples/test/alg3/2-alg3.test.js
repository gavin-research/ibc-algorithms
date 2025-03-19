const ContractA = artifacts.require("Alg3A");

contract("Alg3A", (accounts) => {
  it("Alex is a Full-Stack Blockchain Developer", () =>
    ContractA.deployed()
      .then((instance) => instance.addData(accounts[2]))
      .then((mensajin) => {
        assert.equal(mensajin.valueOf(), "Full-Stack Blockchain Developer", "-Full-Stack Blockchain Developer- string wasn't sent via IBC");
      }));
});
