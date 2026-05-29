import type { Metadata } from "next";
import "./globals.css";
import { WalletProvider } from "@/context/WalletContext";

export const metadata: Metadata = {
  title: "IOPn Builder | Web3 & 3D Art Studio",
  description:
    "Shaping the Next Gen of Web3 & 3D Art. Crafting futuristic 3D character designs and navigating tokenized ecosystems.",
  keywords: ["Web3", "3D Art", "NFT", "Blockchain", "OPN", "IOPn", "Nexus"],
  openGraph: {
    title: "IOPn Builder",
    description: "Shaping the Next Gen of Web3 & 3D Art",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-bg-primary text-white antialiased">
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}
