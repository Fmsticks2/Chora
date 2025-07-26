"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Play, Eye, Zap, Settings } from "lucide-react"
import TransactionPreviewModal from "./transaction-preview-modal"

interface PreviewDemoProps {
  onBack: () => void
}

export default function PreviewDemo({ onBack }: PreviewDemoProps) {
  const [showPreview, setShowPreview] = useState(false)
  const [selectedIntent, setSelectedIntent] = useState("")

  const demoIntents = [
    {
      id: "1",
      intent: "Swap 0.5 WETH for DAI on XLayer",
      description: "Cross-chain swap with bridge routing",
      complexity: "Medium",
      estimatedTime: "2-3 minutes",
      estimatedSavings: "+2.3%",
    },
    {
      id: "2",
      intent: "Get the best price for 100 MATIC to USDC",
      description: "Multi-DEX aggregation for optimal pricing",
      complexity: "Simple",
      estimatedTime: "30 seconds",
      estimatedSavings: "+1.8%",
    },
    {
      id: "3",
      intent: "Convert 1 ETH to USDT with lowest fees",
      description: "Fee-optimized routing across multiple protocols",
      complexity: "Advanced",
      estimatedTime: "1-2 minutes",
      estimatedSavings: "+3.1%",
    },
    {
      id: "4",
      intent: "Swap 50 USDC for maximum BTC possible",
      description: "Maximum output optimization with slippage protection",
      complexity: "Medium",
      estimatedTime: "45 seconds",
      estimatedSavings: "+2.7%",
    },
  ]

  const handlePreviewIntent = (intent: string) => {
    setSelectedIntent(intent)
    setShowPreview(true)
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Simple":
        return "bg-green-500/10 text-green-400 border-green-500/30"
      case "Medium":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
      case "Advanced":
        return "bg-red-500/10 text-red-400 border-red-500/30"
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/30"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/3 to-cyan-500/3 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="border-b border-slate-800/50 backdrop-blur-xl bg-slate-950/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-white">Transaction Preview Demo</h1>
                <p className="text-slate-400 text-sm">Experience the preview modal with different swap scenarios</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30 px-3 py-1">
                <Eye className="w-3 h-3 mr-1" />
                Demo Mode
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6">
            <Zap className="w-4 h-4 mr-2" />
            Interactive Preview Demo
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">Experience the</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Transaction Preview
            </span>
          </h1>

          <p className="text-lg lg:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Click on any swap scenario below to see how our AI processes your intent and presents the optimal route with
            detailed breakdown.
          </p>
        </div>

        {/* Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800/50 p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Eye className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Visual Route Planning</h3>
            <p className="text-slate-400 text-sm">See exactly how your swap will be executed across chains and DEXs</p>
          </Card>

          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800/50 p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Settings className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Detailed Breakdown</h3>
            <p className="text-slate-400 text-sm">Complete fee analysis, price impact, and savings calculations</p>
          </Card>

          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800/50 p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Real-time Updates</h3>
            <p className="text-slate-400 text-sm">Live price updates and route optimization before confirmation</p>
          </Card>
        </div>

        {/* Demo Scenarios */}
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">Try Different Swap Scenarios</h2>
            <p className="text-slate-400 text-sm lg:text-base">
              Each scenario demonstrates different aspects of our transaction preview system
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {demoIntents.map((demo) => (
              <Card
                key={demo.id}
                className="bg-slate-900/50 backdrop-blur-sm border-slate-800/50 p-6 lg:p-8 hover:bg-slate-900/70 transition-all duration-300 hover:scale-[1.02] group cursor-pointer"
                onClick={() => handlePreviewIntent(demo.intent)}
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg lg:text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {demo.intent}
                      </h3>
                      <p className="text-slate-400 text-sm lg:text-base">{demo.description}</p>
                    </div>
                    <Button
                      size="icon"
                      className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 group-hover:scale-110 transition-all duration-200"
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Metrics */}
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge className={getComplexityColor(demo.complexity)}>{demo.complexity}</Badge>
                    <div className="text-slate-400 text-sm">
                      <span className="text-slate-300">Time:</span> {demo.estimatedTime}
                    </div>
                    <div className="text-slate-400 text-sm">
                      <span className="text-green-400">Savings:</span> {demo.estimatedSavings}
                    </div>
                  </div>

                  {/* Preview Button */}
                  <div className="pt-2">
                    <Button
                      variant="ghost"
                      className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 p-0 h-auto font-medium group-hover:translate-x-1 transition-transform duration-200"
                    >
                      Preview Transaction →
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 p-6 lg:p-8 mt-12">
          <div className="text-center">
            <h3 className="text-lg lg:text-xl font-semibold text-white mb-3">How to Use the Preview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm lg:text-base text-slate-300">
              <div>
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2 text-blue-400 font-bold">
                  1
                </div>
                <p>Click on any swap scenario above to open the transaction preview modal</p>
              </div>
              <div>
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2 text-blue-400 font-bold">
                  2
                </div>
                <p>Review the route visualization, fees, and savings calculations</p>
              </div>
              <div>
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2 text-blue-400 font-bold">
                  3
                </div>
                <p>Expand the fee breakdown for detailed cost analysis</p>
              </div>
            </div>
          </div>
        </Card>
      </main>

      {/* Transaction Preview Modal */}
      <TransactionPreviewModal isOpen={showPreview} onClose={() => setShowPreview(false)} intent={selectedIntent} />
    </div>
  )
}
