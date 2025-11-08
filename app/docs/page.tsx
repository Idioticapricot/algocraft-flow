"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { BookOpen, Code2, Zap, HelpCircle, ArrowRight, FileText, Video } from "lucide-react"
import { useState } from "react"

export default function DocsPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

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
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden min-h-screen flex items-center">
        {/* Background gradient */}
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
                Documentation
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6"
            >
              Learn Flow{" "}
              <span className="bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent">
                Documentation
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 max-w-2xl mb-8">
              Complete guides, tutorials, and API reference for building with Flow.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200">
                <Link href="#guides">
                  View Guides
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-gray-600 text-white hover:bg-gray-900 bg-transparent"
              >
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  View Examples
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick Start */}
      <section id="guides" className="py-24 bg-background/50 w-full">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Getting Started</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">Start building with Flow in minutes</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Quick Start Guide",
                description: "Get up and running with Flow in 5 minutes.",
                icon: Zap,
                link: "#",
              },
              {
                title: "API Reference",
                description: "Complete API documentation for all Flow methods.",
                icon: Code2,
                link: "#",
              },
              {
                title: "Video Tutorials",
                description: "Step-by-step video guides for common tasks.",
                icon: Video,
                link: "#",
              },
            ].map((guide, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative"
              >
                <a
                  href={guide.link}
                  className="flex flex-col h-full p-8 rounded-2xl bg-card border border-gray-700 hover:border-gray-500 transition-colors cursor-pointer"
                >
                  <guide.icon className="h-8 w-8 text-gray-300 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">{guide.title}</h3>
                  <p className="text-gray-400">{guide.description}</p>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="py-24 bg-gradient-to-b from-background to-gray-900/10 w-full">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Documentation</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">Comprehensive guides for all Flow features</p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                title: "Smart Contract Builder",
                description: "Learn how to use Flow's drag-and-drop contract builder",
                icon: Code2,
              },
              {
                title: "Transaction Management",
                description: "Build and execute transactions on-chain",
                icon: Zap,
              },
              {
                title: "Wallet Integration",
                description: "Connect and manage wallets with Flow",
                icon: BookOpen,
              },
              {
                title: "Deployment Guide",
                description: "Deploy your contracts to mainnet or testnet",
                icon: FileText,
              },
            ].map((doc, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <a
                  href="#"
                  className="flex items-center justify-between p-6 rounded-xl bg-card border border-gray-700 hover:border-gray-500 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <doc.icon className="h-6 w-6 text-gray-300" />
                    <div>
                      <h3 className="text-lg font-bold text-white">{doc.title}</h3>
                      <p className="text-gray-400 text-sm">{doc.description}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-background/50 w-full">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">Find answers to common questions about Flow</p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "What blockchain does Flow support?",
                answer:
                  "Flow supports multiple blockchains including Ethereum, Polygon, and other EVM-compatible chains. You can deploy contracts to any supported network.",
              },
              {
                question: "Do I need to know how to code?",
                answer:
                  "No! Flow's drag-and-drop builder is designed for non-technical users. However, advanced users can also write custom code if needed.",
              },
              {
                question: "How much does it cost to deploy?",
                answer:
                  "Deployment costs depend on the blockchain network you choose. Flow handles gas optimization to minimize costs.",
              },
              {
                question: "Can I test my contracts before deploying?",
                answer:
                  "Yes! Flow includes a built-in testing environment where you can simulate transactions and test your contracts before deploying to mainnet.",
              },
              {
                question: "Is my contract code secure?",
                answer:
                  "Flow contracts are audited and follow security best practices. We also provide security recommendations and warnings during development.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 rounded-xl bg-card border border-gray-700 hover:border-gray-500 transition-colors text-left"
                >
                  <div className="flex items-center gap-4">
                    <HelpCircle className="h-5 w-5 text-gray-300 flex-shrink-0" />
                    <h3 className="text-lg font-bold text-white">{faq.question}</h3>
                  </div>
                  <motion.div animate={{ rotate: expandedFaq === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  </motion.div>
                </button>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: expandedFaq === index ? 1 : 0,
                    height: expandedFaq === index ? "auto" : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 bg-card/50 border-t border-gray-700 text-gray-400">{faq.answer}</div>
                </motion.div>
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
            <p className="text-lg text-gray-400 mb-8">
              Start creating smart contracts and transactions with Flow today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200">
                <Link href="/">
                  Launch Builder
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-gray-600 text-white hover:bg-gray-900 bg-transparent"
              >
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
