"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import * as THREE from "three"
import {
  Target,
  TrendingUp,
  Users,
  Zap,
  CheckCircle2,
  ArrowRight,
  Shield,
  BarChart3,
  Clock,
  Trophy,
  Play,
  Star,
} from "lucide-react"

// Football Field 3D Scene Component
const FootballField3D = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const footballRef = useRef<THREE.Mesh | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene
    scene.background = new THREE.Color(0x0a1428)
    scene.fog = new THREE.Fog(0x0a1428, 100, 500)

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    cameraRef.current = camera
    camera.position.set(0, 15, 25)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    rendererRef.current = renderer
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowShadowMap
    containerRef.current.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(50, 50, 50)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    scene.add(directionalLight)

    const pointLight = new THREE.PointLight(0x00d4ff, 1, 100)
    pointLight.position.set(-20, 20, 20)
    scene.add(pointLight)

    // Field
    const fieldGeometry = new THREE.PlaneGeometry(120, 50)
    const fieldMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a4d2e,
      roughness: 0.8,
      metalness: 0.1,
    })
    const field = new THREE.Mesh(fieldGeometry, fieldMaterial)
    field.rotation.x = -Math.PI / 2
    field.receiveShadow = true
    scene.add(field)

    // Field lines (white stripes)
    const lineGeometry = new THREE.PlaneGeometry(120, 4)
    const lineMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x4d9d6b,
      emissiveIntensity: 0.3,
    })
    const lines = new THREE.Mesh(lineGeometry, lineMaterial)
    lines.rotation.x = -Math.PI / 2
    lines.position.z = 0
    lines.receiveShadow = true
    scene.add(lines)

    // Center circle
    const circleGeometry = new THREE.CircleGeometry(8, 32)
    const circleMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x00d4ff,
      emissiveIntensity: 0.2,
    })
    const circle = new THREE.Mesh(circleGeometry, circleMaterial)
    circle.rotation.x = -Math.PI / 2
    circle.position.y = 0.01
    scene.add(circle)

    // Football
    const footballGeometry = new THREE.SphereGeometry(1.5, 32, 32)
    const footballMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b4513,
      roughness: 0.4,
      metalness: 0.6,
      emissive: 0xff6b00,
      emissiveIntensity: 0.2,
    })
    const football = new THREE.Mesh(footballGeometry, footballMaterial)
    football.castShadow = true
    football.receiveShadow = true
    football.position.y = 2
    footballRef.current = football
    scene.add(football)

    // Laces on football
    const laceGeometry = new THREE.TubeGeometry(
      new THREE.LineCurve3(new THREE.Vector3(-1, 0, 0), new THREE.Vector3(1, 0, 0)),
      8,
      0.1,
      8,
    )
    const laceMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff })
    const laces = new THREE.Mesh(laceGeometry, laceMaterial)
    laces.position.y = 2
    football.add(laces)

    // Goal posts
    const postGeometry = new THREE.CylinderGeometry(0.2, 0.2, 20, 32)
    const postMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.8,
      roughness: 0.2,
    })

    for (let i = -8; i <= 8; i += 16) {
      const post = new THREE.Mesh(postGeometry, postMaterial)
      post.position.set(i, 10, -25)
      post.castShadow = true
      scene.add(post)
    }

    // Crossbar
    const crossbarGeometry = new THREE.CylinderGeometry(0.15, 0.15, 16, 32)
    const crossbar = new THREE.Mesh(crossbarGeometry, postMaterial)
    crossbar.rotation.z = Math.PI / 2
    crossbar.position.y = 20
    crossbar.position.z = -25
    crossbar.castShadow = true
    scene.add(crossbar)

    // Stars/particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particleCount = 50
    const positionArray = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      positionArray[i] = (Math.random() - 0.5) * 200
      positionArray[i + 1] = Math.random() * 100
      positionArray[i + 2] = (Math.random() - 0.5) * 200
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positionArray, 3))
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.3,
      color: 0x00d4ff,
      sizeAttenuation: true,
    })
    const particles = new THREE.Points(particlesGeometry, particleMaterial)
    scene.add(particles)

    let animationFrameId: number
    let time = 0

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      time += 0.01

      // Football rotation and movement
      if (footballRef.current) {
        footballRef.current.rotation.x += 0.01
        footballRef.current.rotation.z += 0.02
        footballRef.current.position.y = 2 + Math.sin(time * 0.5) * 2

        // Elliptical movement
        footballRef.current.position.x = Math.cos(time * 0.3) * 10
        footballRef.current.position.z = Math.sin(time * 0.3) * 10
      }

      // Particle rotation
      particles.rotation.y += 0.0001

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    />
  )
}

