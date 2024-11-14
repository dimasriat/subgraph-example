import { task } from 'hardhat/config';

task('verify-counter', 'Deploys the Counter Factory contract')
  .addParam('counterAddress', 'Counter Address')
  .setAction(async (taskArgs, hre) => {
    await hre.run('verify:verify', {
      address: taskArgs.counterAddress,
      constructorArguments: [],
    });
    console.log(`CounterFactory verified`);
  });
