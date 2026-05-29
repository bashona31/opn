"use client";

import { useEffect, useState } from "react";
import {
  Download,
  Loader2,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Wallet,
} from "lucide-react";
import { useWallet } from "@/context/WalletContext";
import { sendDownloadTransaction, DOWNLOAD_FEE } from "@/lib/wallet";

interface PixabayImage {
  id: number;
  url: string;
  webformatURL: string;
  tags: string;
  user: string;
  likes: number;
  views: number;
}

const artCards = [
  {
    title: "Crystal Robot Mascot Concept",
    tag: "3D Animation",
    query: "3d robot crystal neon",
  },
  {
    title: "Neon Samurai Genesis",
    tag: "Character Design",
    query: "samurai neon cyberpunk",
  },
  {
    title: "Void Walker - Series I",
    tag: "3D Sculpture",
    query: "dark fantasy 3d character",
  },
  {
    title: "Cyber Empress Collection",
    tag: "NFT Art",
    query: "cyberpunk woman futuristic",
  },
  {
    title: "Mecha Dragon Spirit",
    tag: "3D Animation",
    query: "mecha dragon robot",
  },
  {
    title: "Quantum Ape Reborn",
    tag: "Character Design",
    query: "cyber ape monkey futuristic",
  },
];

type DownloadState = "idle" | "pending" | "confirming" | "downloading" | "success" | "error";

interface CardDownloadState {
  state: DownloadState;
  txHash?: string;
  error?: string;
}

