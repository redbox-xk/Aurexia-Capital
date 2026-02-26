const hre = require("hardhat");

async function main() {
  console.log("\n🚀 Deploying OPM Payment Network Contracts");
  console.log("==========================================");

  const [deployer] = await hre.ethers.getSigners();
  console.log(`Deployer: ${deployer.address}`);

  console.log("\n📄 Deploying OPMToken...");
  const OPMToken = await hre.ethers.getContractFactory("OPMToken");
  const opmToken = await OPMToken.deploy(deployer.address);
  await opmToken.waitForDeployment();
  const opmTokenAddress = await opmToken.getAddress();
  console.log(`✅ OPMToken deployed to: ${opmTokenAddress}`);

  console.log("\n📄 Deploying Treasury...");
  const Treasury = await hre.ethers.getContractFactory("Treasury");
  const treasury = await Treasury.deploy();
  await treasury.waitForDeployment();
  const treasuryAddress = await treasury.getAddress();
  console.log(`✅ Treasury deployed to: ${treasuryAddress}`);

  console.log("\n📄 Deploying PaymentProcessor...");
  const PaymentProcessor = await hre.ethers.getContractFactory("PaymentProcessor");
  const paymentProcessor = await PaymentProcessor.deploy(opmTokenAddress, treasuryAddress);
  await paymentProcessor.waitForDeployment();
  const paymentProcessorAddress = await paymentProcessor.getAddress();
  console.log(`✅ PaymentProcessor deployed to: ${paymentProcessorAddress}`);

  console.log("\n🔐 Setting up roles...");

  const FEE_COLLECTOR_ROLE = await treasury.FEE_COLLECTOR_ROLE();
  await treasury.grantRole(FEE_COLLECTOR_ROLE, paymentProcessorAddress);
  console.log("✅ Granted FEE_COLLECTOR_ROLE to PaymentProcessor");

  console.log(`\n${"=".repeat(50)}`);
  console.log("✅ DEPLOYMENT COMPLETE");
  console.log("=".repeat(50));
  console.log("\n📝 Contract Addresses:");
  console.log(`OPMToken: ${opmTokenAddress}`);
  console.log(`Treasury: ${treasuryAddress}`);
  console.log(`PaymentProcessor: ${paymentProcessorAddress}`);

  const fs = require("fs");
  const deploymentInfo = {
    network: hre.network.name,
    chainId: hre.network.config.chainId,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    contracts: {
      OPMToken: opmTokenAddress,
      Treasury: treasuryAddress,
      PaymentProcessor: paymentProcessorAddress,
    },
  };

  fs.writeFileSync("deployment.json", JSON.stringify(deploymentInfo, null, 2));
  console.log("\n📁 Deployment info saved to deployment.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
