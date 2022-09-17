require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.10',
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    rinkeby: {
      url: process.env.ALCHEMY_API_KEY_URL,         //Your RPC URL
      accounts: [process.env.RINKEBY_PRIVATE_KEY],          //Your private key
    },
  },
};
