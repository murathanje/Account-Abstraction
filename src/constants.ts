import { createThirdwebClient, getContract } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { SmartWalletOptions } from "thirdweb/wallets";

const clientId = process.env.REACT_APP_CLIENT_ID;

if (!clientId) {
    throw new Error("No client ID provided");
}

export const client = createThirdwebClient({
    clientId: clientId,
});

export const chain = baseSepolia;
export const tokenDropAddress = "0xd64A548A82c190083707CBEFD26958E5e6551D18";
export const editionDropAddress = "0x638263e3eAa3917a53630e61B1fBa685308024fa";

// Note: BigInt literals are supported in ES2020 and later. Ensure your TypeScript target is set appropriately.
export const editionDropTokenId = 0n; // Consider checking your tsconfig.json for "target": "ES2020" or higher

export const editionDropContract = getContract({
    address: editionDropAddress,
    chain,
    client,
});

export const tokenDropContract = getContract({
    address: tokenDropAddress,
    chain,
    client,
});

export const accountAbstraction: SmartWalletOptions = {
    chain,
    sponsorGas: true,
};