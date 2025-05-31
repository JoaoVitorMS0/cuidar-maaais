"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, User, Mail, Phone, MapPin, Edit, Pill } from "lucide-react"
import { useState, useEffect } from "react"
import BottomNavigation from "@/components/bottom-navigation"
import Image from "next/image"

interface Medicine {
  id: string
  name: string
  time: string
  recurrence: string
  takeNow: boolean
}

export default function ProfilePage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [profileImage, setProfileImage] = useState("")
  const [medicines, setMedicines] = useState<Medicine[]>([])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("cuidar_user") || "{}")
    setName(user.name || "")
    setEmail(user.email || "")
    setPhone(user.phone || "")
    setAddress(user.address || "")
    setProfileImage(user.profileImage || "")

    const savedMedicines = JSON.parse(localStorage.getItem("cuidar_medicines") || "[]")
    setMedicines(savedMedicines)
  }, [])

  const getRecurrenceText = (recurrence: string) => {
    switch (recurrence) {
      case "daily":
        return "A cada 1 dia"
      case "weekly":
        return "A cada 7 dias"
      case "12hours":
        return "A cada 12 horas"
      default:
        return recurrence
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white flex items-center justify-between p-4 shadow-sm">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="cursor-pointer">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <span className="text-lg font-medium">Meu Perfil</span>
        <Button variant="ghost" size="icon" onClick={() => router.push("/profile/edit")} className="cursor-pointer">
          <Edit className="w-6 h-6" />
        </Button>
      </div>

      <div className="flex-1 p-6">

        <div className="bg-white rounded-2xl p-6 shadow-sm border mb-6">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              {profileImage ? (
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500">
                  <Image src={profileImage || "/placeholder.svg"} alt="Profile" fill className="object-cover" />
                </div>
              ) : (
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center border-4 border-gray-300">
                  <User className="w-12 h-12 text-gray-500" />
                </div>
              )}
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{name || "Nome não informado"}</h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Informações Pessoais</h3>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-800">{email || "Não informado"}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Telefone</p>
                <p className="font-medium text-gray-800">{phone || "Não informado"}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Endereço</p>
                <p className="font-medium text-gray-800">{address || "Não informado"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <Pill className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-gray-800">Lembretes de Medicamentos</h3>
          </div>

          {medicines.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-500">O usuário não tem lembretes de remédios</p>
            </div>
          ) : (
            <div className="space-y-3">
              {medicines.map((medicine) => (
                <div key={medicine.id} className="bg-blue-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">{medicine.name}</h4>
                      <p className="text-sm text-gray-600">
                        {medicine.time} • {getRecurrenceText(medicine.recurrence)}
                      </p>
                    </div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Button
          onClick={() => router.push("/profile/edit")}
          className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-full py-6 text-lg font-medium cursor-pointer"
        >
          <Edit className="w-5 h-5 mr-2" />
          Editar Perfil
        </Button>
      </div>

      <BottomNavigation />
    </div>
  )
}
