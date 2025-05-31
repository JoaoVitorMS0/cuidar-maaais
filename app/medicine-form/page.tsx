"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Plus } from "lucide-react"
import { useState } from "react"
import BottomNavigation from "@/components/bottom-navigation"
import Image from "next/image"

export default function MedicineFormPage() {
  const router = useRouter()
  const [medicineName, setMedicineName] = useState("")
  const [time, setTime] = useState("")
  const [recurrence, setRecurrence] = useState("")
  const [takeNow, setTakeNow] = useState(false)

  const handleSubmit = () => {
    if (!medicineName || !time || !recurrence) {
      alert("Por favor, preencha todos os campos obrigatórios")
      return
    }

    const newMedicine = {
      id: Date.now().toString(),
      name: medicineName,
      time,
      recurrence,
      takeNow,
    }

    const existingMedicines = JSON.parse(localStorage.getItem("cuidar_medicines") || "[]")
    existingMedicines.push(newMedicine)
    localStorage.setItem("cuidar_medicines", JSON.stringify(existingMedicines))

    router.push("/medicine-list")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="bg-white flex items-center justify-between p-4 shadow-sm">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="cursor-pointer">
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
          <h1 className="text-xl font-bold text-red-600">Nova receita</h1>
          <p className="text-sm text-gray-600">
            Adicione sua prescrição médica para receber lembretes de quando tomar seu medicamento
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Remédio</label>
              <Input
                placeholder="Nome do medicamento"
                value={medicineName}
                onChange={(e) => setMedicineName(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Horário</label>
              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Recorrência</label>
              <Select value={recurrence} onValueChange={setRecurrence}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">A cada 1 dia</SelectItem>
                  <SelectItem value="12hours">A cada 12 horas</SelectItem>
                  <SelectItem value="weekly">A cada 7 dias</SelectItem>
                  <SelectItem value="monthly">A cada 30 dias</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="takeNow" checked={takeNow} onCheckedChange={(checked) => setTakeNow(checked as boolean)} />
              <label htmlFor="takeNow" className="text-sm font-medium text-gray-700 cursor-pointer">
                Tomar agora
              </label>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full mt-8 bg-red-600 text-white hover:bg-red-700 rounded-full py-6"
          >
            <Plus className="w-5 h-5 mr-2" />
            Adicionar
          </Button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
