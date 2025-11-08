"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { Zap, Code2, Workflow, ArrowRight, CheckCircle, Layers, Rocket } from "lucide-react"

export default function Home() {
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

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* Hero Section 1: Main Introduction - CHANGE: Updated to Flow drag-and-drop platform */}
      <section className="relative w-full overflow-hidden min-h-screen flex items-center">
        {/* Background gradient with grey tones */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/40 via-background to-gray-800/40 z-0" />

        {/* Animated shapes */}
        <motion.div
          className="absolute top-20 right-[10%] w-96 h-96 rounded-full bg-gray-500/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute bottom-20 left-[10%] w-96 h-96 rounded-full bg-gray-600/10 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        <div className="container relative z-10 px-4 py-24 md:py-32 mx-auto">
          <motion.div
            className="flex flex-col items-center text-center max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-block px-4 py-2 rounded-full bg-gray-500/10 border border-gray-500/20 text-gray-300 text-sm font-medium mb-6">
                Drag & Drop Smart Contracts
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6"
            >
              Build Smart Contracts{" "}
              <span className="bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
                Without Code
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
              Flow is the drag-and-drop platform for creating smart contracts and transactions on-chain. No coding
              experience required. Deploy in minutes.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white hover:bg-gray-100 text-black font-semibold">
                <Link href="/contract">
                  Start Building
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#how-it-works">Learn More</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Hero Section 2: How It Works - CHANGE: Updated to Flow's drag-and-drop workflow */}
      <section id="how-it-works" className="py-24 bg-background/50 w-full">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How Flow Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Create powerful smart contracts and transactions with an intuitive visual interface
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Drag Components",
                description: "Select from pre-built smart contract components and drag them onto your canvas.",
                icon: Layers,
              },
              {
                step: "02",
                title: "Configure Logic",
                description: "Set parameters, conditions, and actions using an intuitive visual editor.",
                icon: Workflow,
              },
              {
                step: "03",
                title: "Deploy On-Chain",
                description: "Connect your wallet and deploy your contract to the blockchain instantly.",
                icon: Rocket,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative"
              >
                <div className="flex flex-col h-full p-8 rounded-2xl bg-card border border-border hover:border-gray-500/50 transition-colors">
                  <div className="text-5xl font-bold text-gray-500/20 mb-4">{item.step}</div>
                  <item.icon className="h-8 w-8 text-gray-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Section 3: Key Features & Benefits - CHANGE: Updated to Flow's capabilities */}
      <section className="py-24 bg-gradient-to-b from-background to-gray-900/10 w-full">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Why Choose Flow?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The easiest way to build and deploy smart contracts on-chain
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Code2,
                title: "No Code Required",
                description:
                  "Build complex smart contracts without writing a single line of code. Our visual editor handles all the complexity.",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Deploy contracts in minutes, not days. From idea to production faster than ever before.",
              },
              {
                icon: CheckCircle,
                title: "Secure & Audited",
                description:
                  "All components are pre-audited and tested. Deploy with confidence knowing your contracts are secure.",
              },
              {
                icon: Workflow,
                title: "Full Control",
                description:
                  "Connect your wallet and maintain complete control over your contracts and transactions on-chain.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-card border border-border hover:border-gray-500/50 transition-colors group"
              >
                <div className="p-3 rounded-lg bg-gradient-to-br from-gray-500/10 to-gray-600/10 w-fit mb-4 group-hover:from-gray-500/20 group-hover:to-gray-600/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-gray-900/50 to-gray-800/50 w-full">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center max-w-2xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Build?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start creating smart contracts and transactions today. No experience necessary.
            </p>

            <Button asChild size="lg" className="bg-white hover:bg-gray-100 text-black font-semibold">
              <Link href="/contract">
                Start Building Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
