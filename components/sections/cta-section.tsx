"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function CTASection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--pirate-red))]/20 via-[rgb(var(--straw-gold))]/20 to-[rgb(var(--amber-glow))]/20"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        style={{
          backgroundSize: "200% 200%",
        }}
      />

      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-20 h-20 mx-auto mb-6 relative"
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Image src="/pirate-flag.png" alt="Pirate Flag" width={80} height={80} className="w-full h-full" />
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold text-[rgb(var(--straw-gold))] mb-6 text-glow">
            Ready to Set Sail?
          </h2>

          <p className="text-xl text-[rgb(var(--skull-white))]/70 mb-8">
            Join thousands of developers building the future of Web3. Your adventure starts here.
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="bg-[rgb(var(--straw-gold))] text-[rgb(var(--ocean-deep))] hover:bg-[rgb(var(--amber-glow))] font-semibold text-xl px-12 py-8 shadow-2xl"
            >
              Get Your Tokens Now
            </Button>
          </motion.div>

          <p className="text-sm text-[rgb(var(--skull-white))]/60 mt-6">
            No signup required • Instant delivery • 100% free
          </p>
        </motion.div>
      </div>
    </section>
  )
}
