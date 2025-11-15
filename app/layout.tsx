import type React from "react"
import type { Metadata } from "next"
import { Inter, Pirata_One, Permanent_Marker } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const pirataOne = Pirata_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pirata",
})
const permanentMarker = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marker",
})

export const metadata: Metadata = {
  title: "Straw Hat Faucet - Free Testnet Tokens for Web3 Developers",
  description:
    "Get free testnet tokens without mainnet ETH. Support for Ethereum Sepolia, Base Sepolia, Polygon, Avalanche, and more. Join the crew of Web3 builders.",
  keywords:
    "testnet faucet, free testnet tokens, ethereum sepolia, base sepolia, polygon, avalanche fuji, web3 development",
  icons: {
    icon: [
      { url: "/hat.png", sizes: "32x32", type: "image/png" },
      { url: "/hat.png", sizes: "64x64", type: "image/png" },
      { url: "/hat.png", sizes: "192x192", type: "image/png" }
    ],
    shortcut: "/hat.png",
    apple: "/hat.png",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${pirataOne.variable} ${permanentMarker.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
