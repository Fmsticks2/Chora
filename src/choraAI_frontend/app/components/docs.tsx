"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Search,
  Book,
  Code,
  Zap,
  Shield,
  Globe,
  ExternalLink,
  Copy,
  Check,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
} from "lucide-react"

interface DocsProps {
  onBack: () => void
}

export default function Docs({ onBack }: DocsProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeSection, setActiveSection] = useState("getting-started")
  const [activeSubSection, setActiveSubSection] = useState("")
  const [copiedCode, setCopiedCode] = useState("")

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(""), 2000)
  }

  const sections = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: <Zap className="w-4 h-4" />,
      items: [
        { id: "quick-start", title: "Quick Start Guide" },
        { id: "wallet-connection", title: "Connecting Your Wallet" },
        { id: "first-swap", title: "Your First Swap" },
        { id: "understanding-intents", title: "Understanding Intents" }
      ],
    },
    {
      id: "features",
      title: "Features",
      icon: <Book className="w-4 h-4" />,
      items: [
        { id: "nlp", title: "Natural Language Processing" },
        { id: "cross-chain", title: "Cross-Chain Swaps" },
        { id: "mev-protection", title: "MEV Protection" },
        { id: "route-optimization", title: "Route Optimization" }
      ],
    },
    {
      id: "api",
      title: "API Reference",
      icon: <Code className="w-4 h-4" />,
      items: [
        { id: "rest-api", title: "REST API" },
        { id: "websocket-api", title: "WebSocket API" },
        { id: "sdk-integration", title: "SDK Integration" },
        { id: "rate-limits", title: "Rate Limits" }
      ],
    },
    {
      id: "security",
      title: "Security",
      icon: <Shield className="w-4 h-4" />,
      items: [
        { id: "smart-contract-audits", title: "Smart Contract Audits" },
        { id: "security-practices", title: "Security Best Practices" },
        { id: "bug-bounty", title: "Bug Bounty Program" },
        { id: "incident-response", title: "Incident Response" }
      ],
    },
    {
      id: "chains",
      title: "Supported Chains",
      icon: <Globe className="w-4 h-4" />,
      items: [
        { id: "ethereum", title: "Ethereum" },
        { id: "polygon", title: "Polygon" },
        { id: "arbitrum", title: "Arbitrum" },
        { id: "xlayer", title: "XLayer" }
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="text-center">
          <Button onClick={onBack} className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-4xl font-bold text-white mb-4">Documentation</h1>
          <p className="text-slate-400 text-lg">Learn how to use IntentSwap AI</p>
        </div>
      </div>
    </div>
  );
}