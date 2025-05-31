"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pill, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import BottomNavigation from "@/components/bottom-navigation";
import Image from "next/image";

export default function MedicineHomePage() {
  const router = useRouter();
  const [userName, setUserName] = useState("João Vitor");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("cuidar_user") || "{}");
    setUserName(user.name || "Usuário");
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="bg-white flex items-center justify-between p-4 shadow-sm">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div className="flex justify-center mb-5">
          <div className="relative w-20 h-10">
            <Image
              src="/logo_cuidar_mais.png"
              alt="Cuidar+ Logo"
              width={80}
              height={40}
              className="object-contain"
            />
          </div>
        </div>
        <div className="w-10" />
      </div>

      <div className="flex-1 p-6">
        <div className="mb-8">
          <p className="text-sm text-gray-600">Boas vindas, </p>
          <h1 className="text-xl font-bold text-gray-800">{userName}</h1>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="space-y-4">
            <div
              onClick={() => router.push("/medicine-list")}
              className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl cursor-pointer hover:bg-blue-100 transition-colors"
            >
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <Pill className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">Minhas receitas</h3>
                <p className="text-sm text-gray-600">
                  Acompanhe os medicamentos e gerencie lembretes
                </p>
              </div>
              <div className="text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>

            <div
              onClick={() => router.push("/medicine-form")}
              className="flex items-center space-x-4 p-4 bg-red-50 rounded-xl cursor-pointer hover:bg-red-100 transition-colors"
            >
              <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">Nova receita</h3>
                <p className="text-sm text-gray-600">
                  Cadastre novos lembretes de receitas
                </p>
              </div>
              <div className="text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
