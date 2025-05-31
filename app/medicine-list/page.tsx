"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Trash2, Clock, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import BottomNavigation from "@/components/bottom-navigation";
import Image from "next/image";

interface Medicine {
  id: string;
  name: string;
  time: string;
  recurrence: string;
  takeNow: boolean;
}

export default function MedicineListPage() {
  const router = useRouter();
  const [medicines, setMedicines] = useState<Medicine[]>([]);

  useEffect(() => {
    const savedMedicines = JSON.parse(
      localStorage.getItem("cuidar_medicines") || "[]"
    );
    setMedicines(savedMedicines);
  }, []);

  const deleteMedicine = (id: string) => {
    const updatedMedicines = medicines.filter((med) => med.id !== id);
    setMedicines(updatedMedicines);
    localStorage.setItem("cuidar_medicines", JSON.stringify(updatedMedicines));
  };

  const getRecurrenceText = (recurrence: string) => {
    switch (recurrence) {
      case "daily":
        return "A cada 1 dia";
      case "weekly":
        return "A cada 7 dias";
      case "12hours":
        return "A cada 12 horas";
      default:
        return recurrence;
    }
  };

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
        <div className="mb-6">
          <h1 className="text-xl font-bold text-blue-600">Minhas receitas</h1>
          <p className="text-sm text-gray-600">
            Acompanhe seus medicamentos cadastrados e gerencie lembretes
          </p>
        </div>

        <div className="space-y-4">
          {medicines.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhum medicamento cadastrado</p>
              <Button
                onClick={() => router.push("/medicine-form")}
                className="mt-4 bg-blue-600 text-white hover:bg-blue-700"
              >
                Adicionar primeiro medicamento
              </Button>
            </div>
          ) : (
            medicines.map((medicine) => (
              <div key={medicine.id} className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-800">{medicine.name}</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteMedicine(medicine.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded-full">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">
                      {medicine.time}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded-full">
                    <RotateCcw className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">
                      {getRecurrenceText(medicine.recurrence)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {medicines.length > 0 && (
          <Button
            onClick={() => router.push("/medicine-form")}
            className="w-full mt-8 bg-gray-800 text-white hover:bg-gray-700 rounded-full py-6"
          >
            <Plus className="w-5 h-5 mr-2" />
            Adicionar
          </Button>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}
