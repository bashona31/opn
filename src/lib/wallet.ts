// OPN Testnet Configuration
export const OPN_TESTNET = {
  chainId: "0x1A3E", // 6718 in decimal - adjust to your actual OPN testnet chain ID
  chainName: "OPN Testnet",
  rpcUrls: ["https://testnet-rpc.opn.network"],
  nativeCurrency: {
    name: "OPN",
    symbol: "OPN",
    decimals: 18,
  },
  blockExplorerUrls: ["https://testnet-explorer.opn.network"],
};

// Download fee in OPN (e.g., 0.001 OPN per download)
export const DOWNLOAD_FEE = "0.001";

// Treasury wallet that receives download fees
export const TREASURY_WALLET = "0x0000000000000000000000000000000000000001";

export async function connectWallet(): Promise<string | null> {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("MetaMask not installed. Please install MetaMask to continue.");
  }

  try {
    // Request account access
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    // Switch to OPN Testnet
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: OPN_TESTNET.chainId }],
      });
    } catch (switchError: any) {
      // Chain not added, add it
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [OPN_TESTNET],
        });
      } else {
        throw switchError;
      }
    }

    return accounts[0] || null;
  } catch (error: any) {
    throw new Error(error.message || "Failed to connect wallet");
  }
}

export async function disconnectWallet(): Promise<void> {
  // MetaMask doesn't have a true disconnect, but we clear local state
  return;
}

export async function sendDownloadTransaction(
  fromAddress: string,
  imageTitle: string
): Promise<string> {
  if (!window.ethereum) {
    throw new Error("MetaMask not found");
  }

  // Convert fee to wei (0.001 OPN = 1000000000000000 wei)
  const feeInWei = "0x" + BigInt(Math.floor(parseFloat(DOWNLOAD_FEE) * 1e18)).toString(16);

  // Encode image title as hex data for the transaction
  const encoder = new TextEncoder();
  const data = "0x" + Array.from(encoder.encode(`Download: ${imageTitle}`))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: fromAddress,
          to: TREASURY_WALLET,
          value: feeInWei,
          data: data,
        },
      ],
    });

    return txHash as string;
  } catch (error: any) {
    if (error.code === 4001) {
      throw new Error("Transaction rejected by user");
    }
    throw new Error(error.message || "Transaction failed");
  }
}

export function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
