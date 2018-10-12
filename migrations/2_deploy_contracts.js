var EUToken = artifacts.require("./EUToken.sol");

module.exports = function(deployer) {
  deployer.deploy(EUToken);
};