"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = () => {
    if (!email || !password) {
      setError("Por favor, preencha todos os campos")
      return
    }

    const users = JSON.parse(localStorage.getItem("cuidar_users") || "[]")
    const user = users.find((u: any) => u.email === email && u.password === password)

    if (user) {
      localStorage.setItem("cuidar_user", JSON.stringify(user))
      router.push("/plans")
    } else {
      setError("Email ou senha incorretos")
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
            <div className="flex justify-center mb-23">
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
            <Input
              type="email"
              placeholder="Digite Seu Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-full border-gray-300 py-6 text-center"
            />

            <Input
              type="password"
              placeholder="Digite Sua Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-full border-gray-300 py-6 text-center"
            />

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <Button
              onClick={handleLogin}
              className="w-full bg-black text-white hover:bg-gray-800 rounded-full py-6 text-lg font-medium"
            >
              ENTRAR
            </Button>

            <div className="text-center">
              <Link href="/forgot-password" className="text-sm text-gray-600 underline">
                Esqueceu a senha?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
