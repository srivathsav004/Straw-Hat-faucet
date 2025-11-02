"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function HeroSection() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-black">
      <motion.div
        className="absolute top-20 right-10 w-16 h-16 opacity-20"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <Image src="/anchor.png" alt="Anchor decoration" width={64} height={64} />
      </motion.div>

      {/* Main content */}
      <motion.div className="relative z-10 text-center px-4 max-w-5xl mx-auto" style={{ y, opacity }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="mb-6 inline-block"
        >
          <div className="w-24 h-24 bg-[rgb(var(--straw-gold))]/10 rounded-full flex items-center justify-center shadow-2xl border border-[rgb(var(--straw-gold))]/30">
            <div className="w-20 h-20 relative">
              <Image src="/hat.png" alt="Straw Hat" width={80} height={80} className="w-full h-full" />
            </div>
          </div>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-[rgb(var(--straw-gold))] mb-6 text-glow"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Set Sail on Your Web3 Journey
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-[rgb(var(--skull-white))]/80 mb-8 max-w-3xl mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Get testnet tokens without mainnet ETH. No barriers, just adventure. Join the crew of builders navigating the
          Grand Line of Web3.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Button
            size="lg"
            className="bg-[rgb(var(--straw-gold))] text-[rgb(var(--ocean-deep))] hover:bg-[rgb(var(--amber-glow))] font-semibold text-lg px-8 py-6 shadow-2xl hover:scale-105 transition-transform"
          >
            Start Your Adventure
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-[rgb(var(--straw-gold))] text-[rgb(var(--straw-gold))] hover:bg-[rgb(var(--straw-gold))]/10 font-semibold text-lg px-8 py-6 bg-transparent"
          >
            View Networks
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