// Cast motion to any to avoid strict prop typing issues in this file
const m = motion as any

// Main Landing Page
export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("applications")
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  const floatingVariants = {
    float: {
      y: [0, -15, 0],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Number.POSITIVE_INFINITY,
      },
    },
  }

  const scaleVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  }

  return (
    <div
      className="overflow-hidden bg-gradient-to-b from-[#0a1428] via-[#1a2d4d] to-[#0a1428]"
      style={{ fontFamily: '"Geist", sans-serif' }}
    >
  {/* Navigation */}
  <m.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0a1428]/80 border-b border-[#00d4ff]/20"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <m.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3">
            <m.a whileHover={{ color: "#00d4ff" }} className="text-gray-300 hover:text-[#00d4ff] transition-colors duration-300 text-sm font-medium" href="#">
            <div className="relative w-12 h-12 bg-gradient-to-br from-[#ff6b00] to-[#ff8c00] rounded-full flex items-center justify-center shadow-lg shadow-[#ff6b00]/50">
              <Trophy className="w-7 h-7 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#ff6b00] to-[#00d4ff] bg-clip-text text-transparent">
              JobField
            </span>
          </m.div>

          <div className="hidden md:flex items-center gap-8">
            {["Features", "How It Works", "Pricing", "Contact"].map((item) => (
              <m.a
                key={item}
                href="#"
                whileHover={{ color: "#00d4ff" }}
                className="text-gray-300 hover:text-[#00d4ff] transition-colors duration-300 text-sm font-medium"
              >
                {item}
              </m.a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 text-white text-sm font-medium rounded-full border border-[#00d4ff]/50 hover:border-[#00d4ff] transition-all duration-300"
            >
              Sign In
            </m.button>
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 text-white text-sm font-bold rounded-full bg-gradient-to-r from-[#ff6b00] to-[#ff8c00] hover:shadow-lg hover:shadow-[#ff6b00]/50 transition-all duration-300"
            >
              Get Started
            </m.button>
          </div>
        </div>
      </m.nav>

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <FootballField3D />
        </div>

        {/* Animated background grid */}
  <m.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
          style={{
            backgroundImage:
              "linear-gradient(0deg, transparent 24%, rgba(0, 212, 255, .05) 25%, rgba(0, 212, 255, .05) 26%, transparent 27%, transparent 74%, rgba(0, 212, 255, .05) 75%, rgba(0, 212, 255, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 212, 255, .05) 25%, rgba(0, 212, 255, .05) 26%, transparent 27%, transparent 74%, rgba(0, 212, 255, .05) 75%, rgba(0, 212, 255, .05) 76%, transparent 77%, transparent)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Content overlay */}
  <m.div
          className="relative z-10 max-w-6xl mx-auto px-6 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <m.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/5 backdrop-blur-md mb-8"
          >
            <Star className="w-4 h-4 text-[#00d4ff]" />
            <span className="text-sm text-[#00d4ff] font-medium">The Ultimate Job Hunting Game</span>
          </m.div>

          {/* Main headline */}
          <m.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-black mb-6 leading-tight"
            style={{
              background: "linear-gradient(135deg, #ff6b00 0%, #ff8c00 25%, #00d4ff 50%, #00d4ff 75%, #ff6b00 100%)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            TRACK. DOMINATE. WIN.
          </m.h1>

          {/* Subheading */}
          <m.p
            variants={itemVariants}
            className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Master your job search like a championship team. Track applications, manage interviews, and score your dream
            job with intelligent analytics.
          </m.p>

          {/* CTA Buttons */}
          {/* CTA Buttons */}
          <m.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            
            <m.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 107, 0, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 text-white font-bold rounded-full bg-gradient-to-r from-[#ff6b00] to-[#ff8c00] flex items-center gap-2 hover:shadow-2xl transition-all duration-300"
            >
              Start Playing <ArrowRight className="w-5 h-5" />
            </m.button>
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 text-white font-bold rounded-full border-2 border-[#00d4ff] hover:bg-[#00d4ff]/10 flex items-center gap-2 transition-all duration-300"
            >
              <Play className="w-5 h-5" /> Watch Demo
            </m.button>
          </m.div>
        </m.div>

        {/* Floating cards */}
  <m.div
          className="absolute bottom-20 left-10 p-4 rounded-lg bg-[#1a3a52]/80 backdrop-blur-lg border border-[#00d4ff]/30"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#00d4ff]" />
            <span className="text-sm text-white font-semibold">72% Success Rate</span>
          </div>
        </m.div>

        <m.div
          className="absolute bottom-32 right-10 p-4 rounded-lg bg-[#3a1a52]/80 backdrop-blur-lg border border-[#ff6b00]/30"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#ff6b00]" />
            <span className="text-sm text-white font-semibold">500+ Jobs Tracked</span>
          </div>
        </m.div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-[#0a1428] to-[#1a2d4d]">
        <div className="max-w-6xl mx-auto">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">Championship Features</h2>
            <p className="text-gray-400 text-lg">Everything you need to win the game</p>
          </m.div>

          <m.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            
            {[
              {
                icon: Target,
                title: "Smart Tracking",
                description: "Track every application with real-time status updates and smart categorization",
              },
              {
                icon: BarChart3,
                title: "Advanced Analytics",
                description: "Visualize your success rate with detailed metrics and success patterns",
              },
              {
                icon: Clock,
                title: "Interview Manager",
                description: "Schedule, prepare, and track all your interviews in one place",
              },
              {
                icon: Users,
                title: "Networking Hub",
                description: "Connect with other job seekers and get insider tips from your community",
              },
              {
                icon: Shield,
                title: "Data Security",
                description: "Enterprise-grade encryption keeps your job search data completely safe",
              },
              {
                icon: Zap,
                title: "AI Insights",
                description: "Get AI-powered recommendations to optimize your application strategy",
              },
            ].map((feature, index) => (
               
          
          <m.div
            {[
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group p-6 rounded-xl bg-gradient-to-br from-[#1a3a52]/60 to-[#0f2540]/60 border border-[#00d4ff]/20 hover:border-[#00d4ff]/50 backdrop-blur-lg transition-all duration-300"
              >
                <m.div
                  className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#ff6b00]/20 to-[#00d4ff]/20 flex items-center justify-center mb-4 group-hover:from-[#ff6b00]/40 group-hover:to-[#00d4ff]/40 transition-all duration-300"
                  whileHover={{ rotate: 10 }}
                >
                  <feature.icon className="w-6 h-6 text-[#00d4ff]" />
                </m.div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-[#1a2d4d] to-[#0a1428]">
        <div className="max-w-6xl mx-auto">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">Your Command Center</h2>
            <p className="text-gray-400 text-lg">Beautiful, powerful, intuitive dashboard experience</p>
          </m.div>

          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden border-2 border-[#00d4ff]/30 shadow-2xl shadow-[#00d4ff]/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a52]/40 to-[#0f2540]/40" />
            <div
              className="p-8 space-y-6"
              style={{
                background: "linear-gradient(135deg, rgba(10, 20, 40, 0.9), rgba(26, 61, 83, 0.9))",
              }}
            >
              {/* Tab buttons */}
              <div className="flex gap-4 border-b border-[#00d4ff]/20">
                {["applications", "interviews", "analytics"].map((tab) => (
                  <m.button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-sm font-bold transition-all duration-300 ${
                      activeTab === tab
                        ? "text-[#00d4ff] border-b-2 border-[#00d4ff]"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </m.button>
                ))}
              </div>

              {/* Tab content */}
              <AnimatePresence mode="wait">
                <m.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === "applications" && (
                    <div className="space-y-4">
                      {[
                        { company: "Google", status: "Interview", progress: 75 },
                        { company: "Microsoft", status: "Applied", progress: 33 },
                        { company: "Apple", status: "Offer", progress: 100 },
                      ].map((app, idx) => (
                        <m.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-center justify-between p-4 rounded-lg bg-[#1a3a52]/50 border border-[#00d4ff]/20 hover:border-[#00d4ff]/50 transition-all duration-300"
                        >
                          <div>
                            <p className="font-bold text-white">{app.company}</p>
                            <p className="text-xs text-gray-400">{app.status}</p>
                          </div>
                          <div className="w-24 h-2 bg-[#0f2540] rounded-full overflow-hidden">
                            <m.div
                              initial={{ width: 0 }}
                              animate={{ width: `${app.progress}%` }}
                              transition={{ duration: 1, delay: idx * 0.2 }}
                              className="h-full bg-gradient-to-r from-[#ff6b00] to-[#00d4ff]"
                            />
                          </div>
                        </m.div>
                      ))}
                    </div>
                  )}

                  {activeTab === "interviews" && (
                    <div className="space-y-4">
                      {[
                        { company: "Google", date: "Dec 15, 2:00 PM", type: "Technical" },
                        { company: "Microsoft", date: "Dec 18, 4:30 PM", type: "HR Round" },
                      ].map((interview, idx) => (
                        <m.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="p-4 rounded-lg bg-[#1a3a52]/50 border border-[#00d4ff]/20 hover:border-[#00d4ff]/50 transition-all duration-300"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-bold text-white">{interview.company}</p>
                            <span className="text-xs px-2 py-1 rounded-full bg-[#ff6b00]/20 text-[#ff6b00]">
                              {interview.type}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400">{interview.date}</p>
                        </m.div>
                      ))}
                    </div>
                  )}

                  {activeTab === "analytics" && (
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: "Success Rate", value: "72%", icon: "📊" },
                        { label: "Applications", value: "48", icon: "📧" },
                        { label: "Interviews", value: "12", icon: "📞" },
                      ].map((stat, idx) => (
                        <m.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.1 }}
                          className="p-4 rounded-lg bg-gradient-to-br from-[#ff6b00]/10 to-[#00d4ff]/10 border border-[#00d4ff]/20"
                        >
                          <p className="text-2xl mb-1">{stat.icon}</p>
                          <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                          <p className="text-2xl font-black bg-gradient-to-r from-[#ff6b00] to-[#00d4ff] bg-clip-text text-transparent">
                            {stat.value}
                          </p>
                        </m.div>
                      ))}
                    </div>
                  )}
                </m.div>
              </AnimatePresence>
            </div>
          </m.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <m.div
            className="grid md:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { number: "50K+", label: "Active Users" },
              { number: "2.3M", label: "Applications Tracked" },
              { number: "85%", label: "Success Rate" },
              { number: "24/7", label: "Support" },
            ].map((stat, idx) => (
              <m.div
                <m.p
              </m.div>
          <m.div
            {[
                key={idx}
                variants={itemVariants}
                className="p-8 rounded-2xl bg-gradient-to-br from-[#1a3a52]/40 to-[#0f2540]/40 border border-[#00d4ff]/20 text-center hover:border-[#00d4ff]/50 transition-all duration-300"
              >
                <motion.p
                  className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#ff6b00] to-[#00d4ff] bg-clip-text text-transparent mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  {stat.number}
                </motion.p>
                <p className="text-gray-400 font-semibold">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">Simple Pricing for Winners</h2>
            <p className="text-gray-400 text-lg">Choose the plan that fits your game</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                name: "Rookie",
                price: "Free",
                features: ["Track up to 50 apps", "Basic analytics", "Mobile app"],
                highlighted: false,
              },
              {
                name: "Pro Player",
                price: "$19",
                period: "/month",
                features: ["Unlimited tracking", "Advanced analytics", "Interview manager", "AI insights"],
                highlighted: true,
              },
              {
                name: "Champion",
                price: "$49",
                period: "/month",
                features: ["Everything in Pro", "Priority support", "Custom integrations", "Team collaboration"],
                highlighted: false,
              },
            ].map((plan, idx) => (
              <m.div
                <m.button
              </m.div>
                key={idx}
                variants={itemVariants}
                whileHover={{
                  scale: plan.highlighted ? 1.05 : 1.02,
                  y: -10,
                }}
                className={`relative p-8 rounded-2xl transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-gradient-to-br from-[#ff6b00]/20 to-[#00d4ff]/20 border-2 border-[#ff6b00] shadow-2xl shadow-[#ff6b00]/30"
                    : "bg-gradient-to-br from-[#1a3a52]/40 to-[#0f2540]/40 border border-[#00d4ff]/20"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 right-0 px-4 py-2 rounded-bl-2xl rounded-tr-2xl bg-gradient-to-r from-[#ff6b00] to-[#ff8c00]">
                    <span className="text-white text-xs font-black">BEST</span>
                  </div>
                )}
                <h3 className="text-2xl font-black text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-6">Perfect for your stage</p>
                <p className="text-4xl font-black mb-1 text-white">
                  {plan.price}
                  <span className="text-sm text-gray-400 font-normal">{plan.period}</span>
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-gray-300 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#00d4ff]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 rounded-lg font-bold transition-all duration-300 ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-[#ff6b00] to-[#ff8c00] text-white hover:shadow-lg hover:shadow-[#ff6b00]/50"
                      : "bg-[#1a3a52]/50 border border-[#00d4ff]/30 text-white hover:border-[#00d4ff]/50"
                  }`}
                >
                  Get Started
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
  <m.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative py-16 px-6 border-t border-[#00d4ff]/20"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-6 h-6 text-[#ff6b00]" />
                <span className="font-bold text-white">JobField</span>
              </div>
              <p className="text-gray-400 text-sm">Master your job search journey</p>
            </div>
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Security", "Roadmap"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Contact"],
              },
              {
                title: "Legal",
                links: ["Privacy", "Terms", "Cookies", "Compliance"],
              },
            ].map((col, idx) => (
              <div key={idx}>
                <h4 className="font-bold text-white mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-gray-400 hover:text-[#00d4ff] transition-colors duration-300 text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-[#00d4ff]/20 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">© 2025 JobField. All rights reserved.</p>
            <div className="flex gap-6">
              {["Twitter", "LinkedIn", "GitHub"].map((social) => (
                <m.a
  <m.div
  <m.div
                  key={social}
                  href="#"
                  whileHover={{ scale: 1.2, color: "#00d4ff" }}
                  className="text-gray-400 hover:text-[#00d4ff] transition-all duration-300 text-sm font-medium"
                >
                  {social}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.footer>

      {/* Floating decorative elements */}
      <motion.div
        className="fixed bottom-10 right-10 w-32 h-32 rounded-full bg-gradient-to-br from-[#ff6b00]/20 to-transparent blur-3xl pointer-events-none"
        animate={{
          y: [0, 50, 0],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 6,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        }}
      />

      <motion.div
        className="fixed top-1/3 left-10 w-40 h-40 rounded-full bg-gradient-to-br from-[#00d4ff]/20 to-transparent blur-3xl pointer-events-none"
        animate={{
          y: [0, -50, 0],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        }}
      />
    </div>
  )
}
