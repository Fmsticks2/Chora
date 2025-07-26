"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock, Info, AlertTriangle } from "lucide-react"

export default function StyleGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800/50 backdrop-blur-sm bg-slate-950/80 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <h1 className="text-xl font-bold text-white">IntentSwap AI - Style Guide</h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-12">
          {/* Color Palette */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Color Palette</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Primary Colors */}
              <Card className="bg-slate-900/50 border-slate-800 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Primary</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded"></div>
                    <div>
                      <p className="text-white text-sm font-medium">Blue 600</p>
                      <p className="text-slate-400 text-xs">#2563eb</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded"></div>
                    <div>
                      <p className="text-white text-sm font-medium">Blue 500</p>
                      <p className="text-slate-400 text-xs">#3b82f6</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-cyan-400 rounded"></div>
                    <div>
                      <p className="text-white text-sm font-medium">Cyan 400</p>
                      <p className="text-slate-400 text-xs">#22d3ee</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Status Colors */}
              <Card className="bg-slate-900/50 border-slate-800 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-400 rounded"></div>
                    <div>
                      <p className="text-white text-sm font-medium">Success</p>
                      <p className="text-slate-400 text-xs">#4ade80</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-400 rounded"></div>
                    <div>
                      <p className="text-white text-sm font-medium">Warning</p>
                      <p className="text-slate-400 text-xs">#facc15</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-400 rounded"></div>
                    <div>
                      <p className="text-white text-sm font-medium">Error</p>
                      <p className="text-slate-400 text-xs">#f87171</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Neutral Colors */}
              <Card className="bg-slate-900/50 border-slate-800 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Neutral</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-slate-950 rounded border border-slate-700"></div>
                    <div>
                      <p className="text-white text-sm font-medium">Slate 950</p>
                      <p className="text-slate-400 text-xs">#020617</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-slate-900 rounded"></div>
                    <div>
                      <p className="text-white text-sm font-medium">Slate 900</p>
                      <p className="text-slate-400 text-xs">#0f172a</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-slate-800 rounded"></div>
                    <div>
                      <p className="text-white text-sm font-medium">Slate 800</p>
                      <p className="text-slate-400 text-xs">#1e293b</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Typography */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Typography</h2>
            <Card className="bg-slate-900/50 border-slate-800 p-6">
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">Heading 1 - Bold 36px</h1>
                  <p className="text-slate-400 text-sm">Used for main page titles and hero sections</p>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Heading 2 - Bold 24px</h2>
                  <p className="text-slate-400 text-sm">Used for section titles and major headings</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Heading 3 - Semibold 18px</h3>
                  <p className="text-slate-400 text-sm">Used for subsection titles and card headers</p>
                </div>
                <div>
                  <p className="text-white mb-2">Body Text - Regular 16px</p>
                  <p className="text-slate-400 text-sm">Used for main content and descriptions</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-2">Small Text - Regular 14px</p>
                  <p className="text-slate-400 text-sm">Used for secondary information and labels</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs mb-2">Caption - Regular 12px</p>
                  <p className="text-slate-400 text-sm">Used for timestamps and minor details</p>
                </div>
              </div>
            </Card>
          </section>

          {/* Buttons */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Buttons</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-900/50 border-slate-800 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Primary Buttons</h3>
                <div className="space-y-4">
                  <Button className="bg-blue-600 hover:bg-blue-700">Primary Button</Button>
                  <Button className="bg-blue-600 hover:bg-blue-700" disabled>
                    Disabled Primary
                  </Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Small Primary
                  </Button>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Large Primary
                  </Button>
                </div>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Secondary Buttons</h3>
                <div className="space-y-4">
                  <Button variant="outline" className="border-slate-600 text-slate-300 bg-transparent">
                    Secondary Button
                  </Button>
                  <Button variant="outline" className="border-slate-600 text-slate-300 bg-transparent" disabled>
                    Disabled Secondary
                  </Button>
                  <Button variant="ghost" className="text-slate-300 hover:bg-slate-800">
                    Ghost Button
                  </Button>
                  <Button variant="destructive">Destructive Button</Button>
                </div>
              </Card>
            </div>
          </section>

          {/* Form Elements */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Form Elements</h2>
            <Card className="bg-slate-900/50 border-slate-800 p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Default Input</label>
                  <Input
                    placeholder="Enter your intent..."
                    className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Large Input</label>
                  <Input
                    placeholder="Swap 0.5 WETH for DAI on XLayer"
                    className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-500 text-lg py-4"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Disabled Input</label>
                  <Input
                    placeholder="Disabled input"
                    disabled
                    className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-500"
                  />
                </div>
              </div>
            </Card>
          </section>

          {/* Badges */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Badges</h2>
            <Card className="bg-slate-900/50 border-slate-800 p-6">
              <div className="flex flex-wrap gap-4">
                <Badge className="bg-green-500/10 text-green-400 border-green-500/30">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Completed
                </Badge>
                <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/30">
                  <Clock className="w-3 h-3 mr-1" />
                  Pending
                </Badge>
                <Badge className="bg-red-500/10 text-red-400 border-red-500/30">
                  <XCircle className="w-3 h-3 mr-1" />
                  Failed
                </Badge>
                <Badge variant="outline" className="border-slate-600 text-slate-300">
                  Ethereum
                </Badge>
                <Badge variant="outline" className="border-blue-500/30 bg-blue-500/10 text-blue-400">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                  Connected
                </Badge>
              </div>
            </Card>
          </section>

          {/* Cards */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-900/50 border-slate-800 p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Default Card</h3>
                <p className="text-slate-400">This is a standard card with default styling.</p>
              </Card>
              <Card className="bg-slate-800/30 border-slate-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Subtle Card</h3>
                <p className="text-slate-400">This card has more subtle background and border.</p>
              </Card>
            </div>
          </section>

          {/* Alerts */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Alerts & Notifications</h2>
            <div className="space-y-4">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-blue-400 font-medium text-sm mb-1">Information</p>
                    <p className="text-blue-300 text-sm">This is an informational message.</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-amber-400 font-medium text-sm mb-1">Warning</p>
                    <p className="text-amber-300 text-sm">Connect your wallet to start swapping.</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-green-400 font-medium text-sm mb-1">Success</p>
                    <p className="text-green-300 text-sm">Transaction completed successfully!</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-red-400 font-medium text-sm mb-1">Error</p>
                    <p className="text-red-300 text-sm">Transaction failed due to insufficient funds.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mobile Responsive Example */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Mobile Responsive Design</h2>
            <Card className="bg-slate-900/50 border-slate-800 p-6">
              <div className="bg-slate-800 rounded-lg p-4 max-w-sm mx-auto">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-semibold">IntentSwap AI</h3>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Connect
                    </Button>
                  </div>
                  <Input
                    placeholder="Swap 0.5 WETH for DAI..."
                    className="bg-slate-700 border-slate-600 text-white text-sm"
                  />
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Find Best Route</Button>
                </div>
              </div>
              <p className="text-slate-400 text-sm text-center mt-4">
                Mobile interface maintains core functionality with optimized spacing and touch targets.
              </p>
            </Card>
          </section>
        </div>
      </main>
    </div>
  )
}
