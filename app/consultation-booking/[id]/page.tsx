"use client";

import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Calendar } from "lucide-react";
import { useState } from "react";
import BottomNavigation from "@/components/bottom-navigation";
import Image from "next/image";

export default function ConsultationBookingPage() {
  const router = useRouter();
  const params = useParams();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [phone, setPhone] = useState("");

  const doctors = {
    "1": {
      name: "Dr. Fernandes",
      specialty: "Psicólogo Clínico",
      image: "/Dr_Fernandes.png",
    },
    "2": {
      name: "Dra. Nathalia Silva",
      specialty: "Psicóloga Clínica",
      image: "/Dr_Nathalia_Silva.png",
    },
  };

  const doctor = doctors[params.id as keyof typeof doctors] || doctors["1"];

  const availableTimes = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "00:00",
  ];

  const getMinDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getAvailableTimesForDate = (selectedDate: string) => {
    return availableTimes;
  };

  const handleBooking = () => {
    if (
      !patientName ||
      !patientAge ||
      !selectedDate ||
      !selectedTime ||
      !phone
    ) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    const consultation = {
      id: Date.now().toString(),
      doctorId: params.id,
      doctorName: doctor.name,
      patientName,
      patientAge,
      phone,
      symptoms,
      date: selectedDate,
      time: selectedTime,
      status: "agendada",
    };

    const existingConsultations = JSON.parse(
      localStorage.getItem("cuidar_consultations") || "[]"
    );
    existingConsultations.push(consultation);
    localStorage.setItem(
      "cuidar_consultations",
      JSON.stringify(existingConsultations)
    );

    alert("Consulta agendada com sucesso!");
    router.push("/doctors");
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
        <div className="text-center mb-6">
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
        <div className="bg-white rounded-2xl p-6 shadow-sm border mb-6">
          <div className="text-center mb-6">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-blue-500 mx-auto mb-4">
              <Image
                src={doctor.image || "/placeholder.svg"}
                alt={doctor.name}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="font-bold text-lg">{doctor.name}</h3>
            <p className="text-sm text-gray-600">{doctor.specialty}</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo *
              </label>
              <Input
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Seu nome completo"
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Idade *
                </label>
                <Input
                  type="number"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                  placeholder="Sua idade"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone *
                </label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(11) 99999-9999"
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data da Consulta *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="pl-10 w-full"
                  min={getMinDate()}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Horário Disponível *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {getAvailableTimesForDate(selectedDate).map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    onClick={() => setSelectedTime(time)}
                    className="text-sm"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sintomas/Motivo da Consulta
              </label>
              <Textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Descreva brevemente o motivo da consulta..."
                className="w-full h-20"
              />
            </div>

            <Button
              onClick={handleBooking}
              className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-full py-3 font-medium"
            >
              Confirmar Agendamento
            </Button>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
