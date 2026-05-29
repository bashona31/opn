// OPN Testnet Configuration (IOPN)
// Chain ID: 984 | RPC: https://testnet-rpc.iopn.tech | Symbol: OPN
export const OPN_TESTNET = {
  chainId: "0x3D8", // 984 in decimal
  chainName: "OPN Chain Testnet",
  rpcUrls: ["https://testnet-rpc.iopn.tech"],
  nativeCurrency: {
    name: "OPN",
    symbol: "OPN",
    decimals: 18,
  },
  blockExplorerUrls: ["https://testnet-explorer.iopn.tech"],
};

// Download fee in OPN
export const DOWNLOAD_FEE = "0.001";

// Treasury wallet address - receives download fees
// Replace with your actual wallet address
export const TREASURY_WALLET = "0x000000000000000000000000000000000000dEaD";

export async function connectWallet(): Promise<string | null> {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("Please install MetaMask to connect your wallet!");
  }

  try {
    // First request accounts
    const accounts: string[] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    if (!accounts || accounts.length === 0) {
      throw new Error("No accounts found. Please unlock MetaMask.");
    }

    // Try switching to OPN Testnet
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: OPN_TESTNET.chainId }],
      });
    } catch (switchError: any) {
      // Error 4902 = chain not added yet, so add it
      if (switchError.code === 4902 || switchError.code === -32603) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: OPN_TESTNET.chainId,
                chainName: OPN_TESTNET.chainName,
                rpcUrls: OPN_TESTNET.rpcUrls,
                nativeCurrency: OPN_TESTNET.nativeCurrency,
                blockExplorerUrls: OPN_TESTNET.blockExplorerUrls,
              },
            ],
          });
        } catch (addError: any) {
          throw new Error("Failed to add OPN Testnet. Please add it manually.");
        }
      } else if (switchError.code === 4001) {
        throw new Error("User rejected chain switch. Please switch to OPN Testnet.");
      } else {
        // If switch fails for other reasons, try adding the chain
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: OPN_TESTNET.chainId,
                chainName: OPN_TESTNET.chainName,
                rpcUrls: OPN_TESTNET.rpcUrls,
                nativeCurrency: OPN_TESTNET.nativeCurrency,
                blockExplorerUrls: OPN_TESTNET.blockExplorerUrls,
              },
            ],
          });
        } catch {
          throw new Error("Could not connect to OPN Testnet. Please try manually.");
        }
      }
    }

    return accounts[0];
  } catch (error: any) {
    if (error.code === 4001) {
      throw new Error("Connection rejected. Please approve the request in MetaMask.");
    }
    throw new Error(error.message || "Failed to connect wallet");
  }
}

export async function disconnectWallet(): Promise<void> {
  return;
}

export async function sendDownloadTransaction(
  fromAddress: string,
  imageTitle: string
): Promise<string> {
  if (!window.ethereum) {
    throw new Error("MetaMask not found");
  }

  // Verify we're on OPN Testnet
  const currentChainId = await window.ethereum.request({
    method: "eth_chainId",
  });

  if (currentChainId !== OPN_TESTNET.chainId) {
    // Try to switch
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: OPN_TESTNET.chainId }],
      });
    } catch {
      throw new Error("Please switch to OPN Testnet first!");
    }
  }

  // Convert fee to wei (0.001 OPN = 1000000000000000 wei)
  const feeWei = BigInt(Math.floor(parseFloat(DOWNLOAD_FEE) * 1e18));
  const feeHex = "0x" + feeWei.toString(16);

  // Encode message as hex data
  const message = `OPN Download: ${imageTitle}`;
  const encoder = new TextEncoder();
  const msgBytes = encoder.encode(message);
  const hexData =
    "0x" +
    Array.from(msgBytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

  try {
    const txHash: string = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: fromAddress,
          to: TREASURY_WALLET,
          value: feeHex,
          data: hexData,
          gas: "0x5208", // 21000 gas (basic transfer)
        },
      ],
    });

    return txHash;
  } catch (error: any) {
    if (error.code === 4001) {
      throw new Error("Transaction rejected. Download cancelled.");
    }
    if (error.message?.includes("insufficient")) {
      throw new Error("Insufficient OPN balance. Get testnet tokens first!");
    }
    throw new Error(error.message || "Transaction failed");
  }
}

export function shortenAddress(address: string): string {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function getExplorerTxUrl(txHash: string): string {
  return `${OPN_TESTNET.blockExplorerUrls[0]}/tx/${txHash}`;
}
