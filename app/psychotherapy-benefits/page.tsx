"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import BottomNavigation from "@/components/bottom-navigation";

export default function PsychotherapyBenefitsPage() {
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
        <div className="flex justify-center mb-6">
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
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <h1 className="text-2xl font-bold text-blue-700 text-center mb-4">
            Benefícios da Psicoterapia
          </h1>
          <ul className="space-y-4 text-gray-700 text-base list-disc list-inside">
            <li>Autoconhecimento e desenvolvimento pessoal.</li>
            <li>Redução do estresse, ansiedade e sintomas depressivos.</li>
            <li>Melhora da autoestima e autoconfiança.</li>
            <li>
              Fortalecimento de habilidades para lidar com desafios e emoções.
            </li>
            <li>Melhora nos relacionamentos interpessoais.</li>
            <li>Promoção do bem-estar emocional e mental.</li>
            <li>Espaço seguro para falar sobre sentimentos e dificuldades.</li>
          </ul>
          <div className="flex justify-center mt-6">
            <Button
              onClick={() => router.push("/doctors")}
              className="bg-blue-600 text-white hover:bg-blue-700 rounded-full px-8 py-3 text-lg font-medium"
            >
              Quero começar minha psicoterapia
            </Button>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
