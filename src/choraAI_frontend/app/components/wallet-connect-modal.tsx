"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet, Smartphone, Globe, Shield, AlertCircle, CheckCircle, Loader2 } from "lucide-react"

interface WalletConnectModalProps {
  isOpen: boolean
  onClose: () => void
  onConnect: (address: string, walletType: string) => void
}

export default function WalletConnectModal({ isOpen, onClose, onConnect }: WalletConnectModalProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectingWallet, setConnectingWallet] = useState("")
  const [error, setError] = useState("")

  const wallets = [
    {
      id: "internet-identity",
      name: "Internet Identity",
      description: "Connect using Internet Identity",
      icon: "🆔",
      type: "browser",
      installed: true,
    },
    {
      id: "plug",
      name: "Plug Wallet",
      description: "Connect using Plug browser extension",
      icon: "🔌",
      type: "browser",
      installed: typeof window !== "undefined" && window.ic?.plug,
    },
    {
      id: "stoic",
      name: "Stoic Wallet",
      description: "Connect using Stoic wallet",
      icon: "🏛️",
      type: "browser",
      installed: true,
    },
    {
      id: "nfid",
      name: "NFID",
      description: "Connect using NFID wallet",
      icon: "🎭",
      type: "browser",
      installed: true,
    },
    {
      id: "bitfinity",
      name: "Bitfinity Wallet",
      description: "Connect using Bitfinity wallet",
      icon: "♾️",
      type: "browser",
      installed: true,
    },
  ]

  const connectWallet = async (walletId: string, walletName: string) => {
    setIsConnecting(true)
    setConnectingWallet(walletId)
    setError("")

    try {
      if (walletId === "internet-identity") {
        // Simulate Internet Identity connection
        await new Promise((resolve) => setTimeout(resolve, 2000))
        const mockPrincipal = "rdmx6-jaaaa-aaaah-qcaiq-cai"
        onConnect(mockPrincipal, walletName)
      } else if (walletId === "plug") {
        if (!window.ic?.plug) {
          throw new Error("Plug Wallet is not installed")
        }
        // Simulate Plug wallet connection
        await new Promise((resolve) => setTimeout(resolve, 2000))
        const mockPrincipal = "rrkah-fqaaa-aaaah-qcaiq-cai"
        onConnect(mockPrincipal, walletName)
      } else if (walletId === "stoic") {
        // Simulate Stoic wallet connection
        await new Promise((resolve) => setTimeout(resolve, 2000))
        const mockPrincipal = "rno2w-sqaaa-aaaah-qcaiq-cai"
        onConnect(mockPrincipal, walletName)
      } else {
        // Simulate connection for other ICP wallets
        await new Promise((resolve) => setTimeout(resolve, 2000))
        const mockPrincipal = "rdmx6-jaaaa-aaaah-qcaiq-cai"
        onConnect(mockPrincipal, walletName)
      }
    } catch (err: any) {
      setError(err.message || "Failed to connect wallet")
    } finally {
      setIsConnecting(false)
      setConnectingWallet("")
    }
  }

  const installWallet = (walletId: string) => {
    const urls = {
      "internet-identity": "https://identity.ic0.app/",
      plug: "https://plugwallet.ooo/",
      stoic: "https://www.stoicwallet.com/",
      nfid: "https://nfid.one/",
      bitfinity: "https://wallet.bitfinity.network/",
    }

    if (urls[walletId as keyof typeof urls]) {
      window.open(urls[walletId as keyof typeof urls], "_blank")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center space-x-2">
            <Wallet className="w-5 h-5 text-blue-400" />
            <span>Connect Wallet</span>
          </DialogTitle>
          <p className="text-slate-400 text-sm">Choose your preferred ICP wallet to connect</p>
        </DialogHeader>

        <div className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {wallets.map((wallet) => (
              <Card
                key={wallet.id}
                className={`bg-slate-800/50 border-slate-700 p-4 transition-all duration-200 hover:bg-slate-800/70 hover:border-slate-600 ${
                  connectingWallet === wallet.id ? "border-blue-500/50 bg-blue-500/5" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center text-lg">
                      {wallet.icon}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-white font-medium">{wallet.name}</h3>
                        {wallet.type === "browser" && <Globe className="w-3 h-3 text-slate-400" />}
                        {wallet.type === "mobile" && <Smartphone className="w-3 h-3 text-slate-400" />}
                      </div>
                      <p className="text-slate-400 text-sm">{wallet.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {wallet.installed ? (
                      <Badge className="bg-green-500/10 text-green-400 border-green-500/30 text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Ready
                      </Badge>
                    ) : (
                      <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30 text-xs">
                        Not Installed
                      </Badge>
                    )}

                    {wallet.installed ? (
                      <Button
                        size="sm"
                        onClick={() => connectWallet(wallet.id, wallet.name)}
                        disabled={isConnecting}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {connectingWallet === wallet.id ? <Loader2 className="w-3 h-3 animate-spin" /> : "Connect"}
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => installWallet(wallet.id)}
                        className="border-slate-600 text-slate-300 hover:bg-slate-800"
                      >
                        Install
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Shield className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-blue-400 font-medium text-sm mb-1">Secure Connection</h4>
                <p className="text-blue-300/80 text-xs leading-relaxed">
                  Your ICP wallet connection is encrypted and secure. We never store your private keys or have access to
                  your funds.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button variant="ghost" onClick={onClose} className="text-slate-400 hover:text-white">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
