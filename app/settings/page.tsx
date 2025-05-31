"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Brain,
  ArrowLeft,
  User,
  Shield,
  Bell,
  Lock,
  HelpCircle,
  FileText,
  AlertTriangle,
  UserPlus,
  LogOut,
} from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("cuidar_user");
    router.push("/");
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
        <span className="text-lg font-medium">Configurações</span>
        <div className="w-10" />
      </div>

      <div className="flex-1 p-6">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Seção Principal */}
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start p-4 h-auto text-left"
              onClick={() => router.push("/profile")}
            >
              <User className="w-5 h-5 mr-3" />
              <span>Editar Perfil</span>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start p-4 h-auto text-left"
            >
              <Shield className="w-5 h-5 mr-3" />
              <span>Segurança</span>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start p-4 h-auto text-left"
            >
              <Bell className="w-5 h-5 mr-3" />
              <span>Notificações</span>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start p-4 h-auto text-left"
            >
              <Lock className="w-5 h-5 mr-3" />
              <span>Privacidade</span>
            </Button>
          </div>

          {/* Suporte & Sobre */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500 px-4">
              Suporte & Sobre
            </h3>

            <Button
              variant="ghost"
              className="w-full justify-start p-4 h-auto text-left"
            >
              <HelpCircle className="w-5 h-5 mr-3" />
              <span>Ajuda E Suporte</span>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start p-4 h-auto text-left"
            >
              <FileText className="w-5 h-5 mr-3" />
              <span>Termos e Políticas</span>
            </Button>
          </div>

          {/* Ações */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500 px-4">Ações</h3>

            <Button
              variant="ghost"
              className="w-full justify-start p-4 h-auto text-left"
            >
              <AlertTriangle className="w-5 h-5 mr-3" />
              <span>Reportar Problema</span>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start p-4 h-auto text-left"
            >
              <UserPlus className="w-5 h-5 mr-3" />
              <span>Adicionar Conta</span>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start p-4 h-auto text-left text-red-600"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span>Sair</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
