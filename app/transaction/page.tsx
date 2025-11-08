"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { Send, TrendingUp, Zap, Shield, Clock, CheckCircle, ArrowRight, Activity } from "lucide-react"

export default function TransactionPage() {
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
                Transaction Management
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6"
            >
              Execute Transactions{" "}
              <span className="bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent">On-Chain</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 max-w-2xl mb-8">
              Build and execute complex transactions with Flow's visual transaction builder. Monitor, track, and
              optimize every transaction.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200">
                <Link href="#transactions">
                  Explore Transactions
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

      {/* Transaction Types */}
      <section id="transactions" className="py-24 bg-background/50 w-full">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Transaction Types</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Support for all transaction types on the blockchain
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Payment Transactions",
                description: "Send and receive assets with built-in validation and confirmation.",
                icon: Send,
                features: ["Multi-asset support", "Batch payments", "Atomic swaps"],
              },
              {
                title: "Contract Calls",
                description: "Invoke smart contracts with complex parameters and state changes.",
                icon: Zap,
                features: ["Method invocation", "State updates", "Event logging"],
              },
              {
                title: "Asset Management",
                description: "Create, mint, and manage custom assets on-chain.",
                icon: TrendingUp,
                features: ["Asset creation", "Minting", "Burning"],
              },
            ].map((txType, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative"
              >
                <div className="flex flex-col h-full p-8 rounded-2xl bg-card border border-gray-700 hover:border-gray-500 transition-colors">
                  <txType.icon className="h-8 w-8 text-gray-300 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">{txType.title}</h3>
                  <p className="text-gray-400 mb-6">{txType.description}</p>
                  <div className="space-y-2">
                    {txType.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Transaction Lifecycle */}
      <section className="py-24 bg-gradient-to-b from-background to-gray-900/10 w-full">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Transaction Lifecycle</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">Track your transactions from creation to finality</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Build",
                description: "Construct your transaction using Flow's visual builder",
                icon: Send,
              },
              {
                step: "2",
                title: "Sign",
                description: "Sign with your wallet to authorize the transaction",
                icon: Shield,
              },
              {
                step: "3",
                title: "Submit",
                description: "Submit to the blockchain network for processing",
                icon: Activity,
              },
              {
                step: "4",
                title: "Confirm",
                description: "Transaction confirmed and finalized on-chain",
                icon: CheckCircle,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center text-black font-bold mb-4">
                    {item.step}
                  </div>
                  {index < 3 && <div className="w-1 h-16 bg-gradient-to-b from-gray-400 to-transparent" />}
                </div>
                <div className="flex-1 pt-2">
                  <div className="p-6 rounded-xl bg-card border border-gray-700 hover:border-gray-500 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <item.icon className="h-5 w-5 text-gray-300" />
                      <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    </div>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Execute Your First Transaction</h2>
            <p className="text-lg text-gray-400 mb-8">
              Build and execute transactions with Flow's intuitive transaction builder.
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
                <Link href="/docs">
                  <Clock className="mr-2 h-4 w-4" />
                  View Docs
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
