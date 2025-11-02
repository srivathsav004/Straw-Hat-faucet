"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

const networks = [
  { name: "Ethereum Sepolia", symbol: "ETH", logo: "/networks/ethereum.png" },
  { name: "Base Sepolia", symbol: "ETH", logo: "/networks/base.png" },
  { name: "Polygon Mumbai", symbol: "MATIC", logo: "/networks/polygon.png" },
  { name: "Avalanche Fuji", symbol: "AVAX", logo: "/networks/avalanche.png" },
  { name: "Arbitrum Sepolia", symbol: "ETH", logo: "/networks/arbitrum.png" },
  { name: "Optimism Sepolia", symbol: "ETH", logo: "/networks/optimism.png" },
]

export function SupportedNetworksSection() {
  return (
    <section id="networks" className="py-20 px-4 bg-[rgb(var(--ocean-deeper))]/50">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-[rgb(var(--straw-gold))] mb-4">Navigate All Seas</h2>
          <p className="text-xl text-[rgb(var(--skull-white))]/70 max-w-2xl mx-auto">
            We support the testnets you need to build the future of Web3
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {networks.map((network, index) => (
            <motion.div
              key={network.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="bg-[rgb(var(--ocean-navy))]/30 backdrop-blur-sm border-[rgb(var(--straw-gold))]/30 p-6 hover:card-glow transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 relative bg-[rgb(var(--ocean-navy))]/50 rounded-full flex items-center justify-center">
                    <Image
                      src={network.logo || "/placeholder.svg"}
                      alt={network.name}
                      width={40}
                      height={40}
                      className="w-10 h-10"
                    />
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2"
                    />
                    Available
                  </Badge>
                </div>
                <h3 className="text-xl font-bold text-[rgb(var(--skull-white))] mb-2">{network.name}</h3>
                <p className="text-[rgb(var(--skull-white))]/60">Get {network.symbol} tokens instantly</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
