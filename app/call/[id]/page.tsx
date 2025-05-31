"use client";

import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PhoneOff, Mic, MicOff, Video } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import BottomNavigation from "@/components/bottom-navigation";

export default function CallPage() {
  const router = useRouter();
  const params = useParams();
  const [isMuted, setIsMuted] = useState(false);
  const [hasActiveConsultation, setHasActiveConsultation] = useState(false);

  const doctors = {
    "1": { name: "Dr. Fernandes", specialty: "Psicólogo Clínico" },
    "2": { name: "Dra. Nathalia Silva", specialty: "Psicóloga Clínica" },
  };

  const doctor = doctors[params.id as keyof typeof doctors] || doctors["2"];

  useEffect(() => {
    checkActiveConsultation();
  }, []);

  const checkActiveConsultation = () => {
    const consultations = JSON.parse(
      localStorage.getItem("cuidar_consultations") || "[]"
    );

    const activeConsultation = consultations.find(
      (consultation: any) =>
        consultation.doctorId === params.id &&
        consultation.status === "agendada"
    );

    console.log("Consultas encontradas:", consultations);
    console.log("Consulta ativa:", activeConsultation);

    setHasActiveConsultation(!!activeConsultation);
  };

  if (!hasActiveConsultation) {
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
          <div className="flex justify-center mb-6">
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
          <div className="w-10" />
        </div>

        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Ligação Indisponível
            </h2>
            <p className="text-gray-600 mb-6">
              Você precisa ter uma consulta agendada para fazer ligações.
            </p>
            <Button
              onClick={() => router.push(`/consultation-booking/${params.id}`)}
              className="bg-blue-600 text-white hover:bg-blue-700 rounded-full px-6 py-3"
            >
              Agendar Consulta
            </Button>
          </div>
        </div>

        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-green-200 flex flex-col">
      <div className="bg-white/90 backdrop-blur flex items-center justify-between p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <span className="text-sm font-medium">Tela ligação</span>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative w-24 h-24">
              <Image
                src="/placeholder.svg?height=96&width=200"
                alt="Cuidar+ Logo"
                width={200}
                height={96}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center space-y-8">
          <div className="relative w-32 h-32 rounded-full overflow-hidden">
            <Image
              src="/placeholder.svg?height=200&width=200"
              alt={doctor.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">{doctor.name}</h2>
            <p className="text-gray-600">{doctor.specialty}</p>
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-700">Chamando...</p>
          </div>
        </div>

        <div className="flex justify-center space-x-8 mb-8">
          <Button
            variant="outline"
            size="icon"
            className="w-16 h-16 rounded-full bg-white/80"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? (
              <MicOff className="w-6 h-6" />
            ) : (
              <Mic className="w-6 h-6" />
            )}
          </Button>

          <Button
            size="icon"
            className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600"
            onClick={() => router.back()}
          >
            <PhoneOff className="w-6 h-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="w-16 h-16 rounded-full bg-white/80"
            onClick={() => router.push(`/video-call/${params.id}`)}
          >
            <Video className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
