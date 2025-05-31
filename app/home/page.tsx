"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Settings } from "lucide-react"
import Image from "next/image"
import BottomNavigation from "@/components/bottom-navigation"

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white flex items-center justify-between p-4 shadow-sm">
        <Button variant="ghost" size="icon" onClick={() => router.push("/plans")}>
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div className="text-center mb-6 mt-2">
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
        <Button variant="ghost" size="icon" onClick={() => router.push("/settings")}>
          <Settings className="w-6 h-6" />
        </Button>
      </div>

      <div className="flex-1 p-6">
        

        <div className="space-y-6">
          {/* Quer Relaxar */}
          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => router.push("/meditation")}
              className="relative bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl p-4 h-32 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0">
                <Image
                  src="/Quer_relaxar.png"
                  alt="Relaxation"
                  fill
                  className="object-cover opacity-70"
                />
              </div>
              <div className="relative z-10 h-full flex items-end">
                <span className="text-white font-medium text-sm">QUER RELAXAR?</span>
              </div>
            </div>

            <div
              onClick={() => router.push("/exercises")}
              className="relative bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-4 h-32 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0">
                <Image
                  src="/Bora_exercitar.png"
                  alt="Exercise"
                  fill
                  className="object-cover opacity-70"
                />
              </div>
              <div className="relative z-10 h-full flex items-end">
                <span className="text-white font-medium text-sm">BORA SE EXERCITAR?</span>
              </div>
            </div>
          </div>

          {/* Conheça nossos planos */}
          <div
            onClick={() => router.push("/plans")}
            className="bg-white rounded-2xl p-4 shadow-sm border cursor-pointer"
          >
            <span className="text-gray-700 font-medium">CONHEÇA NOSSOS PLANOS</span>
          </div>

          {/* Lembretes de Receita */}
          <div
            onClick={() => router.push("/medicine-home")}
            className="bg-white rounded-2xl p-4 shadow-sm border cursor-pointer"
          >
            <span className="text-gray-700 font-medium">LEMBRETES DE RECEITA</span>
          </div>

          {/* Quer Conversar */}
          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => router.push("/doctors")}
              className="relative bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-4 h-32 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0">
                <Image
                  src="/Conversar.png"
                  alt="Doctor"
                  fill
                  className="object-cover opacity-80"
                />
              </div>
              <div className="relative z-10 h-full flex items-end">
                <span className="text-white font-medium text-sm">QUER CONVERSAR?</span>
              </div>
            </div>

            <div
              onClick={() => router.push("/call-screen")}
              className="relative bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl p-4 h-32 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0">
                <Image
                  src="/Psicoterapia.png"
                  alt="Online therapy"
                  fill
                  className="object-cover opacity-80"
                />
              </div>
              <div className="relative z-10 h-full flex items-end">
                <span className="text-white font-medium text-sm">PSICOTERAPIA</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
