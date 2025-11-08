"use client"

import { useState } from "react"
import { useWallet } from "@txnlab/use-wallet-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { toast } from "react-toastify"
import ConnectWalletModal from "./connect-wallet-modal"

export function ConnectWalletButton() {
  const { activeAccount, wallets } = useWallet()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleDisconnect = async () => {
    try {
      for (const wallet of wallets) {
        if (wallet.isConnected) {
          await wallet.disconnect()
        }
      }
      toast.success("Disconnected from all wallets")
    } catch (error) {
      console.error(error)
      toast.error("Failed to disconnect wallets")
    }
  }

  if (!activeAccount) {
    return (
      <>
        <Button
          onClick={openModal}
          className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground"
        >
          Connect Wallet
        </Button>
        <ConnectWalletModal wallets={wallets} isOpen={isModalOpen} onClose={closeModal} />
      </>
    )
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground">
            {`${activeAccount.address.slice(0, 4)}...${activeAccount.address.slice(-4)}`}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={openModal}>Switch Wallet</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDisconnect} className="text-destructive focus:text-destructive">
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConnectWalletModal wallets={wallets} isOpen={isModalOpen} onClose={closeModal} />
    </>
  )
}
