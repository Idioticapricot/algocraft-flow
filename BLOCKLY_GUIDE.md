# Blockly Visual Contract Builder Guide

## Overview

The Blockly-based visual contract builder is located at `/build/contracts` and provides a drag-and-drop interface for building Algorand smart contracts.

## Architecture

### Components

1. **BlockPicker.tsx** - Left column toolbox that loads and displays available blocks
2. **BlockWorkspace.tsx** - Center workspace where users drag and drop blocks
3. **CodePreview.tsx** - Right column showing generated TypeScript/JavaScript code

### File Structure

```
components/
├── BlockPicker.tsx       # Toolbox component
├── BlockWorkspace.tsx    # Main workspace component
└── CodePreview.tsx       # Code preview component

app/build/contracts/
└── page.tsx              # Main page wiring components together

public/examples/
└── blocks.json           # Block definitions

examples/
└── blocks.json           # Source block definitions
```

## Adding New Blocks

### Step 1: Define Block in JSON

Edit `examples/blocks.json` (or `public/examples/blocks.json`) and add your block definition:

```json
{
  "type": "my_new_block",
  "message0": "My Block %1 input %2",
  "args0": [
    { "type": "input_dummy" },
    { "type": "input_value", "name": "INPUT", "check": "String" }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "Description of what this block does",
  "helpUrl": ""
}
```

### Step 2: Register Code Generator

Edit `components/BlockPicker.tsx` and add a generator function:

```typescript
// Add this in the useEffect where other generators are defined
javascriptGenerator.forBlock["my_new_block"] = function(block: any) {
  const input = javascriptGenerator.valueToCode(block, "INPUT", Order.ATOMIC) || '""'
  const code = `// My New Block\nawait myNewFunction(${input});\n`
  return code
}
```

### Step 3: Add to Toolbox Category

In `components/BlockPicker.tsx`, add your block to a category:

```typescript
const categories = [
  {
    name: "Core",
    colour: "230",
    blocks: ["app_create", "app_call", "my_new_block"] // Add here
  },
  // ... other categories
]
```

### Step 4: Copy to Public Folder

```bash
copy examples\blocks.json public\examples\blocks.json
```

## Block Types

### Statement Blocks
Blocks that execute actions (have previous/next connections):
```json
{
  "previousStatement": null,
  "nextStatement": null
}
```

### Value Blocks
Blocks that return values (have output):
```json
{
  "output": "String"  // or "Number", null for any type
}
```

### Input Types

- `input_dummy` - No input, just a label
- `input_value` - Accepts another block as input
- `field_input` - Text input field
- `field_number` - Number input field
- `field_dropdown` - Dropdown selection

## Example: Creating a Custom Block

### 1. Define the Block

```json
{
  "type": "send_asset",
  "message0": "Send Asset %1 to %2 amount %3",
  "args0": [
    { "type": "input_value", "name": "ASSET_ID", "check": "Number" },
    { "type": "input_value", "name": "RECEIVER", "check": "String" },
    { "type": "input_value", "name": "AMOUNT", "check": "Number" }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 160,
  "tooltip": "Send an asset to an address",
  "helpUrl": ""
}
```

### 2. Add Generator

```typescript
javascriptGenerator.forBlock["send_asset"] = function(block: any) {
  const assetId = javascriptGenerator.valueToCode(block, "ASSET_ID", Order.ATOMIC) || "0"
  const receiver = javascriptGenerator.valueToCode(block, "RECEIVER", Order.ATOMIC) || '""'
  const amount = javascriptGenerator.valueToCode(block, "AMOUNT", Order.ATOMIC) || "0"
  
  const code = `
// Send Asset Transaction
const assetTransferTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
  from: senderAddress,
  to: ${receiver},
  assetIndex: ${assetId},
  amount: ${amount},
  suggestedParams: params
});
await algodClient.sendRawTransaction(assetTransferTxn.toByte()).do();
`
  return code
}
```

## Features

### Persistence
- Workspace automatically saves to localStorage under `vcontract:workspace`
- Workspace is restored on page reload

### Export/Import
- Export generated code as `.js` file
- Export workspace as `.xml` file for sharing/backup
- Copy code to clipboard

### Mouse Wheel Behavior
- Mouse wheel scrolls/pans the workspace (does not zoom)
- Use zoom controls in the workspace for zooming

### Dark Theme
- Custom dark theme applied to workspace
- Black background (#0b0b0b)
- Readable block colors

## Troubleshooting

### Blocks not appearing
1. Check browser console for errors
2. Verify `blocks.json` is in `public/examples/` folder
3. Ensure block definitions are valid JSON

### Code not generating
1. Check that generator is registered in `BlockPicker.tsx`
2. Verify block type matches between JSON and generator
3. Check browser console for generator errors

### SSR Errors
- `BlockWorkspace` uses dynamic import with `ssr: false`
- Blockly is only loaded client-side in `useEffect`

## Commands

```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm start
```

## Files Changed

1. `app/build/contracts/page.tsx` - Main page component
2. `components/BlockPicker.tsx` - New component
3. `components/BlockWorkspace.tsx` - New component
4. `components/CodePreview.tsx` - New component
5. `examples/blocks.json` - New block definitions
6. `public/examples/blocks.json` - Public block definitions
7. `app/globals.css` - Removed commented CSS imports
8. `package.json` - Added blockly dependency

## Next Steps

1. Add more Algorand-specific blocks (asset operations, state management, etc.)
2. Implement full TypeScript contract generation
3. Add block validation and error checking
4. Create block templates for common patterns
5. Add import workspace XML functionality
