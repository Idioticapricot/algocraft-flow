"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function BuildPage() {
  const router = useRouter()

  useEffect(() => {
    router.push("/build/transactions")
  }, [])

  return null
}