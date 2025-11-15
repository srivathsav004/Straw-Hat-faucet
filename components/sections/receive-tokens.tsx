"use client"

import { useCallback, useMemo, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import Image from "next/image"
import HCaptcha from "@hcaptcha/react-hcaptcha"
import { motion } from "framer-motion"

const NETWORK_OPTIONS = [
  { value: "amoy", label: "Polygon Amoy" },
  { value: "fuji", label: "Avalanche Fuji" },
  { value: "sepolia", label: "Ethereum Sepolia" },
  { value: "baseSepolia", label: "Base Sepolia" },
]

const BACKEND_NETWORK_MAP: Record<string, string> = {
  amoy: "amoy",
  fuji: "avax",
  sepolia: "sepolia",
  baseSepolia: "base",
}

const BACKEND_URL = process.env.NEXT_PUBLIC_FAUCET_API
const HCAPTCHA_SITEKEY = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY

export function ReceiveTokensSection() {
  const [network, setNetwork] = useState<string>(NETWORK_OPTIONS[0].value)
  const [address, setAddress] = useState<string>("")
  const [claiming, setClaiming] = useState<boolean>(false)
  const [txHash, setTxHash] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [captchaToken, setCaptchaToken] = useState<string>("")
  const captchaRef = useRef<any>(null)

  const onClaim = useCallback(async () => {
    setError("")
    setTxHash("")

    if (!address) {
      setError("Enter your wallet address")
      return
    }

    if (!BACKEND_URL) {
      setError("Backend URL is not configured. Set NEXT_PUBLIC_FAUCET_API in your env.")
      return
    }

    if (!HCAPTCHA_SITEKEY) {
      setError("hCaptcha sitekey is not configured. Set NEXT_PUBLIC_HCAPTCHA_SITEKEY in your env.")
      return
    }

    if (!captchaToken) {
      setError("Complete the human verification (hCaptcha)")
      return
    }

    try {
      setClaiming(true)
      const mappedNetwork = BACKEND_NETWORK_MAP[network] ?? network
      const res = await fetch(`${BACKEND_URL}/claim`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ network: mappedNetwork, recipient: address, captchaToken }),
      })

      const result = await res.json()
      if (res.ok && result?.success) {
        setTxHash(result.txHash)
      } else {
        const humanize = (seconds: number) => {
          if (!Number.isFinite(seconds) || seconds <= 0) return 'a moment';
          const mins = Math.ceil(seconds / 60)
          if (mins < 60) return `${mins} minute${mins === 1 ? '' : 's'}`
          const hrs = Math.ceil(mins / 60)
          return `${hrs} hour${hrs === 1 ? '' : 's'}`
        }
        const msg =
          result?.error === "Wait before next claim" && typeof result?.wait === "number"
            ? `Wait before next claim. Try again in ${humanize(result.wait)}.`
            : result?.error || "Claim failed"
        setError(msg)
      }
    } catch (e: any) {
      const msg = e?.message ?? "Claim request failed"
      setError(msg)
    } finally {
      setClaiming(false)
      // Reset captcha after each attempt
      setCaptchaToken("")
      try {
        captchaRef.current?.resetCaptcha?.()
      } catch {}
    }
  }, [address, network, captchaToken])

  const selected = useMemo(() => NETWORK_OPTIONS.find((n) => n.value === network), [network])
  const networkIcon = useMemo(() => {
    switch (network) {
      case "amoy":
        return "/networks/polygon.png"
      case "fuji":
        return "/networks/avalanche.png"
      case "sepolia":
        return "/networks/ethereum.png"
      case "baseSepolia":
        return "/networks/base.png"
      default:
        return "/networks/polygon.png"
    }
  }, [network])

  return (
    <motion.section
      id="receive"
      className="py-20 px-4 relative overflow-hidden bg-[rgb(var(--ocean-darker))]/40"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto max-w-3xl relative z-10">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 className="text-4xl md:text-6xl font-bold text-[rgb(var(--straw-gold))] mb-3 text-glow">
            Receive Testnet Tokens
          </motion.h2>
          <motion.p className="text-[rgb(var(--skull-white))]/70 text-lg">
            Select a network, enter your wallet, and we will send you native test tokens.
          </motion.p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="bg-[rgb(var(--ocean-navy))]/30 backdrop-blur-sm border-[rgb(var(--straw-gold))]/30 p-6">
            <motion.div
              className="grid grid-cols-1 gap-6"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            >
              <div>
                <Label className="text-[rgb(var(--skull-white))]">Select Network</Label>
              <Select value={network} onValueChange={setNetwork}>
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <SelectTrigger className="mt-2 bg-transparent border-[rgb(var(--straw-gold))]/30 text-[rgb(var(--skull-white))]">
                  <div className="flex items-center gap-2">
                    <div className="relative h-5 w-5">
                      <Image src={networkIcon} alt={selected?.label || "network"} fill className="object-contain rounded" />
                    </div>
                    <span>{selected?.label || "Choose a network"}</span>
                  </div>
                </SelectTrigger>
                </motion.div>
                <SelectContent className="bg-[rgb(var(--ocean-deep))] border-[rgb(var(--straw-gold))]/30 text-[rgb(var(--skull-white))]">
                  {NETWORK_OPTIONS.map((n) => (
                    <SelectItem key={n.value} value={n.value}>
                      <span className="inline-flex items-center gap-2">
                        <span className="relative h-4 w-4">
                          <Image
                            src={
                              n.value === "amoy"
                                ? "/networks/polygon.png"
                                : n.value === "fuji"
                                ? "/networks/avalanche.png"
                                : n.value === "sepolia"
                                ? "/networks/ethereum.png"
                                : "/networks/base.png"
                            }
                            alt={n.label}
                            fill
                            className="object-contain rounded"
                          />
                        </span>
                        {n.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-[rgb(var(--skull-white))]">Enter Your Wallet Address</Label>
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.995 }}>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value.trim())}
                placeholder="0x..."
                className="mt-2 bg-transparent border-[rgb(var(--straw-gold))]/30 text-[rgb(var(--skull-white))] placeholder:text-[rgb(var(--skull-white))]/40"
              />
              </motion.div>
            </div>

            <div>
              <Label className="text-[rgb(var(--skull-white))]">Human Verification</Label>
              <div className="mt-2">
                <HCaptcha
                  sitekey={HCAPTCHA_SITEKEY || ""}
                  onVerify={(token: string) => setCaptchaToken(token)}
                  onExpire={() => setCaptchaToken("")}
                  onError={() => setCaptchaToken("")}
                  theme="dark"
                  ref={captchaRef}
                />
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button
                onClick={onClaim}
                disabled={claiming || !captchaToken}
                className="w-full bg-[rgb(var(--straw-gold))] text-[rgb(var(--ocean-deep))] hover:bg-[rgb(var(--amber-glow))] font-semibold py-6"
              >
                {claiming ? (
                  <span className="inline-flex items-center gap-2"><Spinner className="h-4 w-4" /> Processing...</span>
                ) : (
                  "Receive Tokens"
                )}
              </Button>
            </motion.div>

            {(txHash || error) && (
              <div className="space-y-2">
                {txHash && <p className="text-sm text-green-400 break-all">Success! TX Hash: {txHash}</p>}
                {error && <p className="text-sm text-red-400">{error}</p>}
              </div>
            )}
            </motion.div>
          </Card>
        </motion.div>

        <div className="pointer-events-none absolute inset-0 opacity-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[rgb(var(--straw-gold))] blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-72 h-72 rounded-full bg-[rgb(var(--pirate-red))] blur-3xl" />
        </div>
      </div>
    </motion.section>
  )
}
