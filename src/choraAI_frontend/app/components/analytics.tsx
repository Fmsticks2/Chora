"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, TrendingUp, DollarSign, PieChart, Download, RefreshCw, Filter } from "lucide-react"

interface AnalyticsProps {
  onBack: () => void
}

export default function Analytics({ onBack }: AnalyticsProps) {
  const [timeframe, setTimeframe] = useState("7d")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsRefreshing(false)
  }

  const stats = {
    totalVolume: "$12,847.32",
    totalSavings: "$247.85",
    avgSavings: "1.93%",
    totalSwaps: 24,
    successRate: "95.8%",
    avgExecutionTime: "1.2m",
  }

  const chartData = [
    { date: "Jan 1", volume: 1200, savings: 24 },
    { date: "Jan 2", volume: 1800, savings: 36 },
    { date: "Jan 3", volume: 1400, savings: 28 },
    { date: "Jan 4", volume: 2200, savings: 44 },
    { date: "Jan 5", volume: 1900, savings: 38 },
    { date: "Jan 6", volume: 2400, savings: 48 },
    { date: "Jan 7", volume: 2100, savings: 42 },
  ]

  const topTokens = [
    { symbol: "ETH", volume: "$4,250", percentage: "33.1%", change: "+12.5%" },
    { symbol: "USDC", volume: "$3,180", percentage: "24.8%", change: "+8.2%" },
    { symbol: "WETH", volume: "$2,420", percentage: "18.8%", change: "+15.3%" },
    { symbol: "DAI", volume: "$1,890", percentage: "14.7%", change: "+5.7%" },
    { symbol: "MATIC", volume: "$1,107", percentage: "8.6%", change: "-2.1%" },
  ]

  const topChains = [
    { name: "Ethereum", volume: "$5,420", percentage: "42.2%", color: "bg-blue-500" },
    { name: "XLayer", volume: "$3,240", percentage: "25.2%", color: "bg-purple-500" },
    { name: "Polygon", volume: "$2,180", percentage: "17.0%", color: "bg-indigo-500" },
    { name: "Arbitrum", volume: "$1,520", percentage: "11.8%", color: "bg-cyan-500" },
    { name: "BSC", volume: "$487", percentage: "3.8%", color: "bg-yellow-500" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
                <h1 className="text-xl lg:text-2xl font-bold text-white">Analytics Dashboard</h1>
                <p className="text-slate-400 text-sm">Track your trading performance and insights</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-slate-800/50 rounded-lg p-1">
                {["24h", "7d", "30d", "90d"].map((period) => (
                  <button
                    key={period}
                    onClick={() => setTimeframe(period)}
                    className={`px-3 py-1 text-sm rounded-md transition-all duration-200 ${
                      timeframe === period
                        ? "bg-blue-600 text-white"
                        : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="text-slate-400 hover:text-white hover:bg-slate-800/50"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-slate-600 text-slate-300 bg-transparent hover:bg-slate-800/50"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-6 mb-8 lg:mb-12">
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800 p-4 lg:p-6 col-span-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5 lg:w-6 lg:h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl lg:text-3xl font-bold text-white">{stats.totalVolume}</p>
                <p className="text-slate-400 text-sm">Total Volume</p>
              </div>
            </div>
          </Card>

          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800 p-4 lg:p-6">
            <div className="text-center">
              <p className="text-xl lg:text-2xl font-bold text-green-400">{stats.totalSavings}</p>
              <p className="text-slate-400 text-sm">Total Savings</p>
            </div>
          </Card>

          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800 p-4 lg:p-6">
            <div className="text-center">
              <p className="text-xl lg:text-2xl font-bold text-cyan-400">{stats.avgSavings}</p>
              <p className="text-slate-400 text-sm">Avg Savings</p>
            </div>
          </Card>

          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800 p-4 lg:p-6">
            <div className="text-center">
              <p className="text-xl lg:text-2xl font-bold text-white">{stats.totalSwaps}</p>
              <p className="text-slate-400 text-sm">Total Swaps</p>
            </div>
          </Card>

          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800 p-4 lg:p-6">
            <div className="text-center">
              <p className="text-xl lg:text-2xl font-bold text-green-400">{stats.successRate}</p>
              <p className="text-slate-400 text-sm">Success Rate</p>
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-12">
          {/* Volume Chart */}
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800 p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg lg:text-xl font-semibold text-white">Trading Volume</h3>
              <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                <TrendingUp className="w-3 h-3 mr-1" />
                +15.3%
              </Badge>
            </div>
            <div className="h-64 flex items-end justify-between space-x-2">
              {chartData.map((data, index) => (
                <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                  <div
                    className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-lg transition-all duration-300 hover:opacity-80"
                    style={{ height: `${(data.volume / 2400) * 200}px` }}
                  ></div>
                  <span className="text-xs text-slate-400 rotate-45 origin-left">{data.date}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Savings Chart */}
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800 p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg lg:text-xl font-semibold text-white">Savings Over Time</h3>
              <Badge className="bg-green-500/10 text-green-400 border-green-500/30">
                <TrendingUp className="w-3 h-3 mr-1" />
                +8.7%
              </Badge>
            </div>
            <div className="h-64 flex items-end justify-between space-x-2">
              {chartData.map((data, index) => (
                <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                  <div
                    className="w-full bg-gradient-to-t from-green-600 to-emerald-400 rounded-t-lg transition-all duration-300 hover:opacity-80"
                    style={{ height: `${(data.savings / 48) * 200}px` }}
                  ></div>
                  <span className="text-xs text-slate-400 rotate-45 origin-left">{data.date}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Top Tokens & Chains */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Top Tokens */}
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800 p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg lg:text-xl font-semibold text-white">Top Tokens</h3>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
            <div className="space-y-4">
              {topTokens.map((token, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-sm font-bold text-white">
                      {token.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-white font-medium">{token.symbol}</p>
                      <p className="text-slate-400 text-sm">{token.percentage}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">{token.volume}</p>
                    <p className={`text-sm ${token.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                      {token.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Chains */}
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800 p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg lg:text-xl font-semibold text-white">Top Chains</h3>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <PieChart className="w-4 h-4 mr-2" />
                View Chart
              </Button>
            </div>
            <div className="space-y-4">
              {topChains.map((chain, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${chain.color}`}></div>
                      <span className="text-white font-medium">{chain.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-white font-medium">{chain.volume}</span>
                      <span className="text-slate-400 text-sm ml-2">({chain.percentage})</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className={`h-2 rounded-full ${chain.color}`} style={{ width: chain.percentage }}></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
