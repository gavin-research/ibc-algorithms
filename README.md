# IBC Algorithms Demo

Here you will find three algorithms that use InterBlockchain Communication:
- The algorithm 1 allows to send fixed size data from Blockchain A to Blockchain B.
- The algorithm 2 allows to send arbitrary size data from Blockchain A to Blockchain B.
- The algorithm 3 allows to call a function that uses arbitrary size data on Blockchain B from Blockchain A and return the result to Blockchain A automatically.

# Table of Contents

- [IBC Algorithms Demo](#ibc-algorithms-demo)
- [Table of Contents](#table-of-contents)
- [About this project](#about-this-project)
- [Preparation](#preparation)
- [Algorithm 1: Sending data of fixed length (uint64)](#algorithm-1-sending-data-of-fixed-length-uint64)
- [Algorithm 2: Sending arbitrary size data](#algorithm-2-sending-arbitrary-size-data)
- [Algorithm 3: Calling a function on Blockchain B from Blockchain A](#algorithm-3-calling-a-function-on-blockchain-b-from-blockchain-a)
- [Gas Consumption](#gas-consumption)
- [To end the tests](#to-end-the-tests)
- [YUI](#yui)
- [About YUI:](#about-yui)
  - [More information](#more-information)
    - [YUI Committers](#yui-committers)
    - [YUI Contributors](#yui-contributors)
    - [YUI Repositories](#yui-repositories)


# About this project

Project is based on the original proposal made by Hyperledger lab: YUI. A cross-chain solution to allow interopreability between blockchains.

The modifications made here allow for the following:

- Send arbitrary data from Blockchain A to Blockchain B
- Automated execution on Blockchain B of the sending function in order to return a data to Blockchain A after being called
- Storage of the Blockchain B data on the Blockchain A once received automatically.
- Use of two Ethereum based blockchains (geth)

This functionalities allow to call from a Blockchain A to a Blockchain B for a data stored exclusively on B and bring it to A without an active member on B sending the information back to A.

# Preparation
Execute `npm install` in the following order on these directories to install dependencies.

- *contracts/access*
- *contracts/data*
- *samples*

# Algorithm 1: Sending data of fixed length (uint64)
Execute `make alg1` from *samples*
Once the command finishes you should see a series of messages saying
*No packets to relay between [ibc0]port{transfer} and [ibc1]port{transfer}*
*No acknowledgements to relay between [ibc0]port{transfer} and [ibc1]port{transfer}*

Execute `make test-alg1` from *samples*
This will send a number, 33, from Blockchain A to Blockchain B. These tests will print the result of doing so.

Execute `make test-alg1-gas` from *samples* if you want to check the gas used by the algorithm 1.

# Algorithm 2: Sending arbitrary size data
Execute `make alg2` from *samples*
Once the command finishes you should see a series of messages saying
*No packets to relay between [ibc0]port{transfer} and [ibc1]port{transfer}*
*No acknowledgements to relay between [ibc0]port{transfer} and [ibc1]port{transfer}*

Execute `make test-alg2` from *samples*
This will send a string, a data type of unfixed length, "Gavin", from Blockchain A to Blockchain B. These tests will print the result of doing so.

Execute `make test-alg2-gas` from *samples* if you want to check the gas used by the algorithm 2.


# Algorithm 3: Calling a function on Blockchain B from Blockchain A 


Execute `make alg3` from *samples*
Once the command finishes you should see a series of messages saying
*No packets to relay between [ibc0]port{transfer} and [ibc1]port{transfer}*
*No acknowledgements to relay between [ibc0]port{transfer} and [ibc1]port{transfer}*

The implementation of the Algorithm 3 here includes both the sending of arbitrary data through the IBC and the execution with parameters from Blockchain A of a function on Blockchain B (gavincall) to receive back the result of it on Blokchain A. 

Execute `make test-alg3` from *samples*
This will send a string, a data type of unfixed length, "Alex", from Blockchain A to Blockchain B. 
The implementation of the Algorithm 3 here includes both the sending of arbitrary data through the IBC and the execution with parameters from Blockchain A of a function on Blockchain B (gavincall) to receive back the result of it on Blokchain A. 
These tests will print the result of doing so.

Tests are done on both blockchains here, therefore the need of the hash of the transaction executed on the Blockchain B in order to check the gas used on it. The transaction hash can be obtained from the block explorer, with destination the OwnableIBCHandler contract on Blockchain B, with address `0x702E40245797c5a2108A566b3CE2Bf14Bc6aF841` if everything was executed following these instructions.

Once you get the address, go to `samples/test/alg3/0-alg3b-gas.test.js` and update the variable `hashTransaction` in line 9 to the correspondant hash.

Execute `make test-alg3-gas` from *samples* if you want to check the gas used by the algorithm 3.

# Gas Consumption
Algorithm 1:
- Contract: ContractA
- Initial: 100000000000000000000
- GasUsed: 126018
- GasPrice: 1000000000
- Final: 99999873982000000000


Algorithm 2:
- Contract: ContractA
- Initial: 100000000000000000000
- GasUsed: 129350
- GasPrice: 1000000000
- Final: 99999870650000000000


Algorithm 3:
- Contract: ContractA
- Initial: 99999870844000000000
- GasUsed: 129156
- GasPrice: 1000000000
- Final: 99999741688000000000


- Contract: ContractB
- Initial: 100000000000000000000
- GasUsed: 255633
- GasPrice: 1000000000
- Final: 100000000000000000000

# To end the tests

Execute `make down` to stop the containers

# YUI

"YUI" is japanese word to represent knot, join and connect

# About YUI:

YUI is a lab to achieve interoperability between multiple heterogeneous ledgers. YUI provides modules and middleware for cross-chain communication as well as modules and tools for cross-chain application development, including an explorer to track status and events for cross-chain environments.

For cross-chain communication, the design of YUI is based on Inter Blockchain Communication (IBC) protocol by Cosmos project, with extensions to support various Hyperledger projects.

Modules for cross-chain application development includes one that implements a protocol for atomic operations between ledgers, such as atomic swap of tokens.

## More information

For more information about YUI, you can find here the original project: 
- https://github.com/hyperledger-labs/yui-docs/

### YUI Committers

- Jun Kimura - https://github.com/bluele
- Ryo Sato - https://github.com/3100
- Masanori Yoshida - https://github.com/siburu

### YUI Contributors

Please take a look at [CONTRIBUTORS.md](./CONTRIBUTORS.md)

### YUI Repositories

- https://github.com/hyperledger-labs/yui-fabric-ibc
- https://github.com/hyperledger-labs/yui-ibc-solidity
- https://github.com/hyperledger-labs/yui-corda-ibc
- https://github.com/hyperledger-labs/yui-relayer
