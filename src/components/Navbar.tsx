"use client";

import { useState } from "react";
import { Menu, X, Wallet, LogOut, Copy, Check } from "lucide-react";
import { useWallet } from "@/context/WalletContext";
import { shortenAddress } from "@/lib/wallet";

const navLinks = [
  { label: "Hero", href: "#hero" },
  { label: "Showcase", href: "#showcase" },
  { label: "Ecosystem", href: "#ecosystem" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { address, isConnected, isConnecting, connect, disconnect } = useWallet();

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-neon flex items-center justify-center">
              <span className="text-sm font-black text-white">O</span>
            </div>
            <span className="text-lg font-bold tracking-tight">
              <span className="text-white">OPN</span>{" "}
              <span className="text-gray-400 font-medium">Builders</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-400 transition-colors duration-300 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Wallet Button - Desktop */}
          <div className="hidden md:block relative">
            {isConnected && address ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full glass neon-border-cyan text-sm font-medium text-white transition-all duration-300 hover:shadow-neon-cyan"
                >
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-mono text-neon-cyan">
                    {shortenAddress(address)}
                  </span>
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-12 w-56 rounded-xl glass-strong p-2 border border-glass-border animate-slide-up">
                    <div className="px-3 py-2 mb-1">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                        Connected to OPN Testnet
                      </p>
                      <p className="text-xs font-mono text-gray-300 mt-1 break-all">
                        {address}
                      </p>
                    </div>
                    <button
                      onClick={handleCopyAddress}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      {copied ? (
                        <Check size={12} className="text-green-400" />
                      ) : (
                        <Copy size={12} />
                      )}
                      {copied ? "Copied!" : "Copy Address"}
                    </button>
                    <button
                      onClick={() => {
                        disconnect();
                        setDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut size={12} />
                      Disconnect
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={connect}
                disabled={isConnecting}
                className="relative flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-neon-pink to-neon-cyan transition-all duration-300 hover:shadow-neon-pink hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Wallet size={14} />
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </button>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass-strong border-t border-glass-border animate-slide-up">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}

            {/* Mobile Wallet Button */}
            {isConnected && address ? (
              <div className="pt-2 border-t border-glass-border space-y-2">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg glass">
                  <div className="h-2 w-2 rounded-full bg-green-400" />
                  <span className="text-xs font-mono text-neon-cyan">
                    {shortenAddress(address)}
                  </span>
                </div>
                <button
                  onClick={() => {
                    disconnect();
                    setMobileOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium text-red-400 border border-red-400/20 hover:bg-red-500/10"
                >
                  <LogOut size={14} />
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  connect();
                  setMobileOpen(false);
                }}
                disabled={isConnecting}
                className="w-full mt-2 flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-neon-pink to-neon-cyan disabled:opacity-50"
              >
                <Wallet size={14} />
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
