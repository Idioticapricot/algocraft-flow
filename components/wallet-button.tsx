"use client"

import { useState, useEffect } from "react"
import { WalletIcon } from "lucide-react"
import algosdk from "algosdk"

interface Wallet {
  address: string
  balance: number
  privateKey: string
  mnemonic: string
  transactions: any[]
  algoPrice: number
}

interface WalletButtonProps {
  onWalletChange?: (wallet: Wallet | null) => void
  onTogglePanel?: () => void
}

export function WalletButton({ onWalletChange, onTogglePanel }: WalletButtonProps) {
  const [wallet, setWallet] = useState<Wallet | null>(null)

  useEffect(() => {
    const savedWallet = localStorage.getItem("algorand-wallet")
    if (savedWallet) {
      try {
        const parsedWallet = JSON.parse(savedWallet)
        if (parsedWallet && typeof parsedWallet.address === 'string') {
          setWallet(parsedWallet)
          onWalletChange?.(parsedWallet)
        } else {
          localStorage.removeItem("algorand-wallet")
        }
      } catch (error) {
        console.error("Error parsing wallet:", error)
        localStorage.removeItem("algorand-wallet")
      }
    }
  }, [])

  const createWallet = async () => {
    try {
      const account = algosdk.generateAccount()

      const newWallet = {
        address: account.addr.toString(),
        balance: 0,
        privateKey: algosdk.secretKeyToMnemonic(account.sk),
        mnemonic: algosdk.secretKeyToMnemonic(account.sk),
        transactions: [],
        algoPrice: 0,
      }

      setWallet(newWallet)
      localStorage.setItem("algorand-wallet", JSON.stringify(newWallet))
      onWalletChange?.(newWallet)
      
      console.log("Wallet created! To fund with test ALGO, visit:")
      console.log(`https://testnet.algoexplorer.io/dispenser?addr=${newWallet.address}`)
    } catch (error) {
      console.error("Error creating wallet:", error)
    }
  }

  return (
    <>
      {wallet && wallet.address ? (
        <button
          onClick={onTogglePanel}
          className="px-3 py-1.5 rounded text-xs font-medium transition-colors"
          style={{ backgroundColor: "var(--button-color)", color: "var(--text-color)" }}
        >
          <WalletIcon className="h-3 w-3 inline mr-1" />
          {`${String(wallet.address.substring(0, 10))}...`}
        </button>
      ) : (
        <button
          onClick={createWallet}
          className="px-3 py-1.5 rounded text-xs font-medium transition-colors"
          style={{ backgroundColor: "var(--button-color)", color: "var(--text-color)" }}
        >
          <WalletIcon className="h-3 w-3 inline mr-1" />
          Create Wallet
        </button>
      )}
    </>
  )
}
