"use client";

import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  PhoneOff,
  Mic,
  MicOff,
  Video,
  VideoOff,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import BottomNavigation from "@/components/bottom-navigation";

export default function VideoCallPage() {
  const router = useRouter();
  const params = useParams();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [hasActiveConsultation, setHasActiveConsultation] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const doctorVideoRef = useRef<HTMLVideoElement>(null);
  const [showInfoContainer, setShowInfoContainer] = useState(true);
  const [callConnected, setCallConnected] = useState(false);

  const doctors = {
    "1": {
      name: "Dr. Fernandes",
      specialty: "Psicólogo Clínico",
      gender: "homem",
    },
    "2": {
      name: "Dra. Nathalia Silva",
      specialty: "Psicóloga Clínica",
      gender: "mulher",
    },
  };

  const doctor = doctors[params.id as keyof typeof doctors] || doctors["1"];
  const isMaleDoctor = doctor.gender === "homem";

  const doctorVideoSrc = isMaleDoctor
    ? "/videos/Psicólogo_Clínico.mp4"
    : "/videos/Psicóloga_Clínica.mp4";

  useEffect(() => {
    checkActiveConsultation();
  }, []);

  useEffect(() => {
    if (hasActiveConsultation && isVideoOn) {
      startVideo();

      const connectionTimer = setTimeout(() => {
        setCallConnected(true);
      }, 2000);

      const infoTimer = setTimeout(() => {
        setShowInfoContainer(false);
      }, 5000);

      return () => {
        clearTimeout(connectionTimer);
        clearTimeout(infoTimer);
      };
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [hasActiveConsultation, isVideoOn]);

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

  const startVideo = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Erro ao acessar câmera:", error);
      alert("Não foi possível acessar a câmera. Verifique as permissões.");
    }
  };

  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isVideoOn;
        setIsVideoOn(!isVideoOn);
      }
    }
  };

  const toggleMute = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = isMuted;
        setIsMuted(!isMuted);
      }
    }
  };

  const endCall = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    router.back();
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
          <span className="text-sm font-medium">Videochamada</span>
          <div className="w-10" />
        </div>

        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Videochamada Indisponível
            </h2>
            <p className="text-gray-600 mb-6">
              Você precisa ter uma consulta agendada para fazer videochamadas.
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
    <div className="min-h-screen bg-black flex flex-col">
      <div className="bg-black/50 backdrop-blur flex items-center justify-between p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={endCall}
          className="text-white"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <span className="text-sm font-medium text-white">
          Videochamada - {doctor.name}
        </span>
        <div className="w-10" />
      </div>

      <div className="flex-1 relative">
        {showInfoContainer ? (
          <>
            <div className="absolute inset-0">
              {isVideoOn ? (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <div className="text-center text-white">
                    <VideoOff className="w-16 h-16 mx-auto mb-4" />
                    <p>Câmera desligada</p>
                  </div>
                </div>
              )}
            </div>

            <div className="absolute top-4 right-4 w-32 h-24 bg-gray-700 rounded-lg overflow-hidden border-2 border-white">
              <video
                ref={doctorVideoRef}
                src={doctorVideoSrc}
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
                onError={() => {
                  console.log("Erro ao carregar vídeo do médico");
                }}
              />
            </div>
          </>
        ) : (
          <>
            <div className="absolute inset-0">
              <video
                src={doctorVideoSrc}
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
                onError={() => {
                  console.log("Erro ao carregar vídeo do médico em tela cheia");
                }}
              />
            </div>

            <div className="absolute top-4 right-4 w-32 h-24 bg-gray-700 rounded-lg overflow-hidden border-2 border-white">
              {isVideoOn ? (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <VideoOff className="w-6 h-6 text-white" />
                </div>
              )}
            </div>
          </>
        )}

        {showInfoContainer && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
            <div className="bg-black/30 backdrop-blur rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-2">{doctor.name}</h2>
              <p className="text-sm opacity-80">{doctor.specialty}</p>
              <p className="text-sm opacity-60 mt-2">
                {callConnected ? "Conectado" : "Conectando..."}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-black/50 backdrop-blur p-6">
        <div className="flex justify-center space-x-8">
          <Button
            variant="outline"
            size="icon"
            className="w-16 h-16 rounded-full bg-white/20 border-white/30 text-white hover:bg-white/30"
            onClick={toggleMute}
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
            onClick={endCall}
          >
            <PhoneOff className="w-6 h-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="w-16 h-16 rounded-full bg-white/20 border-white/30 text-white hover:bg-white/30"
            onClick={toggleVideo}
          >
            {isVideoOn ? (
              <Video className="w-6 h-6" />
            ) : (
              <VideoOff className="w-6 h-6" />
            )}
          </Button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
