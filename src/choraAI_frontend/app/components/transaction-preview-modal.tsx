"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, ArrowDown, Info, Zap, Shield, TrendingUp, ChevronDown, ChevronUp } from "lucide-react"

interface TransactionPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  intent: string
}

export default function TransactionPreviewModal({ isOpen, onClose, intent }: TransactionPreviewModalProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [copied, setCopied] = useState(false)

  const mockData = {
    fromToken: {
      symbol: "ICP",
      amount: "0.5",
      network: "Internet Computer",
      logo: "/placeholder.svg?height=48&width=48",
      usdValue: "$9.24",
    },
    toToken: {
      symbol: "ckBTC",
      amount: "0.000924",
      network: "Internet Computer",
      logo: "/placeholder.svg?height=48&width=48",
      usdValue: "$9.24",
    },
    route: [
      { name: "Internet Computer", dex: "Your Wallet", icon: "/placeholder.svg?height=32&width=32" },
      { name: "Internet Computer", dex: "ICPSwap DEX", icon: "/placeholder.svg?height=32&width=32" },
      { name: "Internet Computer", dex: "Your Wallet", icon: "/placeholder.svg?height=32&width=32" },
    ],
    fees: {
      gas: "0.0001 ICP (~$0.002)",
      bridge: "N/A (Native ICP)",
      protocol: "0.05%",
      total: "$0.002",
    },
    priceImpact: "0.12%",
    slippage: "0.5%",
    executionTime: "~30 seconds",
    savings: "+$0.21",
    savingsPercent: "+2.3%",
  }

  const handleConfirm = async () => {
    setIsConfirming(true)
    // Simulate transaction confirmation
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsConfirming(false)
    onClose()
    // Here you would typically show a success message or redirect
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl lg:text-2xl font-bold">Transaction Preview</DialogTitle>
          <p className="text-slate-400 text-sm lg:text-base">Review your swap before confirming</p>
        </DialogHeader>

        <div className="space-y-6 lg:space-y-8">
          {/* Intent Display */}
          <Card className="bg-slate-800/50 border-slate-700 p-4 lg:p-6">
            <div className="flex items-start space-x-3 lg:space-x-4">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Zap className="w-4 h-4 lg:w-5 lg:h-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm lg:text-base text-slate-300 mb-2">Your Intent:</p>
                <p className="text-white font-medium text-sm lg:text-base">"{intent}"</p>
              </div>
            </div>
          </Card>

          {/* Swap Summary */}
          <div className="space-y-4 lg:space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg lg:text-xl font-semibold text-white">Swap Summary</h3>
              <Badge className="bg-green-500/10 text-green-400 border-green-500/30 px-3 py-1">
                {mockData.savingsPercent} better
              </Badge>
            </div>

            <div className="bg-slate-800/30 rounded-2xl p-6 lg:p-8">
              {/* From Token */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3 lg:space-x-4">
                  <img
                    src={mockData.fromToken.logo || "/placeholder.svg"}
                    alt={mockData.fromToken.symbol}
                    className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl"
                    onError={(e) => {
                      e.currentTarget.src = `/placeholder.svg?height=56&width=56&query=${mockData.fromToken.symbol}+logo`
                    }}
                  />
                  <div>
                    <p className="text-white font-semibold text-lg lg:text-xl">
                      {mockData.fromToken.amount} {mockData.fromToken.symbol}
                    </p>
                    <p className="text-slate-400 text-sm lg:text-base">{mockData.fromToken.network}</p>
                    <p className="text-slate-500 text-xs lg:text-sm">{mockData.fromToken.usdValue}</p>
                  </div>
                </div>
                <Badge variant="outline" className="border-slate-600 text-slate-300">
                  From
                </Badge>
              </div>

              {/* Arrow */}
              <div className="flex justify-center mb-6">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-slate-700 rounded-full flex items-center justify-center">
                  <ArrowDown className="w-5 h-5 lg:w-6 lg:h-6 text-slate-400" />
                </div>
              </div>

              {/* To Token */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 lg:space-x-4">
                  <img
                    src={mockData.toToken.logo || "/placeholder.svg"}
                    alt={mockData.toToken.symbol}
                    className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl"
                    onError={(e) => {
                      e.currentTarget.src = `/placeholder.svg?height=56&width=56&query=${mockData.toToken.symbol}+logo`
                    }}
                  />
                  <div>
                    <p className="text-white font-semibold text-lg lg:text-xl">
                      {mockData.toToken.amount} {mockData.toToken.symbol}
                    </p>
                    <p className="text-slate-400 text-sm lg:text-base">{mockData.toToken.network}</p>
                    <p className="text-slate-500 text-xs lg:text-sm">{mockData.toToken.usdValue}</p>
                  </div>
                </div>
                <Badge variant="outline" className="border-green-500/30 bg-green-500/10 text-green-400">
                  To
                </Badge>
              </div>
            </div>
          </div>

          {/* Route Visualization */}
          <div className="space-y-4 lg:space-y-6">
            <h3 className="text-lg lg:text-xl font-semibold text-white">Execution Route</h3>
            <Card className="bg-slate-800/30 border-slate-700 p-4 lg:p-6">
              <div className="space-y-4">
                {mockData.route.map((step, index) => (
                  <div key={index} className="flex items-center space-x-3 lg:space-x-4">
                    <img
                      src={step.icon || "/placeholder.svg"}
                      alt={step.name}
                      className="w-8 h-8 lg:w-10 lg:h-10 rounded-full"
                      onError={(e) => {
                        e.currentTarget.src = `/placeholder.svg?height=40&width=40&query=${step.name}+icon`
                      }}
                    />
                    <div className="flex-1">
                      <p className="text-white text-sm lg:text-base font-medium">{step.name}</p>
                      <p className="text-slate-400 text-xs lg:text-sm">{step.dex}</p>
                    </div>
                    {index < mockData.route.length - 1 && (
                      <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 text-slate-500" />
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            <Card className="bg-slate-800/30 border-slate-700 p-3 lg:p-4 text-center">
              <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-green-400 mx-auto mb-2" />
              <p className="text-xs text-slate-400 mb-1">Price Impact</p>
              <p className="text-white font-semibold text-sm lg:text-base">{mockData.priceImpact}</p>
            </Card>
            <Card className="bg-slate-800/30 border-slate-700 p-3 lg:p-4 text-center">
              <Shield className="w-4 h-4 lg:w-5 lg:h-5 text-blue-400 mx-auto mb-2" />
              <p className="text-xs text-slate-400 mb-1">Max Slippage</p>
              <p className="text-white font-semibold text-sm lg:text-base">{mockData.slippage}</p>
            </Card>
            <Card className="bg-slate-800/30 border-slate-700 p-3 lg:p-4 text-center">
              <Zap className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-400 mx-auto mb-2" />
              <p className="text-xs text-slate-400 mb-1">Est. Time</p>
              <p className="text-white font-semibold text-xs lg:text-sm">{mockData.executionTime}</p>
            </Card>
            <Card className="bg-slate-800/30 border-slate-700 p-3 lg:p-4 text-center">
              <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-green-400 mx-auto mb-2" />
              <p className="text-xs text-slate-400 mb-1">You Save</p>
              <p className="text-green-400 font-semibold text-sm lg:text-base">{mockData.savings}</p>
            </Card>
          </div>

          {/* Detailed Breakdown */}
          <div className="space-y-4">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center justify-between w-full text-left hover:bg-slate-800/30 p-2 rounded-lg transition-colors"
            >
              <h3 className="text-lg lg:text-xl font-semibold text-white">Fee Breakdown</h3>
              {showDetails ? (
                <ChevronUp className="w-5 h-5 text-slate-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400" />
              )}
            </button>

            {showDetails && (
              <Card className="bg-slate-800/30 border-slate-700 p-4 lg:p-6">
                <div className="space-y-3 lg:space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm lg:text-base">Network Fee</span>
                    <span className="text-white text-sm lg:text-base">{mockData.fees.gas}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm lg:text-base">Protocol Fee</span>
                    <span className="text-white text-sm lg:text-base">{mockData.fees.protocol}</span>
                  </div>
                  <Separator className="bg-slate-700" />
                  <div className="flex justify-between items-center font-semibold">
                    <span className="text-white text-sm lg:text-base">Total Fees</span>
                    <span className="text-white text-sm lg:text-base">{mockData.fees.total}</span>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isConfirming}
              className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={isConfirming}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
            >
              {isConfirming ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Confirming...
                </>
              ) : (
                "Confirm Swap"
              )}
            </Button>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 lg:p-6">
            <div className="flex items-start space-x-3">
              <Info className="w-4 h-4 lg:w-5 lg:h-5 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-amber-400 text-xs lg:text-sm leading-relaxed">
                  Prices are estimates and may change. You will only pay what you approve in your wallet. By confirming,
                  you agree to our terms of service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
