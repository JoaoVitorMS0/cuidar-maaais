"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import BottomNavigation from "@/components/bottom-navigation";
import Image from "next/image";

export default function MeditationPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white flex items-center justify-between p-4 shadow-sm">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
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

      <div className="flex-1 p-6">
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <h3 className="font-bold text-lg mb-4">Sessões de Relaxamento</h3>

            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-xl">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <Play className="w-6 h-6 text-white cursor-pointer" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Meditação Matinal</h4>
                  <p className="text-sm text-gray-600">
                    10 minutos • Iniciante
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <Play className="w-6 h-6 text-white cursor-pointer" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Respiração Profunda</h4>
                  <p className="text-sm text-gray-600">
                    5 minutos • Todos os níveis
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <Play className="w-6 h-6 text-white cursor-pointer" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Relaxamento Noturno</h4>
                  <p className="text-sm text-gray-600">
                    15 minutos • Intermediário
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl p-6 text-white">
            <h3 className="font-bold text-lg mb-2">Dica do Dia</h3>
            <p className="text-sm">
              Reserve 10 minutos do seu dia para praticar a respiração
              consciente. Isso pode reduzir significativamente os níveis de
              estresse.
            </p>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
