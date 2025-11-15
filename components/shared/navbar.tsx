"use client"

import { useState, useEffect } from "react"
import { motion, useScroll } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50)
    })
  }, [scrollY])

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Networks", href: "#networks" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "FAQ", href: "#faq" },
  ]

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-[rgb(var(--ocean-deep))]/80 backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 relative">
            <Image src="/hat.png" alt="Straw Hat Faucet Logo" width={40} height={40} className="w-full h-full" />
          </div>
          <span className="text-2xl font-bold text-[rgb(var(--straw-gold))]">Straw Hat Faucet</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="text-[rgb(var(--skull-white))]/80 hover:text-[rgb(var(--straw-gold))] transition-colors relative group"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[rgb(var(--straw-gold))] group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            className="bg-[rgb(var(--straw-gold))] text-[rgb(var(--ocean-deep))] hover:bg-[rgb(var(--amber-glow))] font-semibold"
            size="lg"
            asChild
          >
            <a href="#receive">Get Tokens</a>
          </Button>
        </motion.div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-[rgb(var(--ocean-deep))] border-[rgb(var(--straw-gold))]/30">
            <div className="flex flex-col gap-6 mt-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xl text-[rgb(var(--skull-white))] hover:text-[rgb(var(--straw-gold))] transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <Button
                className="bg-[rgb(var(--straw-gold))] text-[rgb(var(--ocean-deep))] hover:bg-[rgb(var(--amber-glow))] font-semibold mt-4"
                size="lg"
                asChild
              >
                <a href="#receive">Get Tokens</a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.nav>
  )
}
