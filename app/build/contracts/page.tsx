"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import BlockPicker from "@/components/BlockPicker"
import CodePreview from "@/components/CodePreview"
import "../../blockly-custom.css"

const BlockWorkspace = dynamic(() => import("@/components/BlockWorkspace"), { ssr: false })

export default function ContractsPage() {
  const [toolboxXml, setToolboxXml] = useState<string>("")
  const [xml, setXml] = useState<string>("")
  const [code, setCode] = useState<string>("// Build your contract using blocks")



  return (
    <div style={{ 
      display: "flex", 
      height: "100vh", 
      background: "#0b0b0b", 
      minWidth: 0,
      color: "#fff" 
    }}>
      <BlockPicker onToolboxXml={setToolboxXml} />
      
      <div style={{ flex: 1, position: "relative" }}>
        <BlockWorkspace 
          toolboxXml={toolboxXml} 
          onXmlChanged={setXml} 
          onJsChanged={setCode} 
        />
      </div>

      <div style={{ 
        width: 500, 
        borderLeft: "1px solid #222", 
        background: "#111" 
      }}>
        <CodePreview xml={xml} code={code} />
      </div>
    </div>
  )
}
