"use client"

import React, { useEffect, useRef } from "react"

export default function BlockWorkspace({ 
  toolboxXml, 
  onXmlChanged, 
  onJsChanged 
}: {
  toolboxXml: string
  onXmlChanged?: (xml: string) => void
  onJsChanged?: (code: string) => void
}) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const workspaceRef = useRef<any>(null)

  useEffect(() => {
    let mounted = true
    let changeListener: any = null

    ;(async () => {
      if (!containerRef.current) return

      const Blockly = await import("blockly")
      const { javascriptGenerator } = await import("blockly/javascript")

      const options = {
        toolbox: toolboxXml,
        grid: { 
          spacing: 20, 
          length: 2, 
          colour: "#333", 
          snap: true 
        },
        zoom: { 
          controls: true, 
          wheel: false, 
          startScale: 1, 
          maxScale: 3, 
          minScale: 0.3 
        },
        move: { 
          scrollbars: true, 
          drag: true, 
          wheel: true 
        },
        renderer: "geras",
        theme: Blockly.Theme.defineTheme("dark", {
          base: Blockly.Themes.Classic,
          componentStyles: {
            workspaceBackgroundColour: "#0b0b0b",
            toolboxBackgroundColour: "#111",
            toolboxForegroundColour: "#fff",
            flyoutBackgroundColour: "#1a1a1a",
            flyoutForegroundColour: "#ccc",
            flyoutOpacity: 0.9,
            scrollbarColour: "#444",
            insertionMarkerColour: "#fff",
            insertionMarkerOpacity: 0.3,
            scrollbarOpacity: 0.4,
            cursorColour: "#d0d0d0",
          },
        }),
      }

      if (!mounted) return
      workspaceRef.current = Blockly.inject(containerRef.current, options)

      // Load persisted xml if exists
      const stored = localStorage.getItem("vcontract:workspace")
      if (stored) {
        try {
          const xmlDom = Blockly.utils.xml.textToDom(stored)
          Blockly.Xml.domToWorkspace(xmlDom, workspaceRef.current)
        } catch (e) {
          console.warn("load workspace failed", e)
        }
      }

      const onChange = () => {
        if (!workspaceRef.current) return
        
        const xml = Blockly.Xml.domToPrettyText(
          Blockly.Xml.workspaceToDom(workspaceRef.current)
        )
        onXmlChanged?.(xml)

        // Generate TS/JS code
        try {
          const code = javascriptGenerator.workspaceToCode(workspaceRef.current)
          onJsChanged?.(code || "// No blocks yet")
        } catch (err) {
          onJsChanged?.("// Build error: " + err)
        }

        // Persist
        localStorage.setItem("vcontract:workspace", xml)
      }

      changeListener = workspaceRef.current.addChangeListener(onChange)
      
      // Initial generation
      onChange()
    })()

    return () => {
      mounted = false
      if (changeListener && workspaceRef.current) {
        workspaceRef.current.removeChangeListener(changeListener)
      }
      if (workspaceRef.current) {
        workspaceRef.current.dispose()
        workspaceRef.current = null
      }
    }
  }, [toolboxXml, onXmlChanged, onJsChanged])

  return (
    <div 
      style={{ height: "100%", width: "100%", background: "#0b0b0b" }} 
      ref={containerRef} 
    />
  )
}
