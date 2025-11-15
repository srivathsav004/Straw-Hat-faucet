"use client"

import { motion } from "framer-motion"
import { Github, Twitter, MessageCircle } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: [
      { name: "Home", href: "#home" },
      { name: "Networks", href: "#networks" },
      { name: "How It Works", href: "#how-it-works" },
      { name: "FAQ", href: "#faq" },
    ],
    legal: [
      { name: "Terms of Service", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Cookie Policy", href: "#" },
    ],
    social: [
      { name: "Twitter", icon: Twitter, href: "#" },
      { name: "GitHub", icon: Github, href: "#" },
      { name: "Discord", icon: MessageCircle, href: "#" },
    ],
  }

  return (
    <footer className="bg-[rgb(var(--ocean-deep))] border-t border-[rgb(var(--straw-gold))]/30 py-12 px-4 relative">

      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 relative">
                <Image src="/hat.png" alt="Logo" width={40} height={40} className="w-full h-full" />
              </div>
              <span className="text-xl font-bold text-[rgb(var(--straw-gold))]">Straw Hat Faucet</span>
            </div>
            <p className="text-[rgb(var(--skull-white))]/60 text-sm">
              Empowering Web3 developers with free testnet tokens. No barriers, just adventure.
            </p>
          </div>

          {/* Product Links */}
          <div className="md:col-span-3">
            <h3 className="text-[rgb(var(--straw-gold))] font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-[rgb(var(--skull-white))]/60 hover:text-[rgb(var(--straw-gold))] transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="md:col-span-2">
            <h3 className="text-[rgb(var(--straw-gold))] font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-[rgb(var(--skull-white))]/60 hover:text-[rgb(var(--straw-gold))] transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="md:col-span-2">
            <h3 className="text-[rgb(var(--straw-gold))] font-semibold mb-4">Community</h3>
            <div className="flex gap-4">
              {footerLinks.social.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-[rgb(var(--ocean-navy))]/30 rounded-full flex items-center justify-center text-[rgb(var(--skull-white))] hover:bg-[rgb(var(--straw-gold))]/20 hover:text-[rgb(var(--straw-gold))] transition-all"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Star/Donate Panel */}
        <motion.div
          className="rounded-md border border-[rgb(var(--straw-gold))]/30 bg-[rgb(var(--ocean-navy))]/20 p-5 text-center mx-auto max-w-3xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <p className="text-[rgb(var(--skull-white))]/70 text-sm">Found this useful? Consider starring on GitHub.</p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button asChild size="sm" className="bg-[rgb(var(--straw-gold))] text-[rgb(var(--ocean-deep))] hover:bg-[rgb(var(--amber-glow))]">
                <a href="https://github.com/srivathsav004/Straw-Hat-faucet" target="_blank" rel="noopener noreferrer" aria-label="Star on GitHub">
                  <Github className="mr-2" /> Star on GitHub
                </a>
              </Button>
            </motion.div>
          </div>
          <p className="text-[rgb(var(--skull-white))]/60 text-xs mt-3 break-all">
            Want to contribute faucets? Donate: <span className="text-[rgb(var(--straw-gold))]">0x6dca1d4db6f6154cfc8b8a2a2b3dedc9a25c1835</span>
          </p>
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-[rgb(var(--straw-gold))]/30 pt-8 flex justify-center items-center">
          <p className="text-[rgb(var(--skull-white))]/60 text-sm">
            © {currentYear} Straw Hat Faucet. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}
