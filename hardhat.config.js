const fs = require("fs");
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: __dirname + "/.env" });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.10",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    local: {
      url: process.env.API_KEY_URL, //Your RPC URL
      accounts: [process.env.LOCAL_PRIVATE_KEY], //Your private key
    },
    mumbai: {
      url: process.env.MUMBAI_API_KEY_URL, //Your RPC URL
      accounts: [process.env.PRIVATE_KEY], //Your private key
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
