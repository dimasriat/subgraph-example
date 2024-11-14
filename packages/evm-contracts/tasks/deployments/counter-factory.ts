import { task } from 'hardhat/config';

// pnpm deploy:factory --network base
task(
  'deploy-counter-factory',
  'Deploys the Counter Factory contract',
).setAction(async (_, hre) => {
  const CounterFactory = await hre.ethers.getContractFactory('CounterFactory');
  const omniCoinFactory = await CounterFactory.deploy();
  await omniCoinFactory.waitForDeployment();
  const deployedFactoryAddress = await omniCoinFactory.getAddress();
  console.log(`CounterFactory deployed at ${deployedFactoryAddress}`);

  await hre.run('verify:verify', {
    address: deployedFactoryAddress,
    constructorArguments: [],
  });
  console.log(`CounterFactory verified`);
});
