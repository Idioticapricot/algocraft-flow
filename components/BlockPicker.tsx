"use client"

import React, { useEffect, useState } from "react"

export default function BlockPicker({ 
  onToolboxXml 
}: { 
  onToolboxXml: (xml: string) => void 
}) {
  const [toolboxXml, setToolboxXml] = useState<string>("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const Blockly = await import("blockly")
        
        // Load block definitions from examples/blocks.json
        const response = await fetch("/examples/blocks.json")
        const blockDefs = await response.json()
        
        // Define blocks with JSON
        Blockly.defineBlocksWithJsonArray(blockDefs)
        
        // Register generators
        const { javascriptGenerator, Order } = await import("blockly/javascript")
        
        // Generator for app_create
        javascriptGenerator.forBlock["app_create"] = function(block: any) {
          const name = javascriptGenerator.valueToCode(block, "NAME", Order.ATOMIC) || '""'
          const details = javascriptGenerator.valueToCode(block, "DETAILS", Order.ATOMIC) || '""'
          const pricing = javascriptGenerator.valueToCode(block, "PRICING", Order.ATOMIC) || "0"
          const code = `// Create Application\nawait createApplication(${name}, ${details}, ${pricing});\n`
          return code
        }
        
        // Generator for app_call
        javascriptGenerator.forBlock["app_call"] = function(block: any) {
          const appId = javascriptGenerator.valueToCode(block, "APP_ID", Order.ATOMIC) || "0"
          const method = javascriptGenerator.valueToCode(block, "METHOD", Order.ATOMIC) || '""'
          const code = `// Call Application\nawait callApplication(${appId}, ${method});\n`
          return code
        }
        
        // Generator for inner_payment
        javascriptGenerator.forBlock["inner_payment"] = function(block: any) {
          const receiver = javascriptGenerator.valueToCode(block, "RECEIVER", Order.ATOMIC) || '""'
          const amount = javascriptGenerator.valueToCode(block, "AMOUNT", Order.ATOMIC) || "0"
          const code = `// Payment Transaction\nawait makePayment(${receiver}, ${amount});\n`
          return code
        }
        
        // Generator for asset_config
        javascriptGenerator.forBlock["asset_config"] = function(block: any) {
          const assetName = javascriptGenerator.valueToCode(block, "ASSET_NAME", Order.ATOMIC) || '""'
          const total = javascriptGenerator.valueToCode(block, "TOTAL", Order.ATOMIC) || "0"
          const decimals = javascriptGenerator.valueToCode(block, "DECIMALS", Order.ATOMIC) || "0"
          const code = `// Configure Asset\nawait configureAsset(${assetName}, ${total}, ${decimals});\n`
          return code
        }
        
        // Generator for global_state
        javascriptGenerator.forBlock["global_state"] = function(block: any) {
          const key = javascriptGenerator.valueToCode(block, "KEY", Order.ATOMIC) || '""'
          const code = `getGlobalState(${key})`
          return [code, Order.FUNCTION_CALL]
        }
        
        // Generator for local_state
        javascriptGenerator.forBlock["local_state"] = function(block: any) {
          const account = javascriptGenerator.valueToCode(block, "ACCOUNT", Order.ATOMIC) || '""'
          const key = javascriptGenerator.valueToCode(block, "KEY", Order.ATOMIC) || '""'
          const code = `getLocalState(${account}, ${key})`
          return [code, Order.FUNCTION_CALL]
        }
        
        // Generator for text_value
        javascriptGenerator.forBlock["text_value"] = function(block: any) {
          const text = block.getFieldValue("TEXT")
          const code = `"${text}"`
          return [code, Order.ATOMIC]
        }
        
        // Generator for number_value
        javascriptGenerator.forBlock["number_value"] = function(block: any) {
          const num = block.getFieldValue("NUM")
          const code = String(num)
          return [code, Order.ATOMIC]
        }
        
        // Build toolbox XML with categories
        const categories = [
          {
            name: "Core",
            colour: "230",
            blocks: ["app_create", "app_call"]
          },
          {
            name: "Transactions",
            colour: "160",
            blocks: ["inner_payment", "asset_config"]
          },
          {
            name: "State",
            colour: "290",
            blocks: ["global_state", "local_state"]
          },
          {
            name: "Values",
            colour: "160",
            blocks: ["text_value", "number_value"]
          }
        ]

        const xml = `<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">` +
          categories.map(cat => 
            `<category name="${cat.name}" colour="${cat.colour}">` + 
            cat.blocks.map(b => `<block type="${b}"></block>`).join("") + 
            `</category>`
          ).join("") +
          `</xml>`

        setToolboxXml(xml)
        onToolboxXml(xml)
        setLoading(false)
      } catch (error) {
        console.error("Failed to load blocks:", error)
        setLoading(false)
      }
    })()
  }, [onToolboxXml])

  return null
}
