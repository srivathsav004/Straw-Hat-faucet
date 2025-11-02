"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Wallet, Compass, Gift } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Wallet,
    title: "Connect Your Wallet",
    description: "Connect your Web3 wallet using MetaMask, WalletConnect, or any compatible wallet.",
  },
  {
    number: "02",
    icon: Compass,
    title: "Select Your Network",
    description: "Choose the testnet you need tokens for from our supported networks.",
  },
  {
    number: "03",
    icon: Gift,
    title: "Receive Tokens",
    description: "Tokens are sent instantly to your wallet. Start building your dApp right away!",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 px-4 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-[rgb(var(--straw-gold))] mb-4">Your Journey in 3 Steps</h2>
          <p className="text-xl text-[rgb(var(--skull-white))]/70 max-w-2xl mx-auto">
            Getting testnet tokens is as easy as setting sail with the Straw Hat crew
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="mb-8 last:mb-0"
            >
              <Card className="bg-[rgb(var(--ocean-navy))]/30 backdrop-blur-sm border-[rgb(var(--straw-gold))]/30 p-8 hover:card-glow transition-all duration-300">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  {/* Number badge */}
                  <motion.div
                    className="flex-shrink-0 w-20 h-20 bg-[rgb(var(--straw-gold))] rounded-full flex items-center justify-center text-3xl font-bold text-[rgb(var(--ocean-deep))]"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {step.number}
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    className="flex-shrink-0 w-16 h-16 bg-[rgb(var(--pirate-red))]/20 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <step.icon className="w-8 h-8 text-[rgb(var(--pirate-red))]" />
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-[rgb(var(--straw-gold))] mb-2">{step.title}</h3>
                    <p className="text-[rgb(var(--skull-white))]/70">{step.description}</p>
                  </div>
                </div>
              </Card>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <motion.div
                  className="w-1 h-12 bg-gradient-to-b from-[rgb(var(--straw-gold))] to-transparent mx-auto my-4"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.3, duration: 0.4 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
