"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import {
  Settings,
  Palette,
  Bell,
  Shield,
  Zap,
  Globe,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Save,
  RotateCcw,
  AlertTriangle,
} from "lucide-react"

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState("general")
  const [settings, setSettings] = useState({
    theme: "dark",
    notifications: true,
    soundEffects: true,
    autoConnect: false,
    slippageTolerance: 0.5,
    gasPrice: "standard",
    mevProtection: true,
    expertMode: false,
    language: "en",
    currency: "USD",
    emailNotifications: true,
    pushNotifications: true,
    transactionAlerts: true,
    priceAlerts: false,
    weeklyReports: true,
  })

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("intentswap-settings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  // Apply theme changes immediately
  useEffect(() => {
    if (settings.theme === "light") {
      document.documentElement.classList.remove("dark")
      document.documentElement.classList.add("light")
    } else if (settings.theme === "dark") {
      document.documentElement.classList.remove("light")
      document.documentElement.classList.add("dark")
    } else {
      // Auto mode - detect system preference
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      if (mediaQuery.matches) {
        document.documentElement.classList.add("dark")
        document.documentElement.classList.remove("light")
      } else {
        document.documentElement.classList.add("light")
        document.documentElement.classList.remove("dark")
      }
    }
  }, [settings.theme])

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    // Save settings to localStorage or API
    localStorage.setItem("intentswap-settings", JSON.stringify(settings))
    onClose()
  }

  const handleReset = () => {
    setSettings({
      theme: "dark",
      notifications: true,
      soundEffects: true,
      autoConnect: false,
      slippageTolerance: 0.5,
      gasPrice: "standard",
      mevProtection: true,
      expertMode: false,
      language: "en",
      currency: "USD",
      emailNotifications: true,
      pushNotifications: true,
      transactionAlerts: true,
      priceAlerts: false,
      weeklyReports: true,
    })
  }

  const tabs = [
    { id: "general", label: "General", icon: <Settings className="w-4 h-4" /> },
    { id: "appearance", label: "Appearance", icon: <Palette className="w-4 h-4" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" /> },
    { id: "trading", label: "Trading", icon: <Zap className="w-4 h-4" /> },
    { id: "security", label: "Security", icon: <Shield className="w-4 h-4" /> },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl lg:text-2xl font-bold">Settings</DialogTitle>
        </DialogHeader>

        <div className="flex h-[600px]">
          {/* Sidebar */}
          <div className="w-48 border-r border-slate-800 pr-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  {tab.icon}
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 pl-6 overflow-y-auto">
            {activeTab === "general" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">General Settings</h3>
                </div>

                <Card className="bg-slate-800/50 border-slate-700 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Auto-connect wallet</h4>
                      <p className="text-slate-400 text-sm">Automatically connect to your last used wallet</p>
                    </div>
                    <Switch
                      checked={settings.autoConnect}
                      onCheckedChange={(checked) => handleSettingChange("autoConnect", checked)}
                    />
                  </div>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700 p-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-white font-medium">Language</h4>
                      <p className="text-slate-400 text-sm">Choose your preferred language</p>
                    </div>
                    <select
                      value={settings.language}
                      onChange={(e) => handleSettingChange("language", e.target.value)}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                      <option value="zh">中文</option>
                    </select>
                  </div>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700 p-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-white font-medium">Currency</h4>
                      <p className="text-slate-400 text-sm">Display prices in your preferred currency</p>
                    </div>
                    <select
                      value={settings.currency}
                      onChange={(e) => handleSettingChange("currency", e.target.value)}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="JPY">JPY (¥)</option>
                    </select>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === "appearance" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Appearance</h3>
                </div>

                <Card className="bg-slate-800/50 border-slate-700 p-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-white font-medium">Theme</h4>
                      <p className="text-slate-400 text-sm">Choose your preferred theme</p>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: "dark", label: "Dark", icon: <Moon className="w-4 h-4" /> },
                        { id: "light", label: "Light", icon: <Sun className="w-4 h-4" /> },
                        { id: "auto", label: "Auto", icon: <Globe className="w-4 h-4" /> },
                      ].map((theme) => (
                        <button
                          key={theme.id}
                          onClick={() => handleSettingChange("theme", theme.id)}
                          className={`flex flex-col items-center space-y-2 p-3 rounded-lg border transition-all duration-200 ${
                            settings.theme === theme.id
                              ? "border-blue-500 bg-blue-500/10 text-blue-400"
                              : "border-slate-600 text-slate-400 hover:border-slate-500 hover:text-white"
                          }`}
                        >
                          {theme.icon}
                          <span className="text-sm">{theme.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Notifications</h3>
                </div>

                <Card className="bg-slate-800/50 border-slate-700 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Email notifications</h4>
                      <p className="text-slate-400 text-sm">Receive important updates via email</p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                    />
                  </div>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Push notifications</h4>
                      <p className="text-slate-400 text-sm">Receive notifications about your transactions</p>
                    </div>
                    <Switch
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
                    />
                  </div>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Transaction alerts</h4>
                      <p className="text-slate-400 text-sm">Get notified when transactions complete</p>
                    </div>
                    <Switch
                      checked={settings.transactionAlerts}
                      onCheckedChange={(checked) => handleSettingChange("transactionAlerts", checked)}
                    />
                  </div>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Price alerts</h4>
                      <p className="text-slate-400 text-sm">Get alerts when token prices change significantly</p>
                    </div>
                    <Switch
                      checked={settings.priceAlerts}
                      onCheckedChange={(checked) => handleSettingChange("priceAlerts", checked)}
                    />
                  </div>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Weekly reports</h4>
                      <p className="text-slate-400 text-sm">Receive weekly trading performance reports</p>
                    </div>
                    <Switch
                      checked={settings.weeklyReports}
                      onCheckedChange={(checked) => handleSettingChange("weeklyReports", checked)}
                    />
                  </div>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {settings.soundEffects ? (
                        <Volume2 className="w-5 h-5 text-blue-400" />
                      ) : (
                        <VolumeX className="w-5 h-5 text-slate-400" />
                      )}
                      <div>
                        <h4 className="text-white font-medium">Sound effects</h4>
                        <p className="text-slate-400 text-sm">Play sounds for transaction events</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.soundEffects}
                      onCheckedChange={(checked) => handleSettingChange("soundEffects", checked)}
                    />
                  </div>
                </Card>
              </div>
            )}

            {activeTab === "trading" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Trading Settings</h3>
                </div>

                <Card className="bg-slate-800/50 border-slate-700 p-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white font-medium">Slippage Tolerance</h4>
                      <p className="text-slate-400 text-sm">Maximum price movement you're willing to accept</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-4">
                        <span className="text-slate-400 text-sm">0.1%</span>
                        <Slider
                          value={[settings.slippageTolerance]}
                          onValueChange={(value) => handleSettingChange("slippageTolerance", value[0])}
                          max={5}
                          min={0.1}
                          step={0.1}
                          className="flex-1"
                        />
                        <span className="text-slate-400 text-sm">5%</span>
                      </div>
                      <div className="text-center">
                        <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                          {settings.slippageTolerance}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700 p-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-white font-medium">Gas Price</h4>
                      <p className="text-slate-400 text-sm">Choose your preferred gas price setting</p>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: "slow", label: "Slow", desc: "Lower fees" },
                        { id: "standard", label: "Standard", desc: "Balanced" },
                        { id: "fast", label: "Fast", desc: "Higher fees" },
                      ].map((option) => (
                        <button
                          key={option.id}
                          onClick={() => handleSettingChange("gasPrice", option.id)}
                          className={`flex flex-col items-center space-y-1 p-3 rounded-lg border transition-all duration-200 ${
                            settings.gasPrice === option.id
                              ? "border-blue-500 bg-blue-500/10 text-blue-400"
                              : "border-slate-600 text-slate-400 hover:border-slate-500 hover:text-white"
                          }`}
                        >
                          <span className="text-sm font-medium">{option.label}</span>
                          <span className="text-xs">{option.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Expert Mode</h4>
                      <p className="text-slate-400 text-sm">Enable advanced trading features and reduced warnings</p>
                    </div>
                    <Switch
                      checked={settings.expertMode}
                      onCheckedChange={(checked) => handleSettingChange("expertMode", checked)}
                    />
                  </div>
                  {settings.expertMode && (
                    <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-amber-400 text-sm font-medium">Expert Mode Enabled</p>
                          <p className="text-amber-300/80 text-xs mt-1">
                            You'll see fewer warnings and have access to advanced features. Trade carefully.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Security Settings</h3>
                </div>

                <Card className="bg-slate-800/50 border-slate-700 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">MEV Protection</h4>
                      <p className="text-slate-400 text-sm">Protect against front-running and sandwich attacks</p>
                    </div>
                    <Switch
                      checked={settings.mevProtection}
                      onCheckedChange={(checked) => handleSettingChange("mevProtection", checked)}
                    />
                  </div>
                </Card>

                <Card className="bg-amber-500/10 border-amber-500/30 p-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-amber-400 font-medium mb-2">Security Best Practices</h4>
                      <ul className="text-amber-300/80 text-sm space-y-1">
                        <li>• Never share your private keys or seed phrase</li>
                        <li>• Always verify transaction details before confirming</li>
                        <li>• Use hardware wallets for large amounts</li>
                        <li>• Keep your wallet software updated</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <Button variant="ghost" onClick={handleReset} className="text-slate-400 hover:text-white">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Defaults
          </Button>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="border-slate-600 text-slate-300 bg-transparent">
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
