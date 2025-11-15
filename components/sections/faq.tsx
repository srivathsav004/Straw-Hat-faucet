"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is a testnet faucet?",
    answer:
      "A testnet faucet is a service that provides free testnet tokens to developers. These tokens have no real-world value but are essential for testing smart contracts and dApps before deploying to mainnet.",
  },
  {
    question: "Which networks do you support?",
    answer:
      "We currently support Ethereum Sepolia, Base Sepolia, Polygon Amoy, Avalanche Fuji, Arbitrum Sepolia, and Optimism Sepolia. We're constantly adding more networks based on community demand.",
  },
  {
    question: "How often can I request tokens?",
    answer:
      "You can request tokens once every 24 hours per wallet address. This helps us ensure fair distribution and availability for all developers.",
  },
  {
    question: "Do I need mainnet ETH to use this faucet?",
    answer:
      "No! That's the whole point. Unlike many other faucets, we don't require you to have mainnet ETH. Just connect your wallet and request tokens.",
  },
  {
    question: "Is there a limit per wallet?",
    answer:
      "Yes, each wallet can receive a specific amount per request (varies by network). This ensures fair distribution and prevents abuse of the service.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Token delivery is instant! Once you submit your request, tokens are sent to your wallet within seconds. If there's a delay, it's usually due to network congestion.",
  },
  {
    question: "Can I use this for mainnet?",
    answer:
      "No, this faucet only provides testnet tokens. These tokens have no real-world value and can only be used on test networks for development purposes.",
  },
  // {
  //   question: "Is there an API available?",
  //   answer:
  //     "Yes! We offer a simple API for developers who want to integrate faucet functionality into their tools or workflows. Check our documentation for details.",
  // },
]

export function FAQSection() {
  return (
    <section id="faq" className="py-20 px-4 bg-[rgb(var(--ocean-darker))]/50">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-[rgb(var(--straw-gold))] mb-4">Navigator's Guide</h2>
          <p className="text-xl text-[rgb(var(--skull-white))]/70">
            Everything you need to know about Straw Hat Faucet
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-[rgb(var(--ocean-navy))]/30 backdrop-blur-sm border-[rgb(var(--straw-gold))]/30 rounded-lg px-6"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-[rgb(var(--skull-white))] hover:text-[rgb(var(--straw-gold))] transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[rgb(var(--skull-white))]/70">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
