"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import BottomNavigation from "@/components/bottom-navigation";

export default function VideoClassPage() {
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
          <div className="relative h-48 rounded-2xl overflow-hidden bg-black">
            <Image
              src="/Video_exercicio_1.png"
              alt="Exercise video 1"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                size="icon"
                className="w-16 h-16 rounded-full bg-white/80 hover:bg-white"
              >
                <Play className="w-8 h-8 text-black" />
              </Button>
            </div>
            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
              5:30
            </div>
          </div>

          <div className="relative h-48 rounded-2xl overflow-hidden bg-black">
            <Image
              src="/Video_exercicio_2.png"
              alt="Exercise video 2"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                size="icon"
                className="w-16 h-16 rounded-full bg-white/80 hover:bg-white"
              >
                <Play className="w-8 h-8 text-black" />
              </Button>
            </div>
            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
              8:15
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
