"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleResetPassword = () => {
    if (!email) {
      setMessage("Por favor, digite seu email")
      return
    }

    const users = JSON.parse(localStorage.getItem("cuidar_users") || "[]")
    const user = users.find((u: any) => u.email === email)

    if (user) {
      setMessage("Instruções de recuperação enviadas para seu email!")
    } else {
      setMessage("Email não encontrado")
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex items-center justify-between p-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="cursor-pointer">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
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
            <div>
              <h1 className="text-2xl font-bold text-black">Recuperar Senha</h1>
              <p className="text-sm text-gray-600 mt-2">Digite seu email para recuperar a senha</p>
            </div>
          </div>

          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Digite Seu Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-full border-gray-300 py-6 text-center"
            />

            {message && (
              <p className={`text-sm text-center ${message.includes("enviadas") ? "text-green-600" : "text-red-500"}`}>
                {message}
              </p>
            )}

            <Button
              onClick={handleResetPassword}
              className="w-full bg-black text-white hover:bg-gray-800 rounded-full py-6 text-lg font-medium"
            >
              Enviar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
