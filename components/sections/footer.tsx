"use client"

import { motion } from "framer-motion"
import { Github, Twitter, MessageCircle } from "lucide-react"
import Image from "next/image"

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
      {/* Wave decoration at top */}
      <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[rgb(var(--straw-gold))] to-transparent" />

      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
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
          <div>
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
          <div>
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
          <div>
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

        {/* Bottom bar */}
        <div className="border-t border-[rgb(var(--straw-gold))]/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[rgb(var(--skull-white))]/60 text-sm">
            © {currentYear} Straw Hat Faucet. All rights reserved.
          </p>
          <p className="text-[rgb(var(--skull-white))]/60 text-sm">Built with passion for the Web3 community</p>
        </div>
      </div>
    </footer>
  )
}
