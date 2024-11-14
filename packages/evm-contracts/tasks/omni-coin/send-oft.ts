import { scope } from 'hardhat/config';
import { ethers } from 'ethers';

const deployedOFT: Record<string, string> = {
  '110': '0x75f21de928453fF8f2A5871EaB7dDCE364d00a83',
  '111': '0x715d791803c4DA5892B818E889A703A51C31e1B2',
  // '184': '0x47297efe938f57e3b9d8d16c5c2ac3f503040023',
};

const sendToAmount: Record<string, string> = {
  '110': '1',
  '111': '2',
  // '184': '3',
};

scope('omni-coin:exec')
  .task('estimate-send-oft', 'Estimate gas for sending OFT to remote chain')
  .addParam('fromChainId', 'Local Chain Id')
  .addParam('toChainId', 'Remote Chain Id')
  .addParam('to', 'To Address')
  .setAction(async (taskArgs, hre) => {
    const contractAddress = deployedOFT[taskArgs.fromChainId.toString()];
    const omniCoin = await hre.ethers.getContractAt(
      'OmniCoin',
      contractAddress,
    );
    const abiCoder = new hre.ethers.AbiCoder();
    const toAddress = abiCoder.encode(['address'], [taskArgs.to]);
    const defaultAdapterParams = hre.ethers.solidityPacked(
      ['uint16', 'uint256'],
      [1, 200000],
    );
    const transferAmount = ethers.parseEther(sendToAmount[taskArgs.toChainId]);

    // estimate nativeFees
    const { nativeFee } = await omniCoin.estimateSendFee(
      taskArgs.toChainId,
      toAddress,
      transferAmount,
      false,
      defaultAdapterParams,
    );

    console.log('Estimation');
    console.log({
      nativeFee: nativeFee.toString(),
      nativeFeeFormatted: ethers.formatEther(nativeFee),
    });
  });

scope('omni-coin:exec')
  .task('send-oft', 'Send OFT to remote chain')
  .addParam('fromChainId', 'Local Chain Id')
  .addParam('toChainId', 'Remote Chain Id')
  .addParam('from', 'From Address')
  .addParam('to', 'To Address')
  .setAction(async (taskArgs, hre) => {
    const contractAddress = deployedOFT[taskArgs.fromChainId.toString()];
    const omniCoin = await hre.ethers.getContractAt(
      'OmniCoin',
      contractAddress,
    );
    const abiCoder = new hre.ethers.AbiCoder();
    const toAddress = abiCoder.encode(['address'], [taskArgs.to]);
    const defaultAdapterParams = hre.ethers.solidityPacked(
      ['uint16', 'uint256'],
      [1, 200000],
    );
    const transferAmount = ethers.parseEther(sendToAmount[taskArgs.toChainId]);

    // estimate nativeFees
    const { nativeFee } = await omniCoin.estimateSendFee(
      taskArgs.toChainId,
      toAddress,
      transferAmount,
      false,
      defaultAdapterParams,
    );

    await omniCoin.setMinDstGas(
      taskArgs.toChainId,
      0,
      200000
    );
    await omniCoin.setMinDstGas(
      taskArgs.toChainId,
      1,
      200000
    );
    await omniCoin.setTrustedRemote(
      taskArgs.toChainId,
      hre.ethers.solidityPacked(
        ['address', 'address'],
        [deployedOFT[taskArgs.toChainId], deployedOFT[taskArgs.fromChainId]],
      ),
    );
    
    const tx = await omniCoin.sendFrom(
      taskArgs.from,
      taskArgs.toChainId,
      toAddress,
      transferAmount,
      {
        refundAddress: taskArgs.from,
        zroPaymentAddress: hre.ethers.ZeroAddress,
        adapterParams: defaultAdapterParams,
      },
      { value: nativeFee },
    );

    const receipt = await tx.wait();
    console.log('OFT sent. https://layerzeroscan.com/tx/' + receipt?.hash);
  });
