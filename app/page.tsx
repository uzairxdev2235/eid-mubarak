"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Moon, Sun, Menu, X, Share2, Download, Calendar, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function EidUlAdhaPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [senderName, setSenderName] = useState("")
  const [fromName, setFromName] = useState("Uzair Mughal")
  const { toast } = useToast()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const fromParam = urlParams.get("from")

    if (fromParam) {
      setFromName(decodeURIComponent(fromParam.replace(/"/g, "")))
    }

    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true)
    }

    const handleScroll = () => {
      const sections = ["home", "greetings", "card-maker", "recipes", "calendar", "qibla"]

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const generateShareLink = () => {
    if (!senderName.trim()) {
      toast({
        title: "Please enter your name",
        description: "Your name is required to generate a share link.",
        variant: "destructive",
      })
      return
    }

    const baseUrl = window.location.href.split("?")[0]
    const shareLink = `${baseUrl}?from=${encodeURIComponent(senderName)}`

    navigator.clipboard
      .writeText(shareLink)
      .then(() => {
        toast({
          title: "Share link copied!",
          description: "The link has been copied to your clipboard.",
        })
      })
      .catch(() => {
        toast({
          title: "Share link generated",
          description: shareLink,
          variant: "destructive",
        })
      })
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  const navItems = [
    { id: "home", label: "Home" },
    { id: "greetings", label: "Greetings" },
    { id: "card-maker", label: "Card Maker" },
    { id: "recipes", label: "Recipes" },
    { id: "calendar", label: "Calendar" },
    { id: "qibla", label: "Qibla" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
      {/* Floating Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-emerald-400/30 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg z-50 transition-all duration-300">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-2xl">🕌</div>
            <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">
              Eid ul Adha Mubarak
            </div>
          </motion.div>

          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-medium transition-all duration-300 hover:scale-105 ${
                  activeSection === item.id
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)} className="rounded-full">
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-gray-900 border-t"
            >
              <div className="px-4 py-3 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-20">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex flex-col items-center justify-center py-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Animated Kaaba */}
            <motion.div
              className="absolute -top-10 right-10 md:right-20 hidden md:block"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-black rounded-lg shadow-2xl relative">
                <div className="absolute inset-2 border-2 border-amber-400 rounded"></div>
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-400 rounded-full"></div>
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-7xl font-bold mb-6"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-emerald-600 via-amber-600 to-red-600 bg-clip-text text-transparent">
                Eid ul Adha Mubarak
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              May Allah accept your sacrifice and bless you with His divine grace. Eid ul Adha commemorates the
              willingness of Ibrahim (AS) to sacrifice his son as an act of obedience to Allah.
            </motion.p>

            <motion.div
              className="text-lg md:text-xl text-emerald-600 dark:text-emerald-400 font-medium mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              From: {fromName}
            </motion.div>

            <EidCountdown />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Card className="max-w-md mx-auto mt-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-center">Share Your Eid Greetings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sender-name">Your Name</Label>
                    <Input
                      id="sender-name"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Enter your name"
                    />
                  </div>
                  <Button onClick={generateShareLink} className="w-full bg-emerald-600 hover:bg-emerald-700">
                    <Share2 className="w-4 h-4 mr-2" />
                    Generate Share Link
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </section>

        {/* Greetings Section */}
        <section id="greetings" className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">
              Eid ul Adha Greetings
            </h2>
            <GreetingGenerator />
          </motion.div>
        </section>

        {/* Card Maker Section */}
        <section id="card-maker" className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">
              Eid ul Adha Card Maker
            </h2>
            <CardMaker />
          </motion.div>
        </section>

        {/* Recipes Section */}
        <section id="recipes" className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">
              Traditional Eid ul Adha Recipes
            </h2>
            <RecipeCarousel />
          </motion.div>
        </section>


      {/* Footer */}
      <footer className="bg-gradient-to-r from-emerald-900 to-amber-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="mb-4 text-3xl font-arabic">عيد أضحى مبارك</p>
            <p className="text-gray-300 mb-4">May Allah accept your sacrifices and grant you His blessings</p>
            <p className="text-gray-400">Created with ❤️ for Eid ul Adha celebrations</p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}

// Eid Countdown Component
function EidCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Eid ul Adha 2025 date (approximate - should be updated based on moon sighting)
    const eidDate = new Date("2025-06-07T00:00:00")

    const timer = setInterval(() => {
      const now = new Date()
      const difference = eidDate.getTime() - now.getTime()

      if (difference <= 0) {
        clearInterval(timer)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg p-6 max-w-md mx-auto"
      >
        <h3 className="text-2xl font-bold text-emerald-600 mb-2">Eid ul Adha Mubarak!</h3>
        <p className="text-gray-700 dark:text-gray-300">May Allah accept your sacrifices and bless you abundantly.</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg p-6 max-w-md mx-auto"
    >
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Countdown to Eid ul Adha</h3>
      <div className="grid grid-cols-4 gap-2 text-center">
        {[
          { value: timeLeft.days, label: "Days", color: "text-emerald-600" },
          { value: timeLeft.hours, label: "Hours", color: "text-amber-600" },
          { value: timeLeft.minutes, label: "Minutes", color: "text-red-600" },
          { value: timeLeft.seconds, label: "Seconds", color: "text-emerald-600" },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className={`text-2xl md:text-3xl font-bold ${item.color}`}>{item.value}</div>
            <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{item.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// Greeting Generator Component
function GreetingGenerator() {
  const greetings = [
    "May Allah accept your sacrifice and shower His countless blessings upon you and your family. Eid ul Adha Mubarak!",
    "On this blessed day of sacrifice, may Allah grant you happiness, peace, and prosperity. Eid ul Adha Mubarak!",
    "May the spirit of sacrifice bring you closer to Allah and fill your life with joy and contentment. Eid Mubarak!",
    "As we commemorate Ibrahim's devotion, may Allah bless you with unwavering faith and endless happiness. Eid ul Adha Mubarak!",
    "May this Eid ul Adha bring peace to your heart, joy to your home, and blessings to your life. Eid Mubarak!",
    "On this holy occasion, may Allah accept your prayers and grant you His divine mercy. Eid ul Adha Mubarak!",
    "May the lessons of sacrifice and devotion inspire you throughout the year. Wishing you a blessed Eid ul Adha!",
    "May Allah's blessings be with you today, tomorrow, and always. Eid ul Adha Mubarak to you and your loved ones!",
  ]

  const [currentGreeting, setCurrentGreeting] = useState(0)

  const nextGreeting = () => {
    setCurrentGreeting((prev) => (prev + 1) % greetings.length)
  }

  const prevGreeting = () => {
    setCurrentGreeting((prev) => (prev - 1 + greetings.length) % greetings.length)
  }

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <CardContent className="p-6 md:p-8 text-center relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevGreeting}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full"
        >
          ←
        </Button>

        <motion.div
          key={currentGreeting}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="min-h-[150px] flex items-center justify-center px-12"
        >
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium italic">
            "{greetings[currentGreeting]}"
          </p>
        </motion.div>

        <Button
          variant="ghost"
          size="icon"
          onClick={nextGreeting}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full"
        >
          →
        </Button>

        <div className="mt-6 space-y-4">
          <Button onClick={nextGreeting} className="bg-emerald-600 hover:bg-emerald-700">
            Generate New Greeting
          </Button>
          <div className="flex justify-center space-x-2">
            {greetings.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentGreeting(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentGreeting === index ? "bg-emerald-600" : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Enhanced Card Maker Component
function CardMaker() {
  const [cardConfig, setCardConfig] = useState({
    background: "gradient-emerald-amber",
    greeting: "Eid ul Adha Mubarak",
    message: "May Allah accept your sacrifice and bless you abundantly",
    font: "font-serif",
    recipient: "",
    sender: "",
    template: "classic",
  })

  const backgrounds = [
    { id: "gradient-emerald-amber", name: "Emerald to Amber", class: "bg-gradient-to-r from-emerald-500 to-amber-500" },
    { id: "gradient-green-gold", name: "Green to Gold", class: "bg-gradient-to-r from-green-600 to-yellow-500" },
    { id: "gradient-teal-orange", name: "Teal to Orange", class: "bg-gradient-to-r from-teal-500 to-orange-500" },
    { id: "kaaba-theme", name: "Kaaba Theme", class: "bg-gradient-to-br from-gray-800 to-amber-600" },
    { id: "mosque-theme", name: "Mosque Theme", class: "bg-gradient-to-r from-indigo-600 to-purple-600" },
    { id: "sunset-theme", name: "Sunset Theme", class: "bg-gradient-to-r from-orange-500 to-red-500" },
  ]

  const templates = [
    { id: "classic", name: "Classic" },
    { id: "modern", name: "Modern" },
    { id: "elegant", name: "Elegant" },
  ]

  const greetings = ["Eid ul Adha Mubarak", "عيد أضحى مبارك", "Happy Eid ul Adha", "Blessed Eid ul Adha", "Eid Saeed"]

  const messages = [
    "May Allah accept your sacrifice and bless you abundantly",
    "Wishing you joy, peace, and prosperity on this blessed day",
    "May the spirit of sacrifice bring you closer to Allah",
    "May Allah grant you happiness and success in all your endeavors",
    "On this holy day, may your prayers be answered and your sacrifices accepted",
  ]

  const downloadCard = () => {
    // Implementation for downloading the card as image
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    if (!ctx) return

    canvas.width = 800
    canvas.height = 600

    // Create gradient based on selected background
    const selectedBg = backgrounds.find((bg) => bg.id === cardConfig.background)
    const gradient = ctx.createLinearGradient(0, 0, 800, 0)

    switch (cardConfig.background) {
      case "gradient-emerald-amber":
        gradient.addColorStop(0, "#10b981")
        gradient.addColorStop(1, "#f59e0b")
        break
      case "gradient-green-gold":
        gradient.addColorStop(0, "#16a34a")
        gradient.addColorStop(1, "#eab308")
        break
      default:
        gradient.addColorStop(0, "#10b981")
        gradient.addColorStop(1, "#f59e0b")
    }

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 800, 600)

    // Add decorative elements
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)"
    ctx.beginPath()
    ctx.arc(700, 100, 80, 0, 2 * Math.PI)
    ctx.fill()

    // Add text
    ctx.textAlign = "center"
    ctx.fillStyle = "white"
    ctx.shadowColor = "rgba(0, 0, 0, 0.3)"
    ctx.shadowBlur = 10

    // Greeting
    ctx.font = "bold 64px serif"
    ctx.fillText(cardConfig.greeting, 400, 150)

    // Message
    ctx.font = "28px serif"
    const words = cardConfig.message.split(" ")
    let line = ""
    let y = 250

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " "
      const metrics = ctx.measureText(testLine)

      if (metrics.width > 600 && i > 0) {
        ctx.fillText(line, 400, y)
        line = words[i] + " "
        y += 35
      } else {
        line = testLine
      }
    }
    ctx.fillText(line, 400, y)

    // Recipient and sender
    if (cardConfig.recipient) {
      ctx.font = "italic 24px serif"
      ctx.fillText(`To: ${cardConfig.recipient}`, 400, y + 80)
    }

    if (cardConfig.sender) {
      ctx.font = "italic 24px serif"
      ctx.fillText(`From: ${cardConfig.sender}`, 400, y + 120)
    }

    // Download
    const link = document.createElement("a")
    link.download = "eid-ul-adha-card.png"
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Card Preview */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Card className="overflow-hidden">
          <div
            className={`${backgrounds.find((bg) => bg.id === cardConfig.background)?.class} h-[400px] md:h-[500px] flex flex-col items-center justify-center text-white text-center p-8 relative`}
          >
            {/* Decorative elements based on template */}
            {cardConfig.template === "classic" && <div className="absolute top-4 right-4 text-4xl opacity-20">🕌</div>}
            {cardConfig.template === "modern" && <div className="absolute inset-0 bg-black/10"></div>}
            {cardConfig.template === "elegant" && (
              <>
                <div className="absolute top-0 left-0 w-full h-1 bg-white/30"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30"></div>
              </>
            )}

            <motion.h2
              className={`text-3xl md:text-5xl font-bold mb-6 ${cardConfig.font}`}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {cardConfig.greeting}
            </motion.h2>

            <motion.p
              className={`text-lg md:text-xl mb-8 ${cardConfig.font}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {cardConfig.message}
            </motion.p>

            <div className="mt-auto space-y-2">
              {cardConfig.recipient && (
                <p className={`text-lg italic ${cardConfig.font}`}>To: {cardConfig.recipient}</p>
              )}
              {cardConfig.sender && <p className={`text-lg italic ${cardConfig.font}`}>From: {cardConfig.sender}</p>}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Card Controls */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Customize Your Eid ul Adha Card</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs defaultValue="design" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
              </TabsList>

              <TabsContent value="design" className="space-y-4">
                <div>
                  <Label>Template</Label>
                  <Select
                    value={cardConfig.template}
                    onValueChange={(value) => setCardConfig((prev) => ({ ...prev, template: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Background Theme</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {backgrounds.map((bg) => (
                      <button
                        key={bg.id}
                        onClick={() => setCardConfig((prev) => ({ ...prev, background: bg.id }))}
                        className={`${bg.class} h-12 rounded-md border-2 transition-all ${
                          cardConfig.background === bg.id ? "border-white shadow-lg scale-105" : "border-transparent"
                        }`}
                        title={bg.name}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Font Style</Label>
                  <Select
                    value={cardConfig.font}
                    onValueChange={(value) => setCardConfig((prev) => ({ ...prev, font: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="font-serif">Serif (Classic)</SelectItem>
                      <SelectItem value="font-sans">Sans-serif (Modern)</SelectItem>
                      <SelectItem value="font-mono">Monospace (Unique)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-4">
                <div>
                  <Label>Greeting</Label>
                  <Select
                    value={cardConfig.greeting}
                    onValueChange={(value) => setCardConfig((prev) => ({ ...prev, greeting: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {greetings.map((greeting) => (
                        <SelectItem key={greeting} value={greeting}>
                          {greeting}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Message</Label>
                  <Select
                    value={cardConfig.message}
                    onValueChange={(value) => setCardConfig((prev) => ({ ...prev, message: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {messages.map((message) => (
                        <SelectItem key={message} value={message}>
                          {message.substring(0, 50)}...
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="recipient">To (Optional)</Label>
                  <Input
                    id="recipient"
                    value={cardConfig.recipient}
                    onChange={(e) => setCardConfig((prev) => ({ ...prev, recipient: e.target.value }))}
                    placeholder="Recipient's name"
                  />
                </div>

                <div>
                  <Label htmlFor="sender">From (Optional)</Label>
                  <Input
                    id="sender"
                    value={cardConfig.sender}
                    onChange={(e) => setCardConfig((prev) => ({ ...prev, sender: e.target.value }))}
                    placeholder="Your name"
                  />
                </div>
              </TabsContent>
            </Tabs>

            <Button onClick={downloadCard} className="w-full bg-emerald-600 hover:bg-emerald-700">
              <Download className="w-4 h-4 mr-2" />
              Download Card
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

// Enhanced Recipe Carousel Component
function RecipeCarousel() {
  const recipes = [
    {
      title: "Qurbani Biryani",
      description:
        "A special biryani made with sacrificial meat, aromatic spices, and basmati rice, perfect for Eid ul Adha celebrations.",
      image: "🍛",
      difficulty: "Medium",
      time: "2 hours",
      serves: "8-10",
      ingredients: [
        "2 kg mutton or beef, cut into pieces",
        "3 cups basmati rice",
        "2 large onions, sliced",
        "1 cup yogurt",
        "2 tbsp ginger-garlic paste",
        "2 tsp red chili powder",
        "1 tsp turmeric powder",
        "2 tsp biryani masala",
        "1/2 cup mint leaves",
        "1/2 cup coriander leaves",
        "4 tbsp ghee",
        "Whole spices (bay leaves, cardamom, cinnamon)",
        "Saffron soaked in warm milk",
        "Salt to taste",
      ],
      instructions: [
        "Marinate meat with yogurt, ginger-garlic paste, red chili powder, turmeric, and salt for 2 hours.",
        "Heat ghee in a heavy-bottomed pot and fry onions until golden brown. Remove and set aside.",
        "In the same pot, add marinated meat and cook on medium heat until tender (about 1 hour).",
        "Meanwhile, soak basmati rice for 30 minutes, then boil with whole spices until 70% cooked.",
        "Layer the partially cooked rice over the meat.",
        "Sprinkle fried onions, mint, coriander, and saffron milk on top.",
        "Cover tightly with aluminum foil, then place the lid. Cook on high heat for 3-4 minutes.",
        "Reduce heat to low and cook for 45 minutes.",
        "Let it rest for 10 minutes before opening. Gently mix and serve hot.",
      ],
    },
    {
      title: "Haleem",
      description:
        "A hearty stew made with lentils, wheat, and meat, slow-cooked to perfection and traditionally served during Eid.",
      image: "🍲",
      difficulty: "Hard",
      time: "4 hours",
      serves: "10-12",
      ingredients: [
        "1 kg mixed meat (beef, mutton)",
        "1 cup wheat (broken)",
        "1/2 cup chana dal",
        "1/2 cup masoor dal",
        "1/4 cup moong dal",
        "1/4 cup urad dal",
        "2 large onions",
        "2 tbsp ginger-garlic paste",
        "2 tsp red chili powder",
        "1 tsp turmeric powder",
        "2 tsp garam masala",
        "4 tbsp ghee",
        "Fresh ginger, green chilies, mint for garnish",
        "Salt to taste",
      ],
      instructions: [
        "Soak wheat and all lentils separately for 2 hours.",
        "Pressure cook meat with salt and turmeric until tender. Shred the meat and keep the stock.",
        "Cook soaked wheat and lentils together until very soft and mushy.",
        "Heat ghee in a pan, fry sliced onions until golden brown.",
        "Add ginger-garlic paste, cook for 2 minutes.",
        "Add shredded meat, spices, and cook for 10 minutes.",
        "Combine the cooked lentil-wheat mixture with the meat.",
        "Add meat stock and simmer for 1 hour, stirring occasionally.",
        "Mash everything together until you get a thick, porridge-like consistency.",
        "Garnish with fried onions, fresh ginger, green chilies, and mint before serving.",
      ],
    },
    {
      title: "Sheer Khurma",
      description:
        "A festive vermicelli pudding made with milk, dates, and nuts, traditionally served during Eid celebrations.",
      image: "🥛",
      difficulty: "Easy",
      time: "45 minutes",
      serves: "6-8",
      ingredients: [
        "1 cup vermicelli (seviyan)",
        "4 cups full-fat milk",
        "1/2 cup sugar",
        "1/4 cup ghee",
        "1/4 cup chopped dates",
        "1/4 cup mixed nuts (almonds, pistachios, cashews)",
        "1/4 tsp cardamom powder",
        "Pinch of saffron",
        "2 tbsp raisins",
      ],
      instructions: [
        "Heat ghee in a heavy-bottomed pan.",
        "Add vermicelli and roast until golden brown.",
        "Add milk gradually while stirring continuously.",
        "Bring to a boil, then simmer until vermicelli is cooked.",
        "Add sugar, dates, and saffron. Stir well.",
        "Add cardamom powder and half of the nuts and raisins.",
        "Simmer for 5-10 more minutes until desired consistency is reached.",
        "Garnish with remaining nuts and raisins.",
        "Serve hot or chilled as preferred.",
      ],
    },
    {
      title: "Kebab Platter",
      description:
        "Assorted grilled kebabs made from the sacrificial meat, seasoned with traditional spices and herbs.",
      image: "🍢",
      difficulty: "Medium",
      time: "3 hours (including marination)",
      serves: "6-8",
      ingredients: [
        "1 kg ground meat (beef/mutton)",
        "2 large onions, finely chopped",
        "2 tbsp ginger-garlic paste",
        "2 tsp red chili powder",
        "1 tsp garam masala",
        "1 tsp cumin powder",
        "1/2 cup fresh mint leaves",
        "1/2 cup fresh coriander leaves",
        "2 green chilies, finely chopped",
        "1 egg",
        "2 tbsp gram flour (besan)",
        "Salt to taste",
        "Oil for grilling",
      ],
      instructions: [
        "Mix ground meat with all spices, herbs, and chopped onions.",
        "Add egg and gram flour to bind the mixture.",
        "Knead the mixture well and refrigerate for 2 hours.",
        "Shape the mixture into kebabs (seekh, shami, or chapli style).",
        "Preheat grill or pan with oil.",
        "Cook kebabs on medium heat, turning occasionally until golden brown and cooked through.",
        "Serve hot with naan, rice, or salad.",
        "Garnish with sliced onions, mint chutney, and lemon wedges.",
      ],
    },
  ]

  const [currentRecipe, setCurrentRecipe] = useState(0)

  const nextRecipe = () => {
    setCurrentRecipe((prev) => (prev + 1) % recipes.length)
  }

  const prevRecipe = () => {
    setCurrentRecipe((prev) => (prev - 1 + recipes.length) % recipes.length)
  }

  return (
    <Card className="overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevRecipe}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 rounded-full bg-white/80 dark:bg-gray-800/80"
        >
          ←
        </Button>

        <CardContent className="p-6 md:p-8">
          <motion.div
            key={currentRecipe}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">{recipes[currentRecipe].image}</div>
                <div>
                  <h3 className="text-2xl font-bold text-emerald-600">{recipes[currentRecipe].title}</h3>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary">{recipes[currentRecipe].difficulty}</Badge>
                    <Badge variant="outline">⏱️ {recipes[currentRecipe].time}</Badge>
                    <Badge variant="outline">👥 {recipes[currentRecipe].serves}</Badge>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-6">{recipes[currentRecipe].description}</p>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Ingredients:</h4>
                <ul className="list-disc pl-5 mb-6 text-gray-700 dark:text-gray-300 space-y-1 max-h-48 overflow-y-auto">
                  {recipes[currentRecipe].ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Instructions:</h4>
              <ol className="list-decimal pl-5 text-gray-700 dark:text-gray-300 space-y-2 max-h-96 overflow-y-auto">
                {recipes[currentRecipe].instructions.map((instruction, index) => (
                  <li key={index} className="mb-2">
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>

          <div className="mt-8 flex justify-center gap-2">
            {recipes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentRecipe(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentRecipe === index ? "bg-emerald-600" : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>
        </CardContent>

        <Button
          variant="ghost"
          size="icon"
          onClick={nextRecipe}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 rounded-full bg-white/80 dark:bg-gray-800/80"
        >
          →
        </Button>
      </div>
    </Card>
  )
}

