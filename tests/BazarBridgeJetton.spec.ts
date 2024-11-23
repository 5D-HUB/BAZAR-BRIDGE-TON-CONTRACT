import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { BazarBridgeJetton } from '../wrappers/BazarBridgeJetton';
import '@ton/test-utils';

describe('BazarBridgeJetton', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let bazarBridgeJetton: SandboxContract<BazarBridgeJetton>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        bazarBridgeJetton = blockchain.openContract(await BazarBridgeJetton.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await bazarBridgeJetton.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: bazarBridgeJetton.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and bazarBridgeJetton are ready to use
    });
});