export default function Showcase() {
  const [images, setImages] = useState<(PixabayImage | null)[]>(
    Array(artCards.length).fill(null)
  );
  const [loading, setLoading] = useState(true);
  const [downloadStates, setDownloadStates] = useState<CardDownloadState[]>(
    Array(artCards.length).fill({ state: "idle" })
  );
  const { address, isConnected, connect } = useWallet();

  const fetchImages = async () => {
    setLoading(true);
    const results = await Promise.all(
      artCards.map(async (card) => {
        try {
          const res = await fetch(
            `/api/pixabay?q=${encodeURIComponent(card.query)}&per_page=3`
          );
          const data = await res.json();
          if (data.images && data.images.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.images.length);
            return data.images[randomIndex];
          }
          return null;
        } catch {
          return null;
        }
      })
    );
    setImages(results);
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const updateDownloadState = (index: number, state: CardDownloadState) => {
    setDownloadStates((prev) => {
      const newStates = [...prev];
      newStates[index] = state;
      return newStates;
    });
  };

  const handleDownload = async (index: number) => {
    const img = images[index];
    const art = artCards[index];
    if (!img) return;

    // Check wallet connection
    if (!isConnected || !address) {
      connect();
      return;
    }

    try {
      // Step 1: Send transaction
      updateDownloadState(index, { state: "pending" });

      const txHash = await sendDownloadTransaction(address, art.title);

      // Step 2: Transaction sent, waiting for confirmation
      updateDownloadState(index, { state: "confirming", txHash });

      // Wait a moment to simulate confirmation (on real chain, you'd wait for receipt)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Step 3: Download the image
      updateDownloadState(index, { state: "downloading", txHash });

      const response = await fetch(img.url || img.webformatURL);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${art.title.replace(/\s+/g, "-").toLowerCase()}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      // Step 4: Success
      updateDownloadState(index, { state: "success", txHash });
      setTimeout(() => updateDownloadState(index, { state: "idle" }), 4000);
    } catch (error: any) {
      updateDownloadState(index, {
        state: "error",
        error: error.message || "Download failed",
      });
      setTimeout(() => updateDownloadState(index, { state: "idle" }), 4000);
    }
  };

  const getDownloadButtonContent = (index: number) => {
    const dlState = downloadStates[index];

    switch (dlState.state) {
      case "pending":
        return (
          <>
            <Loader2 size={14} className="animate-spin" />
            <span>Confirm in Wallet...</span>
          </>
        );
      case "confirming":
        return (
          <>
            <Loader2 size={14} className="animate-spin" />
            <span>Confirming Txn...</span>
          </>
        );
      case "downloading":
        return (
          <>
            <Loader2 size={14} className="animate-spin" />
            <span>Downloading...</span>
          </>
        );
      case "success":
        return (
          <>
            <CheckCircle2 size={14} className="text-green-400" />
            <span className="text-green-400">Downloaded!</span>
          </>
        );
      case "error":
        return (
          <>
            <XCircle size={14} className="text-red-400" />
            <span className="text-red-400 text-[10px]">
              {dlState.error?.substring(0, 25) || "Failed"}
            </span>
          </>
        );
      default:
        if (!isConnected) {
          return (
            <>
              <Wallet size={14} />
              <span>Connect to Download</span>
            </>
          );
        }
        return (
          <>
            <Download size={14} />
            <span>Download ({DOWNLOAD_FEE} OPN)</span>
          </>
        );
    }
  };

  return (
    <section id="showcase" className="relative py-24 sm:py-32">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-neon-pink/5 rounded-full blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-neon-pink mb-3">
            Portfolio
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            <span className="text-white">3D & Anime Art</span>{" "}
            <span className="gradient-text">Showcase</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            A curated collection of futuristic 3D art. Connect your wallet on
            OPN Testnet to download artwork.
          </p>

          {/* Refresh button */}
          <button
            onClick={fetchImages}
            disabled={loading}
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium glass neon-border-cyan text-neon-cyan hover:shadow-neon-cyan transition-all duration-300 disabled:opacity-50"
          >
            <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
            {loading ? "Loading..." : "Refresh Art"}
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {artCards.map((art, index) => {
            const img = images[index];
            const dlState = downloadStates[index];
            const isProcessing = ["pending", "confirming", "downloading"].includes(
              dlState.state
            );

            return (
              <div
                key={art.title}
                className="group relative rounded-2xl glass overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-glass-hover"
              >
                {/* Art Image */}
                <div className="aspect-[4/5] relative overflow-hidden bg-bg-secondary">
                  {loading || !img ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neon-pink/5 to-neon-cyan/5">
                      <div className="flex flex-col items-center gap-3">
                        <Loader2
                          size={24}
                          className="text-neon-pink/50 animate-spin"
                        />
                        <span className="text-[10px] text-gray-500 font-mono">
                          Fetching art...
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.url || img.webformatURL}
                        alt={art.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    </>
                  )}

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/30 to-transparent" />

                  {/* Neon border glow on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-neon-pink/30 rounded-2xl shadow-[inset_0_0_30px_rgba(255,42,133,0.1)]" />

                  {/* Pixabay credit */}
                  {img && (
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-md glass text-[8px] font-mono text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      by {img.user}
                    </div>
                  )}
                </div>

                {/* Info + Download */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-neon-pink transition-colors duration-300">
                      {art.title}
                    </h3>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/5 text-gray-400 border border-white/5">
                        {art.tag}
                      </span>
                      {img && (
                        <span className="text-[9px] text-gray-600 font-mono">
                          {img.likes} likes
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Download Button */}
                  <button
                    onClick={() => handleDownload(index)}
                    disabled={isProcessing || !img || loading}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 disabled:cursor-not-allowed ${
                      dlState.state === "success"
                        ? "glass border border-green-500/30 text-green-400"
                        : dlState.state === "error"
                        ? "glass border border-red-500/30 text-red-400"
                        : isProcessing
                        ? "glass neon-border-pink text-neon-pink"
                        : !isConnected
                        ? "bg-gradient-to-r from-neon-pink to-neon-cyan text-white hover:shadow-neon-pink hover:scale-[1.02]"
                        : "glass neon-border-pink text-white hover:shadow-neon-pink hover:scale-[1.02]"
                    }`}
                  >
                    {getDownloadButtonContent(index)}
                  </button>

                  {/* Transaction Hash */}
                  {dlState.txHash && dlState.state !== "idle" && (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/3 border border-white/5">
                      <span className="text-[9px] text-gray-500">Tx:</span>
                      <span className="text-[9px] font-mono text-neon-cyan/70 truncate">
                        {dlState.txHash}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Info banner */}
        <div className="mt-12 rounded-2xl glass neon-border-pink p-4 sm:p-6 text-center">
          <p className="text-xs text-gray-400">
            <span className="text-neon-pink font-semibold">How it works:</span>{" "}
            Connect your wallet to OPN Testnet → Click Download → Confirm{" "}
            {DOWNLOAD_FEE} OPN transaction → Image downloads automatically
          </p>
        </div>

        {/* Pixabay Attribution */}
        <p className="mt-6 text-center text-[10px] text-gray-600">
          Images powered by{" "}
          <a
            href="https://pixabay.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-cyan/50 hover:text-neon-cyan transition-colors"
          >
            Pixabay API
          </a>
        </p>
      </div>
    </section>
  );
}
