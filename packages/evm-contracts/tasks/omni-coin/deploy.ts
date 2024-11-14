import { scope } from 'hardhat/config';
import { lzEndpoints } from '../omni-factory/common';

scope('omni-coin:prepare')
  .task('deploy', 'Deploys the OmniCoin Factory contract')
  .addParam('chainId', 'Local Chain Id')
  .setAction(async (taskArgs, hre) => {
    const OmniCoin = await hre.ethers.getContractFactory('OmniCoin');
    const omniCoin = await OmniCoin.deploy(
      hre.ethers.keccak256('0x'),
      'Yet another Omni Cat',
      'YAOC',
      8,
      '1000000000000000000000000',
      '0x976922801d71035c17967f2fee7e137503aea6c0',
      lzEndpoints[taskArgs.chainId.toString()],
    );
    await omniCoin.waitForDeployment();
    const deployedOmniCoinAddress = await omniCoin.getAddress();

    await hre.run('verify:verify', {
      address: deployedOmniCoinAddress,
      constructorArguments: [
        hre.ethers.keccak256('0x'),
        'Yet another Omni Cat',
        'YAOC',
        8,
        '1000000000000000000000000',
        '0x976922801d71035c17967f2fee7e137503aea6c0',
        lzEndpoints[taskArgs.chainId.toString()],
      ],
    });

    console.log(`OmniCoin deployed at ${deployedOmniCoinAddress}`);
    console.log(`OmniCoin verified`);
  });
