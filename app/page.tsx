"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function InitialPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem("cuidar_user")
    if (user) {
      setIsLoggedIn(true)
      router.push("/home")
    }
  }, [router])

  if (isLoggedIn) {
    return null
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-20">
            <div className="relative w-32 h-16">
              <Image
                src="/logo_cuidar_mais.png"
                alt="Cuidar+ Logo"
                width={128}
                height={64}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => router.push("/login")}
            className="w-full bg-black text-white hover:bg-gray-800 rounded-full py-6 text-lg font-medium cursor-pointer"
          >
            Entrar
          </Button>

          <Button
            onClick={() => router.push("/register")}
            variant="outline"
            className="w-full border-black text-black hover:bg-gray-50 rounded-full py-6 text-lg font-medium cursor-pointer"
          >
            Criar Conta
          </Button>
        </div>
      </div>
    </div>
  )
}
