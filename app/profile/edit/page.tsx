"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, User, Mail, Phone, MapPin, Camera, X } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import BottomNavigation from "@/components/bottom-navigation"
import Image from "next/image"

interface UserData {
  email: string
  name: string
  phone: string
  address: string
  profileImage: string
}

export default function EditProfilePage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [profileImage, setProfileImage] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("cuidar_user") || "{}") as UserData
    setName(user.name || "")
    setEmail(user.email || "")
    setPhone(user.phone || "")
    setAddress(user.address || "")
    setProfileImage(user.profileImage || "")
  }, [])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageDataUrl = e.target?.result as string
        setProfileImage(imageDataUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setProfileImage("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSave = () => {
    const user = JSON.parse(localStorage.getItem("cuidar_user") || "{}") as UserData
    const updatedUser = { ...user, name, email, phone, address, profileImage }
    localStorage.setItem("cuidar_user", JSON.stringify(updatedUser))

    // Update in users list too
    const users = JSON.parse(localStorage.getItem("cuidar_users") || "[]") as UserData[]
    const userIndex = users.findIndex((u: UserData) => u.email === user.email)
    if (userIndex !== -1) {
      users[userIndex] = updatedUser
      localStorage.setItem("cuidar_users", JSON.stringify(users))
    }

    alert("Perfil atualizado com sucesso!")
    router.push("/profile")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white flex items-center justify-between p-4 shadow-sm">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <span className="text-lg font-medium">Editar Perfil</span>
        <div className="w-10" />
      </div>

      <div className="flex-1 p-6">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4 relative">
            <div className="relative">
              {profileImage ? (
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300">
                  <Image src={profileImage || "/placeholder.svg"} alt="Profile" fill className="object-cover" />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full p-0"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ) : (
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center border-2 border-gray-300">
                  <User className="w-10 h-10 text-gray-500" />
                </div>
              )}

              <Button
                variant="outline"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white border-2 border-white rounded-full cursor-pointer"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

          <p className="text-sm text-gray-600">Toque no ícone da câmera para alterar a foto</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10"
                placeholder="Seu nome completo"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-10"
                placeholder="(11) 99999-9999"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Endereço</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="pl-10"
                placeholder="Seu endereço completo"
              />
            </div>
          </div>

          <Button
            onClick={handleSave}
            className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-full py-6 text-lg font-medium cursor-pointer"
          >
            Salvar Alterações
          </Button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
