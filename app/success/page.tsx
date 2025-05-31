"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Image from "next/image"

export default function SuccessPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-green-500 flex flex-col items-center p-6">
      <div className="w-full flex justify-center pt-8 mb-8">
        <div className="relative w-32 h-16">
          <Image
            src="/logo_cuidar_mais.png"
            alt="Cuidar+ Logo"
            width={128}
            height={64}
            className="object-contain brightness-0 invert"
            priority
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 text-white">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
            <Check className="w-12 h-12 text-green-500" />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Parabéns</h2>
          <p className="text-lg">Seu plano foi assinado com sucesso</p>
        </div>

        <Button
          onClick={() => router.push("/home")}
          className="bg-white text-green-500 hover:bg-gray-100 rounded-full px-8 py-3 font-medium"
        >
          Ir para home
        </Button>
      </div>
    </div>
  )
}
