"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"

interface RouteGuardProps {
  children: React.ReactNode
}

export function RouteGuard({ children }: RouteGuardProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a1428] via-[#1a2d4d] to-[#0a1428] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#00d4ff] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#00d4ff] font-semibold">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}