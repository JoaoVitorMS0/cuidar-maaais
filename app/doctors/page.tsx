"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle, Phone, Video } from "lucide-react";
import Image from "next/image";
import BottomNavigation from "@/components/bottom-navigation";
import { useEffect, useState } from "react";

export default function DoctorsPage() {
  const router = useRouter();
  const [consultationStatus, setConsultationStatus] = useState<{
    [key: number]: boolean;
  }>({});

  const doctors = [
    {
      id: 1,
      name: "Dr. Fernandes",
      specialty: "Psicólogo Clínico",
      image: "/Dr_Fernandes.png",
      description:
        "Dr. Fernandes é um Psicólogo Clínico dedicado a promover o bem-estar mental. Com uma abordagem acolhedora e eficaz, ele oferece suporte especializado para que você possa desenvolver ferramentas e estratégias para uma vida mais plena e saudável. Conecte-se a um atendimento humanizado e construa um caminho para o autoconhecimento e o equilíbrio emocional.",
    },
    {
      id: 2,
      name: "Dra. Nathalia Silva",
      specialty: "Psicóloga Clínica",
      image: "/Dr_Nathalia_Silva.png",
      description:
        "A Dra. Nathalia Silva é uma Psicóloga Clínica renomada, com vasta experiência em Terapia Cognitivo-Comportamental (TCC). Há mais de 10 anos, ela tem ajudado pacientes a transformar padrões de pensamento e comportamento, promovendo mudanças duradouras para uma vida mais equilibrada e satisfatória. Sua abordagem prática e focada em resultados oferece o caminho para você alcançar seus objetivos de saúde mental.",
    },
  ];

  useEffect(() => {
    checkConsultationStatus();
  }, []);

  const checkConsultationStatus = () => {
    const consultations = JSON.parse(
      localStorage.getItem("cuidar_consultations") || "[]"
    );

    const status: { [key: number]: boolean } = {};

    doctors.forEach((doctor) => {
      const activeConsultation = consultations.find(
        (consultation: any) =>
          consultation.doctorId === doctor.id.toString() &&
          consultation.status === "agendada"
      );
      status[doctor.id] = !!activeConsultation;
    });

    console.log("Status das consultas:", status);
    setConsultationStatus(status);
  };

  const handlePhoneClick = (doctorId: number) => {
    if (consultationStatus[doctorId]) {
      router.push(`/call/${doctorId}`);
    } else {
      alert("Você precisa ter uma consulta agendada para fazer ligações.");
    }
  };

  const handleVideoClick = (doctorId: number) => {
    if (consultationStatus[doctorId]) {
      router.push(`/video-call/${doctorId}`);
    } else {
      alert("Você precisa ter uma consulta agendada para fazer videochamadas.");
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
        <div className="text-center mb-6 mt-2">
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
        <div className="space-y-6">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-2xl p-6 shadow-sm border"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500">
                  <Image
                    src={doctor.image || "/placeholder.svg"}
                    alt={doctor.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h3 className="font-bold text-lg">{doctor.name}</h3>
                  <p className="text-sm text-gray-600">{doctor.specialty}</p>
                  {consultationStatus[doctor.id] && (
                    <p className="text-xs text-green-600 font-medium mt-1">
                      ● Consulta ativa
                    </p>
                  )}
                </div>

                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => router.push(`/chat/${doctor.id}`)}
                    className={
                      consultationStatus[doctor.id]
                        ? "border-green-500 text-green-600 cursor-pointer"
                        : ""
                    }
                  >
                    <MessageCircle className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePhoneClick(doctor.id)}
                    className={
                      consultationStatus[doctor.id]
                        ? "border-green-500 text-green-600 cursor-pointer"
                        : ""
                    }
                  >
                    <Phone className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleVideoClick(doctor.id)}
                    className={
                      consultationStatus[doctor.id]
                        ? "border-green-500 text-green-600 cursor-pointer"
                        : ""
                    }
                  >
                    <Video className="w-5 h-5" />
                  </Button>
                </div>

                <div className="text-sm text-gray-600 leading-relaxed">
                  <h4 className="font-semibold mb-2">Sobre</h4>
                  <p>{doctor.description}</p>
                </div>

                <Button
                  onClick={() =>
                    router.push(`/consultation-booking/${doctor.id}`)
                  }
                  className="w-full bg-green-600 text-white hover:bg-green-700 rounded-full py-3 cursor-pointer"
                >
                  Obter consulta
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
