"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Download,
  RefreshCw,
  TrendingUp,
  DollarSign,
  Activity,
  Calendar,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

interface ActivityHistoryProps {
  onBack: () => void
}

export default function ActivityHistory({ onBack }: ActivityHistoryProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [showAllTransactions, setShowAllTransactions] = useState(false)
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")

  const mockTransactions = [
    {
      id: "1",
      intent: "Swap 1 ETH for USDC with best price",
      status: "completed",
      fromToken: { symbol: "ETH", amount: "1.0", logo: "/placeholder.svg?height=32&width=32" },
      toToken: { symbol: "USDC", amount: "1,847.32", logo: "/placeholder.svg?height=32&width=32" },
      timestamp: "2 hours ago",
      txHash: "0x1234567890abcdef1234567890abcdef12345678",
      network: "Ethereum",
      savings: "+2.3%",
      savingsUsd: "+$42.50",
      gasUsed: "$12.45",
      blockNumber: 18500123,
    },
    {
      id: "2",
      intent: "Convert 500 MATIC to DAI on XLayer",
      status: "pending",
      fromToken: { symbol: "MATIC", amount: "500", logo: "/placeholder.svg?height=32&width=32" },
      toToken: { symbol: "DAI", amount: "387.45", logo: "/placeholder.svg?height=32&width=32" },
      timestamp: "5 minutes ago",
      txHash: "0xabcdef1234567890abcdef1234567890abcdef12",
      network: "XLayer",
      savings: null,
      savingsUsd: null,
      gasUsed: "$2.15",
      blockNumber: null,
    },
    {
      id: "3",
      intent: "Get maximum BTC for 2000 USDT",
      status: "failed",
      fromToken: { symbol: "USDT", amount: "2000", logo: "/placeholder.svg?height=32&width=32" },
      toToken: { symbol: "BTC", amount: "0.0456", logo: "/placeholder.svg?height=32&width=32" },
      timestamp: "1 day ago",
      txHash: "0x9876543210fedcba9876543210fedcba98765432",
      network: "Polygon",
      savings: null,
      savingsUsd: null,
      error: "Insufficient liquidity",
      gasUsed: "$8.20",
      blockNumber: 48500789,
    },
    {
      id: "4",
      intent: "Swap 0.5 WETH for DAI cheapest route",
      status: "completed",
      fromToken: { symbol: "WETH", amount: "0.5", logo: "/placeholder.svg?height=32&width=32" },
      toToken: { symbol: "DAI", amount: "923.15", logo: "/placeholder.svg?height=32&width=32" },
      timestamp: "2 days ago",
      txHash: "0xdef0123456789abcdef0123456789abcdef012345",
      network: "XLayer",
      savings: "+1.8%",
      savingsUsd: "+$16.65",
      gasUsed: "$3.80",
      blockNumber: 196001234,
    },
    {
      id: "5",
      intent: "Convert 100 USDC to ETH fast execution",
      status: "completed",
      fromToken: { symbol: "USDC", amount: "100", logo: "/placeholder.svg?height=32&width=32" },
      toToken: { symbol: "ETH", amount: "0.0541", logo: "/placeholder.svg?height=32&width=32" },
      timestamp: "3 days ago",
      txHash: "0x56789abcdef0123456789abcdef0123456789abcd",
      network: "Ethereum",
      savings: "+0.9%",
      savingsUsd: "+$0.90",
      gasUsed: "$15.30",
      blockNumber: 18499876,
    },
    // Additional transactions for "Load More" functionality
    {
      id: "6",
      intent: "Swap 2 BNB for BUSD on BSC",
      status: "completed",
      fromToken: { symbol: "BNB", amount: "2.0", logo: "/placeholder.svg?height=32&width=32" },
      toToken: { symbol: "BUSD", amount: "642.18", logo: "/placeholder.svg?height=32&width=32" },
      timestamp: "4 days ago",
      txHash: "0xfedcba9876543210fedcba9876543210fedcba98",
      network: "BSC",
      savings: "+1.2%",
      savingsUsd: "+$7.70",
      gasUsed: "$0.85",
      blockNumber: 32100456,
    },
    {
      id: "7",
      intent: "Convert 1000 USDC to AVAX on Avalanche",
      status: "completed",
      fromToken: { symbol: "USDC", amount: "1000", logo: "/placeholder.svg?height=32&width=32" },
      toToken: { symbol: "AVAX", amount: "28.57", logo: "/placeholder.svg?height=32&width=32" },
      timestamp: "5 days ago",
      txHash: "0x123abc456def789012abc456def789012abc456d",
      network: "Avalanche",
      savings: "+2.1%",
      savingsUsd: "+$21.00",
      gasUsed: "$1.20",
      blockNumber: 35200789,
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-400" />
      case "failed":
        return <XCircle className="w-5 h-5 text-red-400" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500/10 text-green-400 border-green-500/30">Completed</Badge>
      case "pending":
        return <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/30">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-500/10 text-red-400 border-red-500/30">Failed</Badge>
      default:
        return null
    }
  }

  const getExplorerUrl = (network: string, txHash: string) => {
    const explorers = {
      Ethereum: "https://etherscan.io/tx/",
      Polygon: "https://polygonscan.com/tx/",
      XLayer: "https://www.oklink.com/xlayer/tx/",
      BSC: "https://bscscan.com/tx/",
      Avalanche: "https://snowtrace.io/tx/",
    }
    return explorers[network as keyof typeof explorers] + txHash
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsRefreshing(false)
  }

  const handleExport = () => {
    const csvContent = mockTransactions
      .map(
        (tx) =>
          `${tx.timestamp},${tx.fromToken.symbol},${tx.fromToken.amount},${tx.toToken.symbol},${tx.toToken.amount},${tx.status},${tx.network},${tx.txHash}`,
      )
      .join("\n")

    const blob = new Blob(
      [`Timestamp,From Token,From Amount,To Token,To Amount,Status,Network,Transaction Hash\n${csvContent}`],
      { type: "text/csv" },
    )
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "intentswap-transactions.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const openTransaction = (network: string, txHash: string) => {
    const url = getExplorerUrl(network, txHash)
    window.open(url, "_blank")
  }

  const filteredTransactions = mockTransactions.filter((tx) => {
    const matchesSearch =
      tx.intent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.fromToken.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.toToken.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.network.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter = selectedFilter === "all" || tx.status === selectedFilter

    return matchesSearch && matchesFilter
  })

  const displayedTransactions = showAllTransactions ? filteredTransactions : filteredTransactions.slice(0, 5)

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("desc")
    }
  }

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
                <h1 className="text-xl lg:text-2xl font-bold text-white">Transaction History</h1>
                <p className="text-slate-400 text-sm">Track your swaps and performance</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
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
                onClick={handleExport}
                className="border-slate-600 text-slate-300 bg-transparent hover:bg-slate-800/50"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-12">
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800 p-4 lg:p-6 hover:bg-slate-900/70 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 lg:w-6 lg:h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-xl lg:text-2xl font-bold text-white">{mockTransactions.length}</p>
                <p className="text-slate-400 text-xs lg:text-sm">Total Swaps</p>
              </div>
            </div>
          </Card>

          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800 p-4 lg:p-6 hover:bg-slate-900/70 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5 lg:w-6 lg:h-6 text-green-400" />
              </div>
              <div>
                <p className="text-xl lg:text-2xl font-bold text-green-400">$12,847</p>
                <p className="text-slate-400 text-xs lg:text-sm">Total Volume</p>
              </div>
            </div>
          </Card>

          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800 p-4 lg:p-6 hover:bg-slate-900/70 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-cyan-400" />
              </div>
              <div>
                <p className="text-xl lg:text-2xl font-bold text-cyan-400">+$247</p>
                <p className="text-slate-400 text-xs lg:text-sm">Total Savings</p>
              </div>
            </div>
          </Card>

          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800 p-4 lg:p-6 hover:bg-slate-900/70 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 lg:w-6 lg:h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-xl lg:text-2xl font-bold text-white">1.8%</p>
                <p className="text-slate-400 text-xs lg:text-sm">Avg. Savings</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-500 pl-10 py-3 rounded-xl focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          <div className="flex space-x-3">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="bg-slate-800/50 border border-slate-700 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>

            <Button
              variant="outline"
              className="border-slate-600 text-slate-300 bg-transparent hover:bg-slate-800/50 px-4 py-3"
              onClick={() => handleSort("timestamp")}
            >
              <Filter className="w-4 h-4 mr-2" />
              Sort by Date
              {sortBy === "timestamp" &&
                (sortOrder === "desc" ? (
                  <ChevronDown className="w-4 h-4 ml-1" />
                ) : (
                  <ChevronUp className="w-4 h-4 ml-1" />
                ))}
            </Button>
          </div>
        </div>

        {/* Transaction List */}
        <div className="space-y-4 lg:space-y-6">
          {displayedTransactions.map((tx) => (
            <Card
              key={tx.id}
              className="bg-slate-900/50 backdrop-blur-sm border-slate-800 p-4 lg:p-6 hover:bg-slate-900/70 transition-all duration-300 hover:scale-[1.01]"
            >
              <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
                {/* Left Section */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">{getStatusIcon(tx.status)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium mb-2 text-sm lg:text-base">{tx.intent}</p>
                    <div className="flex flex-wrap items-center gap-2 lg:gap-4 text-xs lg:text-sm text-slate-400">
                      <span>{tx.timestamp}</span>
                      <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
                        {tx.network}
                      </Badge>
                      <span>Gas: {tx.gasUsed}</span>
                      {tx.blockNumber && <span>Block: {tx.blockNumber.toLocaleString()}</span>}
                    </div>
                    {tx.error && (
                      <p className="text-red-400 text-xs lg:text-sm mt-2 bg-red-500/10 px-2 py-1 rounded">{tx.error}</p>
                    )}
                  </div>
                </div>

                {/* Middle Section - Swap Details */}
                <div className="flex items-center justify-center space-x-4 lg:space-x-6">
                  <div className="text-center lg:text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      <img
                        src={tx.fromToken.logo || "/placeholder.svg"}
                        alt={tx.fromToken.symbol}
                        className="w-6 h-6 rounded-full"
                        onError={(e) => {
                          e.currentTarget.src = `/placeholder.svg?height=24&width=24&query=${tx.fromToken.symbol}+logo`
                        }}
                      />
                      <div>
                        <p className="text-white font-medium text-sm lg:text-base">
                          {tx.fromToken.amount} {tx.fromToken.symbol}
                        </p>
                        <p className="text-slate-400 text-xs">From</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-slate-500 text-lg lg:text-xl">→</div>

                  <div className="text-center lg:text-left">
                    <div className="flex items-center space-x-2 mb-1">
                      <img
                        src={tx.toToken.logo || "/placeholder.svg"}
                        alt={tx.toToken.symbol}
                        className="w-6 h-6 rounded-full"
                        onError={(e) => {
                          e.currentTarget.src = `/placeholder.svg?height=24&width=24&query=${tx.toToken.symbol}+logo`
                        }}
                      />
                      <div>
                        <p className="text-white font-medium text-sm lg:text-base">
                          {tx.toToken.amount} {tx.toToken.symbol}
                        </p>
                        <p className="text-slate-400 text-xs">To</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center justify-between lg:justify-end space-x-4">
                  {tx.savings && (
                    <div className="text-center lg:text-right">
                      <p className="text-green-400 font-medium text-sm lg:text-base">{tx.savings}</p>
                      <p className="text-green-400 text-xs">{tx.savingsUsd}</p>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    {getStatusBadge(tx.status)}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-200"
                      onClick={() => openTransaction(tx.network, tx.txHash)}
                      title={`View on ${tx.network} explorer`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More / Show Less */}
        {filteredTransactions.length === 0 ? (
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800 p-8 lg:p-12 text-center">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-slate-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 lg:w-10 lg:h-10 text-slate-400" />
            </div>
            <h3 className="text-lg lg:text-xl font-semibold text-white mb-2">No transactions found</h3>
            <p className="text-slate-400 text-sm lg:text-base">Try adjusting your search or filter criteria</p>
          </Card>
        ) : (
          <div className="text-center mt-8 lg:mt-12">
            {filteredTransactions.length > 5 && (
              <Button
                variant="outline"
                className="border-slate-600 text-slate-300 bg-transparent hover:bg-slate-800/50 px-6 py-3"
                onClick={() => setShowAllTransactions(!showAllTransactions)}
              >
                {showAllTransactions ? (
                  <>
                    Show Less Transactions
                    <ChevronUp className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    Load More Transactions ({filteredTransactions.length - 5} more)
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
