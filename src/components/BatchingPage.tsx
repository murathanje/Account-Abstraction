import React from 'react';
import { ConnectButton, useActiveAccount, useReadContract, useSendBatchTransaction } from "thirdweb/react";
import { balanceOf, claimTo as claimNFT } from "thirdweb/extensions/erc1155";
import { getBalance, claimTo as claimToken } from "thirdweb/extensions/erc20";
import { accountAbstraction, client, editionDropContract, editionDropTokenId, tokenDropContract } from "../constants";
import { Link } from "react-router-dom";

const BatchingPage: React.FC = () => {
  const smartAccount = useActiveAccount();
  const { data: tokenBalance, refetch: refetchTokens } = useReadContract(
    getBalance,
    {
      contract: tokenDropContract,
      address: smartAccount?.address!,
      queryOptions: { enabled: !!smartAccount },
    }
  );
  const { data: nftBalance, refetch: refetchNFTs } = useReadContract(
    balanceOf,
    {
      contract: editionDropContract,
      owner: smartAccount?.address!,
      tokenId: editionDropTokenId,
      queryOptions: { enabled: !!smartAccount },
    }
  );
  const { mutate: sendBatch, isPending } = useSendBatchTransaction();

  const handleClick = async () => {
    if (!smartAccount) return;
    const transactions = [
      claimNFT({
        contract: editionDropContract,
        tokenId: editionDropTokenId,
        to: smartAccount.address,
        quantity: 1n,
      }),
      claimToken({
        contract: tokenDropContract,
        quantity: "0.1",
        to: smartAccount.address,
      }),
    ];
    await sendBatch(transactions, {
      onError: (error) => alert(`Error: ${error.message}`),
      onSuccess: (result) => {
        refetchNFTs();
        refetchTokens();
        alert(`Success! Tx hash: ${result.transactionHash}`);
      },
    });
  };

  return (
    <div className="flex flex-col items-center mt-20">
          <h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-12 text-black">
        Batching Transactions
      </h1>
      <ConnectButton
        client={client}
        accountAbstraction={accountAbstraction}
        connectModal={{
          size: "compact",
        }}
      />
      <div className="flex flex-col mt-8 gap-4">
        {smartAccount ? (
          <>
            {nftBalance && tokenBalance && (
              <p>
                You own {nftBalance.toString()} NFTs (ERC1155) and {tokenBalance.displayValue} {tokenBalance.symbol} (ERC20)
              </p>
            )}
            <button
              className="p-4 mr-4 rounded-lg bg-white text-black font-medium"
              onClick={handleClick}
              disabled={isPending}
            >
              {isPending ? "Claiming..." : "Claim NFTs and Tokens at once!"}
            </button>
          </>
        ) : (
          <p>Login to get started</p>
        )}
      </div>
      <Link to="/">Back to menu</Link>
    </div>
  );
};

export default BatchingPage;