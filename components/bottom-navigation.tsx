"use client"

import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Phone, Home, Bell, Music2, User } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function BottomNavigation() {
  const router = useRouter()
  const pathname = usePathname()
  const [profileImage, setProfileImage] = useState("")

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("cuidar_user") || "{}")
    setProfileImage(user.profileImage || "")
  }, [])

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="bg-white border-t flex justify-around py-3">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.push("/profile")}
        className={`relative cursor-pointer ${isActive("/profile") ? "text-blue-600" : ""}`}
      >
        {profileImage ? (
          <div className="w-6 h-6 rounded-full overflow-hidden border-2 border-gray-400">
            <Image
              src={profileImage || "/placeholder.svg"}
              alt="Profile"
              width={24}
              height={24}
              className="object-cover w-full h-full"
            />
          </div>
        ) : (
          <User className="w-6 h-6" />
        )}
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.push("/doctors")}
        className={`cursor-pointer ${isActive("/doctors") ? "text-blue-600" : ""}`}
      >
        <Phone className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.push("/home")}
        className={`cursor-pointer ${isActive("/home") ? "text-blue-600" : ""}`}
      >
        <Home className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.push("/medicine-home")}
        className={`cursor-pointer ${isActive("/medicine-home") || pathname.startsWith("/medicine") ? "text-blue-600" : ""}`}
      >
        <Bell className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.push("/meditation")}
        className={`cursor-pointer ${isActive("/meditation") ? "text-blue-600" : ""}`}
      >
        <Music2 className="w-6 h-6" />
      </Button>
    </div>
  )
}
