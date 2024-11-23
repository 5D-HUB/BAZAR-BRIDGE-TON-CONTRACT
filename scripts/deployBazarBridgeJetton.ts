import { Address, toNano } from '@ton/core';
import { BazarBridgeJetton } from '../wrappers/BazarBridgeJetton';
import { NetworkProvider } from '@ton/blueprint';
import { buildOnchainMetadata } from '../utils/jetton-helpers';

export async function run(provider: NetworkProvider) {
    const jettonParams = {
        name: "5DHub-BazarBridge",
        description: "5DHub BazarBridge jetton for BazarBridge application in Telegram market",
        symbol: "5DSQa",
        image: "https://static.tildacdn.net/tild3038-6637-4832-b530-643933356137/5dh_logo_b.png",
    };

    // Create content Cell
    let content = buildOnchainMetadata(jettonParams);

    const bazarBridgeJetton = provider.open(await BazarBridgeJetton.fromInit(provider.sender().address as Address, content, 1000000000000000000n));

    await bazarBridgeJetton.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Mint',
            amount: 100000000000000000n,
            receiver: provider.sender().address as Address
        }
    );

    await provider.waitForDeploy(bazarBridgeJetton.address);

    // run methods on `bazarBridgeJetton`
}