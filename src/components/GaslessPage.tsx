import React from "react";
import { claimTo, getNFT, getOwnedNFTs } from "thirdweb/extensions/erc1155";
import {
    ConnectButton,
    MediaRenderer,
    TransactionButton,
    useActiveAccount,
    useReadContract,
} from "thirdweb/react";
import {
    accountAbstraction,
    client,
    editionDropContract,
    editionDropTokenId,
} from "../constants";
import { Link } from "react-router-dom";

interface GaslessPageProps { }

const GaslessPage: React.FC<GaslessPageProps> = () => {
    const smartAccount = useActiveAccount();
    const { data: nft, isLoading: isNftLoading } = useReadContract(getNFT, {
        contract: editionDropContract,
        tokenId: editionDropTokenId,
    });
    const { data: ownedNfts } = useReadContract(getOwnedNFTs, {
        contract: editionDropContract,
        address: smartAccount?.address!,
        queryOptions: { enabled: !!smartAccount },
    });

    return (
        <div className="flex flex-col items-center mt-20">
            <h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-12 text-black">
                Sponsored Transactions
            </h1>
            <ConnectButton
                client={client}
                accountAbstraction={accountAbstraction}
                connectModal={{
                    size: "compact",
                }}
            />
            <div className="flex flex-col">
                {isNftLoading ? (
                    <div className="w-full mt-24">Loading...</div>
                ) : (
                    <>
                        {nft ? (
                            <MediaRenderer
                                client={client}
                                src={nft.metadata.image}
                                style={{ width: "100%", marginTop: "10px" }}
                            />
                        ) : null}
                        {smartAccount ? (
                            <>
                                <p className="font-semibold text-center mb-2">
                                    You own {ownedNfts?.[0]?.quantityOwned.toString() || "0"}{" "}
                                    Kittens
                                </p>
                                <TransactionButton
                                    transaction={() =>
                                        claimTo({
                                            contract: editionDropContract,
                                            tokenId: editionDropTokenId,
                                            to: smartAccount.address,
                                            quantity: 1n,
                                        })
                                    }
                                    onError={(error) => {
                                        alert(`Error: ${error.message}`);
                                    }}
                                    onTransactionConfirmed={async () => {
                                        alert("Claim successful!");
                                    }}
                                >
                                    Claim!
                                </TransactionButton>
                            </>
                        ) : (
                            <p
                                style={{
                                    textAlign: "center",
                                    width: "100%",
                                    marginTop: "10px",
                                }}
                            >
                                Login to claim this Kitten!
                            </p>
                        )}
                    </>
                )}
            </div>
            <Link to="/" className="text-sm text-gray-400 mt-8">
                Back to menu
            </Link>
        </div>
    );
};

export default GaslessPage;