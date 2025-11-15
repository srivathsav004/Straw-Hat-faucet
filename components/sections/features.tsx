"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Anchor, Map, Zap, Code, Users, Ship } from "lucide-react"

const features = [
  {
    icon: Anchor,
    title: "No Mainnet ETH Required",
    description: "Start testing without spending real ETH. We've got you covered with free testnet tokens.",
  },
  {
    icon: Map,
    title: "Multiple Testnets",
    description: "Access Polygon Amoy, AVAX Fuji, Base Sepolia, and Ethereum Sepolia.",
  },
  // {
  //   icon: Zap,
  //   title: "Fast Payouts",
  //   description: "Tokens delivered to your wallet in seconds. No waiting, no delays.",
  // },
  // {
  //   icon: Code,
  //   title: "Developer Friendly",
  //   description: "Built by devs, for devs. Simple API integration available for automation.",
  // },
  // {
  //   icon: Users,
  //   title: "Community Driven",
  //   description: "Join thousands of builders on their Web3 journey. We're all in this together.",
  // },
  {
    icon: Ship,
    title: "Always Available",
    description: "24/7 uptime. Your adventure never stops, and neither do we.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden bg-[rgb(var(--ocean-darker))]/50">
      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-[rgb(var(--straw-gold))] mb-4">
            What You Get
          </h2>
          <p className="text-xl text-[rgb(var(--skull-white))]/70 max-w-2xl mx-auto">
            Fast, reliable testnet funds with a clean UX so you can focus on building.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="bg-[rgb(var(--ocean-navy))]/30 backdrop-blur-sm border-[rgb(var(--straw-gold))]/30 p-6 h-full hover:card-glow transition-all duration-300 group cursor-pointer">
                <motion.div whileHover={{ scale: 1.05, rotate: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <div className="w-16 h-16 bg-[rgb(var(--straw-gold))]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[rgb(var(--straw-gold))]/20 transition-colors">
                    <feature.icon className="w-8 h-8 text-[rgb(var(--straw-gold))]" />
                  </div>
                </motion.div>
                <h3 className="text-2xl font-bold text-[rgb(var(--straw-gold))] mb-3 group-hover:text-glow transition-all">
                  {feature.title}
                </h3>
                <p className="text-[rgb(var(--skull-white))]/70">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
