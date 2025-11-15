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
    <motion.section
      id="networks"
      className="py-20 px-4 bg-[rgb(var(--ocean-deeper))]/50 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 className="text-4xl md:text-6xl font-bold text-[rgb(var(--straw-gold))] mb-4">
            Navigate All Seas
          </motion.h2>
          <motion.p className="text-xl text-[rgb(var(--skull-white))]/70 max-w-2xl mx-auto">
            Trusted networks on your voyage
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Single Row */}
          <motion.div
            className="flex items-center gap-12 whitespace-nowrap will-change-transform"
            animate={{ x: [0, -700] }}
            transition={{ duration: 24, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            {[...networks, ...networks].map((n, i) => (
              <motion.div key={`r1-${i}`} whileHover={{ scale: 1.05 }} className="inline-flex items-center gap-3 opacity-80 hover:opacity-100 transition-all">
                <div className="relative h-10 w-10">
                  <Image src={n.logo} alt={n.name} fill className="object-contain" />
                </div>
                <span className="text-[rgb(var(--skull-white))]/80 font-medium">{n.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
