"use client";

import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Phone, Video } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import BottomNavigation from "@/components/bottom-navigation";
import Image from "next/image";

interface Message {
  id: string;
  sender: "user" | "doctor";
  message: string;
  timestamp: string;
}

export default function ChatPage() {
  const router = useRouter();
  const params = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [hasActiveConsultation, setHasActiveConsultation] = useState(false);
  const [doctorName, setDoctorName] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const doctors = {
    "1": { name: "Dr. Fernandes", specialty: "Psicólogo Clínico" },
    "2": { name: "Dra. Nathalia Silva", specialty: "Psicóloga Clínica" },
  };

  const doctor = doctors[params.id as keyof typeof doctors] || doctors["1"];

  useEffect(() => {
    checkActiveConsultation();
    loadMessages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const checkActiveConsultation = () => {
    const consultations = JSON.parse(
      localStorage.getItem("cuidar_consultations") || "[]"
    );

    const activeConsultation = consultations.find(
      (consultation: any) =>
        consultation.doctorId === params.id &&
        consultation.status === "agendada"
    );

    if (activeConsultation) {
      setHasActiveConsultation(true);
      setDoctorName(activeConsultation.doctorName);
    } else {
      setHasActiveConsultation(false);
    }
  };

  const loadMessages = () => {
    const savedMessages = JSON.parse(
      localStorage.getItem(`chat_${params.id}`) || "[]"
    );
    setMessages(savedMessages);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !hasActiveConsultation) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: "user",
      message: newMessage,
      timestamp: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    localStorage.setItem(`chat_${params.id}`, JSON.stringify(updatedMessages));
    setNewMessage("");

    setTimeout(() => {
      const doctorResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "doctor",
        message: "Obrigado pela sua mensagem. Como posso ajudá-lo hoje?",
        timestamp: new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      const updated = [...updatedMessages, doctorResponse];
      setMessages(updated);
      localStorage.setItem(`chat_${params.id}`, JSON.stringify(updated));
    }, 2000);
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
          <span className="text-sm font-medium">Chat</span>
          <div className="w-10" />
        </div>

        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Chat Indisponível
            </h2>
            <p className="text-gray-600 mb-6">
              Você precisa ter uma consulta agendada para usar o chat.
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white flex items-center justify-between p-4 shadow-sm border-b">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>

        <div className="flex items-center space-x-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt={doctor.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium text-sm">{doctor.name}</h3>
            <p className="text-xs text-green-600">Online</p>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(`/call/${params.id}`)}
          >
            <Phone className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(`/video-call/${params.id}`)}
          >
            <Video className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-800 border"
                }`}
              >
                <p className="text-sm">{message.message}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === "user"
                      ? "text-blue-100"
                      : "text-gray-500"
                  }`}
                >
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-white border-t p-4">
        <div className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1"
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button
            onClick={sendMessage}
            size="icon"
            className="bg-blue-600 hover:bg-blue-700"
            disabled={!newMessage.trim()}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
