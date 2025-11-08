"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FlowBuilder } from "@/components/flow-builder"
import { Terminal } from "@/components/terminal"
import { toast } from "@/hooks/use-toast"
import { Code, Zap, Home, Play, Download, Trash2, TerminalIcon } from "lucide-react"
import Link from "next/link"

export default function BuildPage() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("smart-contracts")
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  const [selectedNode, setSelectedNode] = useState(null)

  const handleRun = () => {
    toast({
      title: "Running Flow",
      description: "Your Algorand flow is being executed...",
      duration: 3000,
    })
  }

  return (
    <div className="h-screen w-screen bg-black flex flex-col overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-700 z-50">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild className="text-white hover:bg-gray-800">
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold text-white">AlgoFLOW Builder</h1>
            <p className="text-sm text-gray-400">Create Algorand applications visually</p>
          </div>
        </div>
        <Button onClick={handleRun} className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6">
          <Play className="h-4 w-4 mr-2" />
          Run Flow
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <div className="px-4 py-2 bg-gray-900 border-b border-gray-700 flex items-center justify-center gap-8">
            <TabsList className="grid w-full max-w-md grid-cols-2 bg-slate-800/50 backdrop-blur-lg">
              <TabsTrigger value="smart-contracts" className="data-[state=active]:bg-blue-600">
                <Code className="h-4 w-4 mr-2" />
                Smart Contracts
              </TabsTrigger>
              <TabsTrigger value="transactions" className="data-[state=active]:bg-gray-600">
                <Zap className="h-4 w-4 mr-2" />
                Transactions
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              {/* Export Button */}
              <Button
                onClick={() => {
                  const flowData = {
                    nodes: nodes,
                    edges: edges,
                    type: activeTab,
                    timestamp: new Date().toISOString(),
                  }
                  const dataStr = JSON.stringify(flowData, null, 2)
                  const dataBlob = new Blob([dataStr], { type: "application/json" })
                  const url = URL.createObjectURL(dataBlob)
                  const link = document.createElement("a")
                  link.href = url
                  link.download = `algoflow-${activeTab}-${Date.now()}.json`
                  link.click()
                  URL.revokeObjectURL(url)
                  toast({
                    title: "Flow Exported",
                    description: "Your flow has been exported as JSON file",
                    duration: 3000,
                  })
                }}
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                title="Export Flow"
              >
                <Download className="h-4 w-4" />
              </Button>

              {/* Delete Button */}
              <Button
                onClick={() => {
                  if (selectedNode) {
                    setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id))
                    setEdges((eds) =>
                      eds.filter((edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id),
                    )
                    setSelectedNode(null)
                    toast({
                      title: "Node Deleted",
                      description: "Selected node has been removed",
                      duration: 2000,
                    })
                  } else {
                    toast({
                      title: "No Node Selected",
                      description: "Please select a node to delete",
                      duration: 2000,
                    })
                  }
                }}
                size="sm"
                className="bg-red-600 hover:bg-red-700"
                title="Delete Selected Node"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="smart-contracts" className="flex-1 m-0 overflow-hidden">
            <FlowBuilder
              type="smart-contract"
              key="smart-contract"
              onNodesChange={setNodes}
              onEdgesChange={setEdges}
              onNodeSelect={setSelectedNode}
            />
          </TabsContent>

          <TabsContent value="transactions" className="flex-1 m-0 overflow-hidden">
            <FlowBuilder
              type="transaction"
              key="transaction"
              onNodesChange={setNodes}
              onEdgesChange={setEdges}
              onNodeSelect={setSelectedNode}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Terminal Toggle Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsTerminalOpen(!isTerminalOpen)}
          className={`px-4 py-2 rounded-lg shadow-lg transition-all duration-200 ${
            isTerminalOpen
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-800/90 hover:bg-gray-700/90 text-gray-300 hover:text-white backdrop-blur-lg border border-gray-600"
          }`}
          size="sm"
        >
          <TerminalIcon className="h-4 w-4 mr-2" />
          Terminal
        </Button>
      </div>

      {/* Terminal */}
      <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
    </div>
  )
}
