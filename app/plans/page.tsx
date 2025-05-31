"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Bell, Calendar, User } from "lucide-react";
import Image from "next/image";

export default function PlansPage() {
  const router = useRouter();

  const handlePlanSelect = (planType: string, price?: number) => {
    const user = JSON.parse(localStorage.getItem("cuidar_user") || "{}");

    if (planType === "basic") {
      user.plan = { type: "basic", name: "Básico", price: 0 };
      localStorage.setItem("cuidar_user", JSON.stringify(user));
      router.push("/home");
    } else {
      router.push(`/payment?plan=${planType}&price=${price}`);
    }
  };

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

      <div className="flex-1 p-6">
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="mb-4">
              <h3 className="font-bold text-lg">Básico • Gratuito</h3>
              <p className="text-sm text-gray-600 mt-2">
                Acesso aos nossos conteúdos básicos de bem-estar, meditação e
                exercícios. Chamadas de emergência rápidas.
              </p>
            </div>
            <Button
              onClick={() => handlePlanSelect("basic")}
              className="w-full bg-gray-800 text-white hover:bg-gray-700 rounded-full py-3"
            >
              Ativar
            </Button>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="mb-4">
              <h3 className="font-bold text-lg">
                Intermediário • R$ 29,90/mês
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Tudo do plano básico + Consultas ilimitadas com psicólogos.
                Agenda médica integrada.
              </p>
            </div>
            <Button
              onClick={() => handlePlanSelect("intermediate", 29.9)}
              className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-full py-3"
            >
              Ativar
            </Button>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="mb-4">
              <h3 className="font-bold text-lg">Premium • R$ 49,90/mês</h3>
              <p className="text-sm text-gray-600 mt-2">
                Tudo do plano intermediário + Acompanhamento personalizado e
                relatórios semanais para familiares.
              </p>
            </div>
            <Button
              onClick={() => handlePlanSelect("premium", 49.9)}
              className="w-full bg-gray-800 text-white hover:bg-gray-700 rounded-full py-3"
            >
              Ativar
            </Button>
          </div>
        </div>
      </div>

      
    </div>
  );
}
