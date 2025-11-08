import algosdk from 'algosdk';
import type { Node, Edge } from '@xyflow/react';

export const generateCode = (nodes: Node[], edges: Edge[]): string => {
  if (nodes.length === 0) {
    return `// No nodes found in the flow. Add nodes to generate code.`;
  }
  let code = `import algosdk from 'algosdk';\n\n`;
  code += `// Connect to Algorand node (TestNet in this example)\n`;
  code += `const algodToken = 'YOUR_ALGOD_API_TOKEN';\n`;
  code += `const algodServer = 'https://testnet-api.algonode.cloud';\n`;
  code += `const algodPort = ''; // Empty for Algonode cloud\n\n`;
  code += `const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);\n\n`;

  // Generate account setups
  let storedMnemonic = "";
  try {
    const savedWallet = localStorage.getItem("algorand-wallet");
    if (savedWallet) {
      const parsedWallet = JSON.parse(savedWallet);
      if (parsedWallet && parsedWallet.mnemonic) {
        storedMnemonic = parsedWallet.mnemonic;
      }
    }
  } catch (error) {
    console.error("Error parsing wallet from localStorage:", error);
  }

  const accountNodes = nodes.filter(node => node.type === 'account');
  accountNodes.forEach(node => {
    const mnemonic = node.data.config.mnemonic || storedMnemonic || "PASTE YOUR MNEMONIC HERE";
    code += `// Account from node: ${node.data.label}\n`;
    code += `const ${node.id.replace(/-/g, '_')} = algosdk.mnemonicToSecretKey("${mnemonic}");\n`;
  });
  code += '\n';

  code += `async function main() {\n`;
  code += `    try {\n`;
  code += `        console.log('Fetching transaction parameters from network...');\n`;
  code += `        const params = await algodClient.getTransactionParams().do();\n`;
  code += `        console.log('Transaction parameters retrieved:', { firstRound: params.firstRound, fee: params.fee });\n\n`;

  // Topological sort to process nodes in correct order
  const sortedNodes = topologicalSort(nodes, edges);

  for (const node of sortedNodes) {
    const sourceEdges = edges.filter(edge => edge.target === node.id);
    const sourceNodes = sourceEdges.map(edge => nodes.find(n => n.id === edge.source));

    switch (node.type) {
      case "payment": {
        const senderNode = sourceNodes.find(n => n?.type === 'account');
        if (!senderNode) continue;
        const receiver = node.data.config.receiver || "RECEIVER_ALGORAND_ADDRESS";
        const amount = (node.data.config.amount || 0) * 1000000; // Algos to microAlgos
        code += `        console.log('Creating payment transaction: ${node.data.config.amount} ALGO to ${receiver}');\n`;
        code += `        const txn_${node.id.replace(/-/g, '_')} = algosdk.makePaymentTxnWithSuggestedParamsFromObject({\n`;
        code += `            sender: ${senderNode.id.replace(/-/g, '_')}.addr,\n`;
        code += `            receiver: "${receiver}",\n`;
        code += `            amount: ${amount}, // ${node.data.config.amount} ALGO\n`;
        code += `            suggestedParams: params\n`;
        code += `        });\n`;
        code += `        console.log('Payment transaction created');\n\n`;
        break;
      }
      case "assetCreate": {
        const creatorNode = sourceNodes.find(n => n?.type === 'account');
        if (!creatorNode) continue;
        const total = node.data.config.total || 1000000;
        const decimals = node.data.config.decimals || 0;
        const unitName = node.data.config.unitName || "MYASA";
        const assetName = node.data.config.assetName || "My Custom Token";
        code += `        console.log('Creating ASA: ${assetName} (${unitName}), Total: ${total}');\n`;
        code += `        const txn_${node.id.replace(/-/g, '_')} = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({\n`;
        code += `            from: ${creatorNode.id.replace(/-/g, '_')}.addr,\n`;
        code += `            total: ${total},\n`;
        code += `            decimals: ${decimals},\n`;
        code += `            defaultFrozen: false,\n`;
        code += `            unitName: "${unitName}",\n`;
        code += `            assetName: "${assetName}",\n`;
        code += `            manager: ${creatorNode.id.replace(/-/g, '_')}.addr,\n`;
        code += `            reserve: ${creatorNode.id.replace(/-/g, '_')}.addr,\n`;
        code += `            freeze: ${creatorNode.id.replace(/-/g, '_')}.addr,\n`;
        code += `            clawback: ${creatorNode.id.replace(/-/g, '_')}.addr,\n`;
        code += `            suggestedParams: params\n`;
        code += `        });\n`;
        code += `        console.log('ASA creation transaction created');\n\n`;
        break;
      }
      case "assetTransfer": {
        const senderNode = sourceNodes.find(n => n?.type === 'account');
        if (!senderNode) continue;
        const receiver = node.data.config.receiver || "RECEIVER_ALGORAND_ADDRESS";
        const amount = node.data.config.amount || 0;
        const assetID = node.data.config.assetId || 0;
        code += `        console.log('Creating asset transfer: ${amount} units of asset ${assetID}');\n`;
        code += `        const txn_${node.id.replace(/-/g, '_')} = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({\n`;
        code += `            from: ${senderNode.id.replace(/-/g, '_')}.addr,\n`;
        code += `            to: "${receiver}",\n`;
        code += `            assetIndex: ${assetID}, // ASA ID\n`;
        code += `            amount: ${amount},\n`;
        code += `            suggestedParams: params\n`;
        code += `        });\n`;
        code += `        console.log('Asset transfer transaction created');\n\n`;
        break;
      }
      case "assetFreeze": {
        const freezeAccountNode = sourceNodes.find(n => n?.type === 'account');
        if (!freezeAccountNode) continue;
        const assetID = node.data.config.assetId || 0;
        const targetAccount = node.data.config.freezeTarget || "TARGET_ALGORAND_ADDRESS";
        const freezeState = node.data.config.freezeState ? "true" : "false";
        code += `        console.log('Creating asset freeze transaction for asset ${assetID}');\n`;
        code += `        const txn_${node.id.replace(/-/g, '_')} = algosdk.makeAssetFreezeTxnWithSuggestedParamsFromObject({\n`;
        code += `            from: ${freezeAccountNode.id.replace(/-/g, '_')}.addr,\n`;
        code += `            assetIndex: ${assetID},\n`;
        code += `            freezeTarget: "${targetAccount}",\n`;
        code += `            freezeState: ${freezeState},\n`;
        code += `            suggestedParams: params\n`;
        code += `        });\n`;
        code += `        console.log('Asset freeze transaction created');\n\n`;
        break;
      }
      case "keyReg": {
        const accountNode = sourceNodes.find(n => n?.type === 'account');
        if (!accountNode) continue;
        code += `        console.log('Creating key registration transaction');\n`;
        code += `        const txn_${node.id.replace(/-/g, '_')} = algosdk.makeKeyRegistrationTxnWithSuggestedParamsFromObject({\n`;
        code += `            from: ${accountNode.id.replace(/-/g, '_')}.addr,\n`;
        code += `            voteKey: new Uint8Array(32),\n`;
        code += `            selectionKey: new Uint8Array(32),\n`;
        code += `            voteFirst: params.firstRound,\n`;
        code += `            voteLast: params.lastRound + 1000,\n`;
        code += `            voteKeyDilution: 10,\n`;
        code += `            suggestedParams: params\n`;
        code += `        });\n`;
        code += `        console.log('Key registration transaction created');\n\n`;
        break;
      }
      case "signTxn": {
        const txnNodes = sourceNodes.filter(n => ['payment', 'assetTransfer', 'assetCreate', 'assetFreeze', 'keyReg'].includes(n?.type || ''));
        if (txnNodes.length === 0) continue;
        const senderNode = accountNodes.find(acc => edges.some(edge => edge.source === acc.id && edge.target === txnNodes[0]?.id));
        if (!senderNode) continue;

        code += `        console.log('Signing transaction...');\n`;
        code += `        const signedTxn_${node.id.replace(/-/g, '_')} = txn_${txnNodes[0]?.id.replace(/-/g, '_')}.signTxn(${senderNode.id.replace(/-/g, '_')}.sk);\n`;
        code += `        console.log('Transaction signed by ${senderNode.data.label}');\n\n`;
        break;
      }
      case "executeTxn": {
        const signedTxnNodes = sourceNodes.filter(n => n?.type === 'signTxn');
        if (signedTxnNodes.length === 0) continue;

        code += `        console.log('Sending transaction to network...');\n`;
        code += `        const { txId } = await algodClient.sendRawTransaction(signedTxn_${signedTxnNodes[0]?.id.replace(/-/g, '_')}).do();\n`;
        code += `        console.log('Transaction sent! TX ID:', txId);\n`;
        code += `        console.log('View: https://testnet.algoexplorer.io/tx/' + txId);\n`;
        code += `        console.log('Waiting for confirmation...');\n`;
        code += `        const confirmedTxn = await algosdk.waitForConfirmation(algodClient, txId, 4);\n`;
        code += `        console.log('Confirmed in round:', confirmedTxn['confirmed-round']);\n`;
        code += `        console.log('Transaction details:', confirmedTxn);\n\n`;
        break;
      }
    }
  }

  code += `    } catch (error) {\n`;
  code += `        console.error('Error:', error.message);\n`;
  code += `        if (error.response) console.error('Response:', error.response);\n`;
  code += `        throw error;\n`;
  code += `    }\n`;
  code += `}\n\n`;
  code += `main().catch(error => {\n`;
  code += `    console.error('Fatal error:', error);\n`;
  code += `    process.exit(1);\n`;
  code += `});\n`;

  return code;
};

const topologicalSort = (nodes: Node[], edges: Edge[]): Node[] => {
  const sorted: Node[] = [];
  const inDegree = new Map<string, number>();
  const adj = new Map<string, string[]>();

  for (const node of nodes) {
    inDegree.set(node.id, 0);
    adj.set(node.id, []);
  }

  for (const edge of edges) {
    adj.get(edge.source)?.push(edge.target);
    inDegree.set(edge.target, (inDegree.get(edge.target) || 0) + 1);
  }

  const queue = nodes.filter(node => inDegree.get(node.id) === 0);

  while (queue.length > 0) {
    const u = queue.shift()!;
    sorted.push(u);

    adj.get(u.id)?.forEach(vId => {
      inDegree.set(vId, (inDegree.get(vId) || 0) - 1);
      if (inDegree.get(vId) === 0) {
        const node = nodes.find(n => n.id === vId);
        if (node) queue.push(node);
      }
    });
  }

  return sorted;
};