"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const networks = [
  { name: "Ethereum Sepolia", symbol: "ETH", logo: "/networks/ethereum.png" },
  { name: "Base Sepolia", symbol: "ETH", logo: "/networks/base.png" },
  { name: "Polygon Amoy", symbol: "MATIC", logo: "/networks/polygon.png" },
  { name: "Avalanche Fuji", symbol: "AVAX", logo: "/networks/avalanche.png" },
  // { name: "Arbitrum Sepolia", symbol: "ETH", logo: "/networks/arbitrum.png" },
  // { name: "Optimism Sepolia", symbol: "ETH", logo: "/networks/optimism.png" },
]

export function SupportedNetworksSection() {
  return (
    <section id="networks" className="py-20 px-4 bg-[rgb(var(--ocean-deeper))]/50 overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-[rgb(var(--straw-gold))] mb-4">Navigate All Seas</h2>
          <p className="text-xl text-[rgb(var(--skull-white))]/70 max-w-2xl mx-auto">Trusted networks on your voyage</p>
        </motion.div>

        <div className="relative">
          <motion.div
            className="flex items-center gap-12 whitespace-nowrap will-change-transform"
            animate={{ x: [0, -600] }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            {[...networks, ...networks].map((n, i) => (
              <div key={i} className="inline-flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
                <div className="relative h-10 w-10">
                  <Image src={n.logo} alt={n.name} fill className="object-contain" />
                </div>
                <span className="text-[rgb(var(--skull-white))]/80 font-medium">{n.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
