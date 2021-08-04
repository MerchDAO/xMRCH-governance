// npx hardhat run --network rinkeby scripts/deploy.js
// npx hardhat verify --network rinkeby 0x094C6E5159E4528058C78De481a28C8b17396486 "0x508C21C5689772b23E9C4361EcAd3808bb57df8E"

const hre = require("hardhat");
const dotenv = require('dotenv');
const fs = require('fs');
const envConfig = dotenv.parse(fs.readFileSync(`.env`));
for (const k in envConfig) {
    process.env[k] = envConfig[k]
}

async function main() {

  let token = process.env.XMRCH_TOKEN_ADDRESS;

  // We get the contract to deploy
  const Governor = await hre.ethers.getContractFactory("Governor");
  const governor = await Governor.deploy(token);

  await governor.deployed();

  console.log("Governor deployed to:", governor.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
