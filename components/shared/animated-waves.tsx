"use client"

import { motion } from "framer-motion"

export function AnimatedWaves() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Wave 1 - Bottom layer */}
      <motion.div
        className="absolute bottom-0 left-0 w-[200%] h-32 opacity-20"
        style={{
          background: "linear-gradient(90deg, transparent, rgb(var(--sea-green)), transparent)",
        }}
        animate={{
          x: ["-50%", "0%"],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* Wave 2 - Middle layer */}
      <motion.div
        className="absolute bottom-0 left-0 w-[200%] h-24 opacity-15"
        style={{
          background: "linear-gradient(90deg, transparent, rgb(var(--ocean-navy)), transparent)",
        }}
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* Wave 3 - Top layer */}
      <motion.div
        className="absolute bottom-0 left-0 w-[200%] h-20 opacity-10"
        style={{
          background: "linear-gradient(90deg, transparent, rgb(var(--ocean-midnight)), transparent)",
        }}
        animate={{
          x: ["-50%", "0%"],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </div>
  )
}
