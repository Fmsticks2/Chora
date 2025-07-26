"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Wallet,
  Settings,
  Send,
  ArrowRight,
  CheckCircle,
  Clock,
  TrendingUp,
  Shield,
  Zap,
  Menu,
  X,
  Star,
  ChevronRight,
  Globe,
  Layers,
} from "lucide-react"
import TransactionPreviewModal from "./components/transaction-preview-modal"
import ActivityHistory from "./components/activity-history"
import PreviewDemo from "./components/preview-demo"
import Analytics from "./components/analytics"
import Docs from "./components/docs"
import SettingsModal from "./components/settings-modal"
import WalletConnectModal from "./components/wallet-connect-modal"

export default function ChoraAI() {
  const [activeTab, setActiveTab] = useState("swap")
  const [intent, setIntent] = useState("")
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [walletType, setWalletType] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Check for existing wallet connection on mount
  useEffect(() => {
    checkWalletConnection()
  }, [])

  const checkWalletConnection = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" })
        if (accounts.length > 0) {
          setWalletAddress(accounts[0])
          setIsWalletConnected(true)
          setWalletType("MetaMask")
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error)
      }
    }
  }

  const handleSubmitIntent = async () => {
    if (intent.trim() && isWalletConnected) {
      setIsLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsLoading(false)
      setShowPreview(true)
    }
  }

  const connectWallet = () => {
    setShowWalletModal(true)
  }

  const handleWalletConnect = (address: string, type: string) => {
    setWalletAddress(address)
    setWalletType(type)
    setIsWalletConnected(true)
    setShowWalletModal(false)
  }

  const disconnectWallet = () => {
    setIsWalletConnected(false)
    setWalletAddress("")
    setWalletType("")
  }

  const exampleIntents = [
    "Swap 0.5 ICP for ckBTC on Internet Computer",
    "Get the best price for 100 ICP to ckUSDC",
    "Convert 1 ICP to ckETH with lowest fees",
    "Swap 50 ckUSDC for maximum ICP possible",
  ]

  if (activeTab === "history") {
    return <ActivityHistory onBack={() => setActiveTab("swap")} />
  }

  if (activeTab === "preview") {
    return <PreviewDemo onBack={() => setActiveTab("swap")} />
  }

  if (activeTab === "analytics") {
    return <Analytics onBack={() => setActiveTab("swap")} />
  }

  if (activeTab === "docs") {
    return <Docs onBack={() => setActiveTab("swap")} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
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
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Zap className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
              </div>
              <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                choraAI
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <button
                onClick={() => setActiveTab("swap")}
                className={`text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  activeTab === "swap"
                    ? "text-blue-400 border-b-2 border-blue-400 pb-1"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Swap
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  activeTab === "history"
                    ? "text-blue-400 border-b-2 border-blue-400 pb-1"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                History
              </button>
              <button
                onClick={() => setActiveTab("preview")}
                className={`text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  activeTab === "preview"
                    ? "text-blue-400 border-b-2 border-blue-400 pb-1"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Preview
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  activeTab === "analytics"
                    ? "text-blue-400 border-b-2 border-blue-400 pb-1"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Analytics
              </button>
              <button
                onClick={() => setActiveTab("docs")}
                className={`text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  activeTab === "docs"
                    ? "text-blue-400 border-b-2 border-blue-400 pb-1"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Docs
              </button>
            </nav>

            {/* Wallet Connection & Settings */}
            <div className="flex items-center space-x-3 lg:space-x-4">
              {isWalletConnected ? (
                <div className="hidden sm:flex items-center space-x-3">
                  <Badge variant="outline" className="border-green-500/30 bg-green-500/10 text-green-400 px-3 py-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    {walletType}
                  </Badge>
                  <button
                    onClick={disconnectWallet}
                    className="text-sm text-slate-300 hover:text-white transition-colors bg-slate-800/50 px-3 py-2 rounded-lg border border-slate-700 hover:border-slate-600"
                  >
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </button>
                </div>
              ) : (
                <Button
                  onClick={connectWallet}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-105"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  ) : (
                    <Wallet className="w-4 h-4 mr-2" />
                  )}
                  {isLoading ? "Connecting..." : "Connect Wallet"}
                </Button>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-200"
                onClick={() => setShowSettings(true)}
              >
                <Settings className="w-4 h-4" />
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-slate-400 hover:text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-slate-800/50 py-4">
              <nav className="flex flex-col space-y-4">
                <button
                  onClick={() => {
                    setActiveTab("swap")
                    setMobileMenuOpen(false)
                  }}
                  className={`text-left text-sm font-medium transition-colors ${
                    activeTab === "swap" ? "text-blue-400" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Swap
                </button>
                <button
                  onClick={() => {
                    setActiveTab("history")
                    setMobileMenuOpen(false)
                  }}
                  className={`text-left text-sm font-medium transition-colors ${
                    activeTab === "history" ? "text-blue-400" : "text-slate-400 hover:text-white"
                  }`}
                >
                  History
                </button>
                <button
                  onClick={() => {
                    setActiveTab("preview")
                    setMobileMenuOpen(false)
                  }}
                  className={`text-left text-sm font-medium transition-colors ${
                    activeTab === "preview" ? "text-blue-400" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Preview
                </button>
                <button
                  onClick={() => {
                    setActiveTab("analytics")
                    setMobileMenuOpen(false)
                  }}
                  className={`text-left text-sm font-medium transition-colors ${
                    activeTab === "analytics" ? "text-blue-400" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Analytics
                </button>
                <button
                  onClick={() => {
                    setActiveTab("docs")
                    setMobileMenuOpen(false)
                  }}
                  className={`text-left text-sm font-medium transition-colors ${
                    activeTab === "docs" ? "text-blue-400" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Docs
                </button>
                {isWalletConnected && (
                  <div className="pt-2 border-t border-slate-800">
                    <Badge variant="outline" className="border-green-500/30 bg-green-500/10 text-green-400">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                    </Badge>
                  </div>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-20 pb-16 lg:pb-24">
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6 lg:mb-8">
              <Star className="w-4 h-4 mr-2" />
              Trusted by 50,000+ DeFi users
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 lg:mb-8">
              <span className="text-white">Swap with</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Natural Language
              </span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Describe your ICP token swap in plain English. Our AI finds the best route on Internet Computer Protocol,
              <span className="text-slate-300"> saving you time and money.</span>
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-12 lg:mt-16">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-white mb-2">$2.4B+</div>
                <div className="text-sm lg:text-base text-slate-400">Volume Traded</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-white mb-2">50K+</div>
                <div className="text-sm lg:text-base text-slate-400">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-white mb-2">ICP</div>
                <div className="text-sm lg:text-base text-slate-400">Native Protocol</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-white mb-2">99.9%</div>
                <div className="text-sm lg:text-base text-slate-400">Uptime</div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
            <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800/50 p-6 lg:p-8 text-center group hover:bg-slate-900/70 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-6 h-6 lg:w-8 lg:h-8 text-blue-400" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-white mb-3">Non-Custodial</h3>
              <p className="text-slate-400 text-sm lg:text-base leading-relaxed">
                Your funds never leave your wallet. Complete control, zero counterparty risk.
              </p>
            </Card>

            <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800/50 p-6 lg:p-8 text-center group hover:bg-slate-900/70 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/10">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-6 h-6 lg:w-8 lg:h-8 text-green-400" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-white mb-3">Best Prices</h3>
              <p className="text-slate-400 text-sm lg:text-base leading-relaxed">
                AI-optimized routes on Internet Computer. Average 2.3% better than market rates.
              </p>
            </Card>

            <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800/50 p-6 lg:p-8 text-center group hover:bg-slate-900/70 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/10">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-6 h-6 lg:w-8 lg:h-8 text-yellow-400" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-white mb-3">Lightning Fast</h3>
              <p className="text-slate-400 text-sm lg:text-base leading-relaxed">
                Sub-second route calculation. Execute complex swaps in under 30 seconds.
              </p>
            </Card>
          </div>

          {/* Main Intent Input */}
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800/50 p-6 lg:p-10 mb-12 lg:mb-16 shadow-2xl shadow-blue-500/5">
            <div className="space-y-6 lg:space-y-8">
              <div className="text-center">
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">Start Your Swap</h2>
                <p className="text-slate-400 text-sm lg:text-base">Describe what you want to do in natural language</p>
              </div>

              <div>
                <div className="relative">
                  <Input
                    value={intent}
                    onChange={(e) => setIntent(e.target.value)}
                    placeholder="Swap 0.5 ICP for ckBTC on Internet Computer"
                    className="bg-slate-800/50 border-slate-700/50 text-white placeholder-slate-500 text-base lg:text-lg py-4 lg:py-6 pr-14 lg:pr-16 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                    onKeyPress={(e) => e.key === "Enter" && handleSubmitIntent()}
                  />
                  <Button
                    onClick={handleSubmitIntent}
                    disabled={!intent.trim() || !isWalletConnected || isLoading}
                    size="icon"
                    className="absolute right-2 lg:right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-700 disabled:to-slate-700 shadow-lg transition-all duration-200 hover:scale-105 w-10 h-10 lg:w-12 lg:h-12"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <Send className="w-4 h-4 lg:w-5 lg:h-5" />
                    )}
                  </Button>
                </div>
              </div>

              {!isWalletConnected && (
                <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-4 lg:p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Wallet className="w-4 h-4 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-amber-400 font-medium text-sm lg:text-base">
                        Connect your wallet to start swapping
                      </p>
                      <p className="text-amber-300/80 text-xs lg:text-sm mt-1">
                        We support MetaMask, WalletConnect, and 20+ other wallets
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Example Intents */}
              <div>
                <p className="text-sm lg:text-base text-slate-400 mb-4 lg:mb-6 text-center">Try these examples:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                  {exampleIntents.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => setIntent(example)}
                      className="text-left p-4 lg:p-5 bg-slate-800/30 hover:bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50 rounded-xl text-sm lg:text-base text-slate-300 hover:text-white transition-all duration-200 hover:scale-[1.02] group"
                    >
                      <div className="flex items-center justify-between">
                        <span>{example}</span>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Features Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 lg:mb-24">
            <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800/50 p-6 lg:p-8 group hover:bg-slate-900/70 transition-all duration-300">
              <div className="flex items-start space-x-4 lg:space-x-6">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-6 h-6 lg:w-7 lg:h-7 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg lg:text-xl font-semibold text-white mb-3">ICP Token Swaps</h3>
                  <p className="text-slate-400 text-sm lg:text-base leading-relaxed mb-4">
                     Seamlessly swap tokens on Internet Computer Protocol including ICP, ckBTC, ckETH, and ckUSDC.
                   </p>
                  <Button
                    variant="ghost"
                    className="text-purple-400 hover:text-purple-300 p-0 h-auto font-medium"
                    onClick={() => setActiveTab("docs")}
                  >
                    Learn more <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800/50 p-6 lg:p-8 group hover:bg-slate-900/70 transition-all duration-300">
              <div className="flex items-start space-x-4 lg:space-x-6">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Layers className="w-6 h-6 lg:w-7 lg:h-7 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg lg:text-xl font-semibold text-white mb-3">MEV Protection</h3>
                  <p className="text-slate-400 text-sm lg:text-base leading-relaxed mb-4">
                    Advanced MEV protection ensures you get the best price without front-running or sandwich attacks.
                  </p>
                  <Button
                    variant="ghost"
                    className="text-cyan-400 hover:text-cyan-300 p-0 h-auto font-medium"
                    onClick={() => setActiveTab("docs")}
                  >
                    Learn more <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Activity Preview */}
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800/50 p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 lg:mb-8">
              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-white mb-2">Recent Activity</h3>
                <p className="text-slate-400 text-sm lg:text-base">Your latest swaps and their performance</p>
              </div>
              <Button
                variant="ghost"
                onClick={() => setActiveTab("history")}
                className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 mt-4 sm:mt-0 self-start sm:self-auto"
              >
                View All Transactions
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="space-y-4 lg:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 lg:p-6 bg-slate-800/30 rounded-xl hover:bg-slate-800/50 transition-colors duration-200">
                <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm lg:text-base font-medium">Swap 1 ICP for ckUSDC</p>
                    <p className="text-slate-400 text-xs lg:text-sm">2 hours ago • via Internet Computer</p>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-white text-sm lg:text-base font-medium">18.47 ckUSDC</p>
                  <p className="text-green-400 text-xs lg:text-sm">+2.3% vs market</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 lg:p-6 bg-slate-800/30 rounded-xl hover:bg-slate-800/50 transition-colors duration-200">
                <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm lg:text-base font-medium">Convert 50 ICP to ckBTC</p>
                    <p className="text-slate-400 text-xs lg:text-sm">Pending confirmation</p>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-slate-300 text-sm lg:text-base font-medium">~0.0387 ckBTC</p>
                  <p className="text-slate-400 text-xs lg:text-sm">via Internet Computer</p>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </main>

      {/* Modals */}
      <TransactionPreviewModal isOpen={showPreview} onClose={() => setShowPreview(false)} intent={intent} />
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
      <WalletConnectModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onConnect={handleWalletConnect}
      />
    </div>
  )
}
