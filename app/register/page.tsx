"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import Image from "next/image"

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword) {
      setError("Por favor, preencha todos os campos")
      return
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem")
      return
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres")
      return
    }

    const users = JSON.parse(localStorage.getItem("cuidar_users") || "[]")

    if (users.find((u: any) => u.email === email)) {
      setError("Este email já está cadastrado")
      return
    }

    const newUser = {
      name,
      email,
      password,
      plan: null,
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    localStorage.setItem("cuidar_users", JSON.stringify(users))
    localStorage.setItem("cuidar_user", JSON.stringify(newUser))

    router.push("/plans")
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex items-center justify-between p-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="cursor-pointer">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div className="text-center space-y-4">
            <div className="flex justify-center">
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
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-8">
          

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo *</label>
              <Input
                type="text"
                placeholder="Digite Seu Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-full border-gray-300 py-6 text-center"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <Input
                type="email"
                placeholder="Digite Seu Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-full border-gray-300 py-6 text-center"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Senha *</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite Sua Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-full border-gray-300 py-6 text-center w-full"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  <span className="sr-only">Mostrar senha</span>
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar Senha *</label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirme Sua Senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="rounded-full border-gray-300 py-6 text-center w-full"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  <span className="sr-only">Mostrar senha</span>
                </Button>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <Button
              onClick={handleRegister}
              className="w-full bg-black text-white hover:bg-gray-800 rounded-full py-6 text-lg font-medium"
            >
              Criar Conta
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
