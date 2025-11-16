"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import Image from "next/image"
import HCaptcha from "@hcaptcha/react-hcaptcha"
import { motion } from "framer-motion"

type Stage =
  | "idle"
  | "routing"
  | "signing"
  | "sending"
  | "confirming"
  | "success"
  | "error"
  | "cooldown"

const NETWORK_OPTIONS = [
  { value: "amoy", label: "Polygon Amoy" },
  { value: "fuji", label: "Avalanche Fuji" },
  { value: "sepolia", label: "Ethereum Sepolia" },
  { value: "base", label: "Base Sepolia" },
]

const BACKEND_NETWORK_MAP: Record<string, string> = {
  amoy: "amoy",
  fuji: "fuji",
  sepolia: "sepolia",
  base: "base",
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
  const [addrError, setAddrError] = useState<string>("")
  const [copied, setCopied] = useState<boolean>(false)
  const [stage, setStage] = useState<Stage>("idle")
  const [progress, setProgress] = useState<number>(0)
  const progressTimer = useRef<number | null>(null)

  const explorerTx = useMemo(() => {
    const map: Record<string, string> = {
      amoy: "https://amoy.polygonscan.com/tx/",
      fuji: "https://testnet.snowtrace.io/tx/",
      sepolia: "https://sepolia.etherscan.io/tx/",
      base: "https://sepolia.basescan.org/tx/",
    }
    return map[network] || ""
  }, [network])

  const onClaim = useCallback(async () => {
    setError("")
    setTxHash("")
    setCopied(false)
    setProgress(0)

    if (!address) {
      setError("Enter your wallet address")
      return
    }

    const isEvm = /^0x[a-fA-F0-9]{40}$/.test(address)
    if (!isEvm) {
      setAddrError("Invalid wallet address format")
      return
    }
    setAddrError("")

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
      setStage("routing")
      // Animate a single progress bar up to 95% while waiting for the API
      if (progressTimer.current) window.clearInterval(progressTimer.current)
      progressTimer.current = window.setInterval(() => {
        setProgress((p) => {
          const cap = 95
          // smaller increments for smoother visual movement
          return p < cap ? Math.min(cap, p + 1) : p
        })
      }, 50)
      const mappedNetwork = BACKEND_NETWORK_MAP[network] ?? network
      const res = await fetch(`${BACKEND_URL}/claim`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ network: mappedNetwork, recipient: address, captchaToken }),
      })

      const result = await res.json()
      // stop background progress and complete the bar
      if (progressTimer.current) {
        window.clearInterval(progressTimer.current)
        progressTimer.current = null
      }
      setProgress(100)
      if (res.ok && result?.success) {
        // allow ship to reach the end smoothly, then reveal success
        window.setTimeout(() => {
          setTxHash(result.txHash)
          setStage("success")
        }, 350)
      } else {
        const humanize = (seconds: number) => {
          if (!Number.isFinite(seconds) || seconds <= 0) return 'a moment';
          const mins = Math.ceil(seconds / 60)
          if (mins < 60) return `${mins} minute${mins === 1 ? '' : 's'}`;
          const hrs = Math.ceil(mins / 60)
          return `${hrs} hour${hrs === 1 ? '' : 's'}`;
        }
        const msg =
          result?.error === "Wait before next claim" && typeof result?.wait === "number"
            ? `Wait before next claim. Try again in ${humanize(result.wait)}.`
            : result?.error || "Claim failed";
        // allow ship to reach end, then reveal error/cooldown
        window.setTimeout(() => {
          setError(msg)
          setStage(result?.error === "Wait before next claim" ? "cooldown" : "error")
        }, 350)
      }
    } catch (e: any) {
      const msg = e?.message ?? "Claim request failed"
      setError(msg)
      setStage("error")
    } finally {
      // keep the progress visible a touch longer for a clean finish
      window.setTimeout(() => setClaiming(false), 400)
      // Reset captcha after each attempt
      setCaptchaToken("")
      try {
        captchaRef.current?.resetCaptcha?.()
      } catch {}
      if (progressTimer.current) {
        window.clearInterval(progressTimer.current)
        progressTimer.current = null
      }
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
      case "base":
        return "/networks/base.png"
      default:
        return "/networks/polygon.png"
    }
  }, [network])

  // progress steps removed in favor of a single progress bar with ship indicator

  useEffect(() => {
    if (stage === "success") {
      // briefly keep 100% before resetting UI state
      const t = setTimeout(() => { setStage("idle"); setProgress(0); }, 4000)
      return () => clearTimeout(t)
    }
    if (stage === "error" || stage === "cooldown") {
      const t = setTimeout(() => { setStage("idle"); setProgress(0); }, 6000)
      return () => clearTimeout(t)
    }
  }, [stage])

  return (
    <motion.section
      id="receive"
      className="py-20 px-4 relative overflow-hidden bg-[rgb(var(--ocean-darker))]/40"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto max-w-3xl relative z-10 no-scroll-anchor">
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
          <Card className="bg-[rgb(var(--ocean-navy))]/30 backdrop-blur-sm border-[rgb(var(--straw-gold))]/30 p-6 border rounded-xl border-glow gold-glow">
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
                <SelectTrigger className="mt-2 bg-transparent border-[rgb(var(--straw-gold))]/30 text-[rgb(var(--skull-white))] transition-colors focus-visible:border-[rgb(var(--straw-gold))] hover:border-[rgb(var(--straw-gold))]/50">
                  <div className="flex items-center gap-2">
                    <div className="relative h-5 w-5">
                      <Image src={networkIcon} alt={selected?.label || "network"} fill className="object-contain rounded" />
                    </div>
                    <span>{selected?.label || "Choose a network"}</span>
                  </div>
                </SelectTrigger>
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
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value.trim())}
                placeholder="0x..."
                className={`mt-2 bg-transparent border-[rgb(var(--straw-gold))]/30 text-[rgb(var(--skull-white))] placeholder:text-[rgb(var(--skull-white))]/40 transition-colors focus-visible:border-[rgb(var(--straw-gold))] hover:border-[rgb(var(--straw-gold))]/50 ${addrError ? 'border-red-500/60' : ''}`}
              />
              {addrError && <p className="mt-2 text-sm text-red-400">{addrError}</p>}
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

            {(claiming || stage === "success") && (
              <div className="rounded-md p-3 bg-[rgb(var(--ocean-deep))]/60 border border-[rgb(var(--straw-gold))]/20">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-[rgb(var(--skull-white))]/80">Processing transaction</p>
                  <Spinner className="h-4 w-4 text-[rgb(var(--straw-gold))]" />
                </div>
                <div className="relative h-6">
                  {/* Track with fill (kept overflow hidden) */}
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-3 rounded-full bg-[rgb(var(--skull-white))]/15 overflow-hidden">
                    <div
                      className="h-full bg-[rgb(var(--straw-gold))] transition-[width] duration-300 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  {/* Ship overlay above the track to avoid clipping */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 z-10 transition-[left] duration-300 ease-linear"
                    style={{ left: `${progress}%`, transform: 'translate(-50%, -50%)' }}
                  >
                    <Image src="/ship.png" alt="ship" width={36} height={18} className="object-contain drop-shadow" />
                  </div>
                </div>
              </div>
            )}

            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button
                onClick={onClaim}
                disabled={claiming || !captchaToken}
                className="w-full bg-[rgb(var(--straw-gold))] text-[rgb(var(--ocean-deep))] hover:bg-[rgb(var(--amber-glow))] font-semibold py-6 transition-all"
              >
                Receive Tokens
              </Button>
            </motion.div>

            {(txHash || error) && (
              <div className="space-y-2">
                {txHash && (
                  <div className="text-sm rounded-md border border-[rgb(var(--straw-gold))]/30 p-3 bg-[rgb(var(--ocean-deep))]/60">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-green-400 font-medium">Success! Transaction recorded.</p>
                      <div className="flex items-center gap-2 sm:gap-3">
                        {explorerTx && (
                          <a
                            href={`${explorerTx}${txHash}`}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="View on explorer"
                            title="View on explorer"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[rgb(var(--straw-gold))] hover:bg-[rgb(var(--straw-gold))]/10"
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                              <path d="M15 3h6v6" />
                              <path d="M10 14 21 3" />
                            </svg>
                          </a>
                        )}
                        <button
                          type="button"
                          aria-label="Copy transaction hash"
                          title={copied ? "Copied" : "Copy"}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[rgb(var(--straw-gold))] hover:bg-[rgb(var(--straw-gold))]/10"
                          onClick={async () => {
                            try {
                              await navigator.clipboard.writeText(txHash)
                              setCopied(true)
                              setTimeout(() => setCopied(false), 1200)
                            } catch {}
                          }}
                        >
                          {copied ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 6 9 17l-5-5" />
                            </svg>
                          ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 h-px bg-[rgb(var(--straw-gold))]/20" />
                    <p className="mt-2 font-mono text-[rgb(var(--skull-white))]/80 break-all">
                      {txHash}
                    </p>
                  </div>
                )}
                {error && (
                  <div className={`text-sm rounded-md p-3 border ${stage === 'cooldown' ? 'border-[rgb(var(--amber-glow))]/40 text-[rgb(var(--amber-glow))]' : 'border-red-500/40 text-red-400'}`}>
                    {error}
                  </div>
                )}
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
