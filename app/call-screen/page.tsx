"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone } from "lucide-react";
import Image from "next/image";
import BottomNavigation from "@/components/bottom-navigation";

export default function CallScreenPage() {
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
          <div className="relative h-48 rounded-2xl overflow-hidden">
            <Image
              src="/Psicoterapia.png"
              alt="Therapy session"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div
              onClick={() => router.push("/psychotherapy-benefits")}
              className="absolute bottom-4 left-4 right-4 cursor-pointer"
            >
              <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-center">
                <span className="text-sm font-medium">
                  CONHEÇA OS BENEFÍCIOS DA PSICOTERAPIA
                </span>
              </div>
            </div>
          </div>

          <div className="bg-green-100 rounded-2xl p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Phone className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="font-bold text-lg">
                  CHAMADA ONLINE PSICOTERAPIA
                </h3>
                <p className="text-sm text-gray-600">
                  Clique abaixo para iniciar sua sessão de psicoterapia online
                  com segurança e conforto.
                </p>
              </div>
            </div>

            <Button
              onClick={() => router.push("/doctors")}
              className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-full py-3 font-medium"
            >
              PEÇA AGORA
            </Button>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
