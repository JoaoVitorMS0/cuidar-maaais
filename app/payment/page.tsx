"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CreditCard, Smartphone, Wallet } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");
  const price = searchParams.get("price");
  const [selectedPayment, setSelectedPayment] = useState("");

  const planNames = {
    intermediate: "Intermediário",
    premium: "Premium",
  };

  const handlePayment = () => {
    if (!selectedPayment) {
      alert("Selecione uma forma de pagamento");
      return;
    }

    const user = JSON.parse(localStorage.getItem("cuidar_user") || "{}");
    user.plan = {
      type: plan,
      name: planNames[plan as keyof typeof planNames],
      price: Number.parseFloat(price || "0"),
    };
    localStorage.setItem("cuidar_user", JSON.stringify(user));

    router.push("/success");
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
        <div className="bg-white rounded-2xl p-6 shadow-sm border mb-6">
          <h3 className="font-bold text-lg mb-2">
            Plano {planNames[plan as keyof typeof planNames]}
          </h3>
          <p className="text-2xl font-bold text-green-600">R$ {price}/mês</p>
        </div>

        <div className="space-y-4 mb-8">
          <h3 className="font-bold text-lg">Formas de Pagamento</h3>

          <div className="space-y-3">
            <Button
              variant={selectedPayment === "credit" ? "default" : "outline"}
              onClick={() => setSelectedPayment("credit")}
              className="w-full justify-start p-4 h-auto"
            >
              <CreditCard className="w-5 h-5 mr-3" />
              Cartão de Crédito
            </Button>

            <Button
              variant={selectedPayment === "debit" ? "default" : "outline"}
              onClick={() => setSelectedPayment("debit")}
              className="w-full justify-start p-4 h-auto"
            >
              <CreditCard className="w-5 h-5 mr-3" />
              Cartão de Débito
            </Button>

            <Button
              variant={selectedPayment === "paypal" ? "default" : "outline"}
              onClick={() => setSelectedPayment("paypal")}
              className="w-full justify-start p-4 h-auto"
            >
              <Smartphone className="w-5 h-5 mr-3" />
              PayPal
            </Button>

            <Button
              variant={selectedPayment === "googlepay" ? "default" : "outline"}
              onClick={() => setSelectedPayment("googlepay")}
              className="w-full justify-start p-4 h-auto"
            >
              <Wallet className="w-5 h-5 mr-3" />
              Google Pay
            </Button>
          </div>
        </div>

        {selectedPayment === "credit" || selectedPayment === "debit" ? (
          <div className="space-y-4 mb-8">
            <Input placeholder="Número do Cartão" className="rounded-full" />
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="MM/AA" className="rounded-full" />
              <Input placeholder="CVV" className="rounded-full" />
            </div>
            <Input placeholder="Nome no Cartão" className="rounded-full" />
          </div>
        ) : null}

        <Button
          onClick={handlePayment}
          className="w-full bg-green-600 text-white hover:bg-green-700 rounded-full py-6 text-lg font-medium"
        >
          Confirmar Pagamento
        </Button>
      </div>
    </div>
  );
}
