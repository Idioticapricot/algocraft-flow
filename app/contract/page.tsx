"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { Code2, Database, Lock, Zap, GitBranch, Shield, CheckCircle, ArrowRight } from "lucide-react"

export default function SmartContractsPage() {
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
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/40 via-background to-blue-950/40 z-0" />

        {/* Animated shapes */}
        <motion.div
          className="absolute top-20 right-[10%] w-96 h-96 rounded-full bg-purple-500/10 blur-3xl"
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
          className="absolute bottom-20 left-[10%] w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"
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
              <span className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-6">
                Smart Contracts Architecture
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6"
            >
              Secure & Transparent{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Smart Contracts
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
              Explore the blockchain-based contracts powering AlgoKYC. Audited, transparent, and designed for maximum
              security.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                <Link href="#contracts">
                  View Contracts
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contract Overview Section */}
      <section id="contracts" className="py-24 bg-background/50 w-full">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Core Contracts</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three main smart contracts work together to provide secure KYC verification
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Verification Contract",
                description: "Manages the KYC verification process and stores verification proofs on-chain.",
                icon: CheckCircle,
                features: ["Zero-knowledge proofs", "Immutable records", "Batch verification"],
              },
              {
                title: "Identity Registry",
                description: "Maintains a registry of verified identities with privacy-preserving commitments.",
                icon: Database,
                features: ["Merkle trees", "Privacy hashing", "Revocation support"],
              },
              {
                title: "Access Control",
                description: "Manages permissions and controls who can verify and access identity data.",
                icon: Lock,
                features: ["Role-based access", "Multi-sig support", "Time-locked operations"],
              },
            ].map((contract, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative"
              >
                <div className="flex flex-col h-full p-8 rounded-2xl bg-card border border-border hover:border-purple-500/50 transition-colors">
                  <contract.icon className="h-8 w-8 text-purple-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">{contract.title}</h3>
                  <p className="text-muted-foreground mb-6">{contract.description}</p>
                  <div className="space-y-2">
                    {contract.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
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

      {/* Contract Interaction Flow */}
      <section className="py-24 bg-gradient-to-b from-background to-purple-950/10 w-full">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Contract Interaction Flow</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              How the contracts work together to verify identity
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "User Submission",
                description: "User submits identity data and creates a zero-knowledge proof",
                icon: Code2,
              },
              {
                step: "2",
                title: "Proof Verification",
                description: "Verification contract validates the ZK proof without revealing data",
                icon: Shield,
              },
              {
                step: "3",
                title: "Registry Update",
                description: "Identity registry records the verified commitment on-chain",
                icon: Database,
              },
              {
                step: "4",
                title: "Access Grant",
                description: "Access control contract grants permissions to verified users",
                icon: Zap,
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
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold mb-4">
                    {item.step}
                  </div>
                  {index < 3 && <div className="w-1 h-16 bg-gradient-to-b from-purple-500 to-transparent" />}
                </div>
                <div className="flex-1 pt-2">
                  <div className="p-6 rounded-xl bg-card border border-border hover:border-purple-500/50 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <item.icon className="h-5 w-5 text-purple-400" />
                      <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-24 bg-background/50 w-full">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Technical Specifications</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built with industry-leading standards and best practices
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                label: "Language",
                value: "PyTeal / TEAL",
                description: "Algorand's native smart contract languages",
              },
              {
                label: "Network",
                value: "Algorand Mainnet",
                description: "Deployed on Algorand's production blockchain",
              },
              {
                label: "Audit Status",
                value: "Audited",
                description: "Third-party security audit completed",
              },
              {
                label: "Gas Optimization",
                value: "Optimized",
                description: "Minimal transaction costs and fast execution",
              },
              {
                label: "Upgradeable",
                value: "Proxy Pattern",
                description: "Upgradeable contracts with governance",
              },
              {
                label: "Compliance",
                value: "GDPR Ready",
                description: "Privacy-first design compliant with regulations",
              },
            ].map((spec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-card border border-border hover:border-blue-500/50 transition-colors"
              >
                <div className="text-sm text-purple-400 font-semibold mb-2">{spec.label}</div>
                <div className="text-2xl font-bold text-white mb-2">{spec.value}</div>
                <p className="text-muted-foreground text-sm">{spec.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-950/50 to-blue-950/50 w-full">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center max-w-2xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Integrate?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Explore our documentation and start building with AlgoKYC smart contracts today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                <Link href="/documentation">
                  View Documentation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <GitBranch className="mr-2 h-4 w-4" />
                  Clone Repository
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
