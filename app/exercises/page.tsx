"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import BottomNavigation from "@/components/bottom-navigation";

export default function ExercisesPage() {
  const router = useRouter();

  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("cuidar_user") || "{}");
    setUserName(user.name || "Usuário");
  }, []);

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
        <div className="mb-8">
          <p className="text-sm text-gray-600">Boas vindas,</p>
          <h1 className="text-xl font-bold text-gray-800">{userName}</h1>
        </div>

        <div className="space-y-6">
          <div
            onClick={() => router.push("/video-class")}
            className="relative h-48 rounded-2xl overflow-hidden cursor-pointer"
          >
            <Image
              src="/Assistir_exercicio.png"
              alt="Elderly people exercising"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-green-600 text-white px-4 py-2 rounded-full text-center">
                <span className="text-sm font-medium">
                  CLIQUE AQUI PARA ASSISTIR EXERCÍCIOS
                </span>
              </div>
            </div>
          </div>

          <div
            onClick={() => router.push("/doctors")}
            className="relative h-48 rounded-2xl overflow-hidden cursor-pointer"
          >
            <Image
              src="/sessao_terapia.png"
              alt="Medical consultation"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-center">
                <span className="text-sm font-medium">
                  CLIQUE AQUI PARA REALIZAR CONSULTAS MÉDICAS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
