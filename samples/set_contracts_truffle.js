const fs = require("fs");

const network = process.argv[2];
let contractDir;

if (network === "ibc0") {
  contractDir = "./../contracts/access";
} else if (network === "ibc1") {
  contractDir = "./../contracts/data";
} else if (network === "ibc2"){
  contractDir = "./../contracts/uni";
}

const config = `
const HDWalletProvider = require("@truffle/hdwallet-provider");
var mnemonic =
  "math razor capable expose worth grape metal sunset metal sudden usage scheme";
// const infuraKey = "fj4jll3k.....";
//
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  contracts_directory: "${contractDir}",
  contracts_build_directory: "${contractDir}/build/contracts",
  migrations_directory: "${contractDir}/migrations",

 
  networks: {
    ibc0: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8645, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
      networkCheckTimeout: 10000,
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: mnemonic,
          },
          providerOrUrl: "http://localhost:8645",
          addressIndex: 0,
          numberOfAddresses: 10,
          pollingInterval: 8000, // Reducing socket hang up error
        }),
    },
    ibc1: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8745, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
      provider: () =>
        new HDWalletProvider(mnemonic, "http://localhost:8745", 0, 10),
    },
    ibc2: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8845, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
      networkCheckTimeout: 10000,
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: mnemonic,
          },
          providerOrUrl: "http://localhost:8845",
          addressIndex: 0,
          numberOfAddresses: 10,
          pollingInterval: 8000, // Reducing socket hang up error
        }),
    },

    ibc3: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8645, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
      networkCheckTimeout: 10000,
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: mnemonic,
          },
          providerOrUrl: "http://localhost:8645",
          addressIndex: 0,
          numberOfAddresses: 10,
          pollingInterval: 8000, // Reducing socket hang up error
        }),
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.9", // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {
        // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 1000,
        },
        //  evmVersion: "byzantium"
      },
    },
  }
};

`;

fs.writeFileSync("truffle-config.js", config);
console.log("Updated truffle-config.js for network:", network);
