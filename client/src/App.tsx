import React, { useState, useEffect } from "react";
import axios from "axios";
import { Youtube, MapPin, ExternalLink, CheckSquare } from "lucide-react";

const App: React.FC = () => {
  const [busTime, setBusTime] = useState<string>("확인 중...");

  useEffect(() => {
    const fetchBus = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/church-bus");
        if (res.data.min !== null && res.data.min !== undefined) {
          const stationInfo = res.data.station
            ? ` (${res.data.station}정거장 전)`
            : "";
          setBusTime(`${res.data.min}분 후${stationInfo}`);
        } else {
          setBusTime(res.data.message || "정보 없음");
        }
      } catch (e) {
        setBusTime("서버 연결 실패");
      }
    };
    fetchBus();
    const timer = setInterval(fetchBus, 60000);
    return () => clearInterval(timer);
  }, []);

  const openNaverMap = (dest: "church" | "home") => {
    const destination =
      dest === "church"
        ? { lat: 35.0768, lng: 129.0718, name: "임마누엘교회" }
        : { lat: 35.1796, lng: 129.0756, name: "우리집" };

    // 모바일 환경 감지
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      // 모바일: 네이버 지도 앱 실행
      const appUrl = `nmap://route/public?dlat=${destination.lat}&dlng=${
        destination.lng
      }&dname=${encodeURIComponent(destination.name)}&appname=halmeoni-web`;
      window.location.href = appUrl;

      // 앱이 설치되지 않은 경우를 대비해 웹 버전 fallback
      setTimeout(() => {
        window.open(
          `https://map.naver.com/v5/directions/-/-/-/transit?c=${destination.lng},${destination.lat},15,0,0,0,dh`
        );
      }, 1500);
    } else {
      // PC: 네이버 지도 웹 버전 열기
      window.open(
        `https://map.naver.com/v5/directions/-/-/-/transit?c=${destination.lng},${destination.lat},15,0,0,0,dh`,
        "_blank"
      );
    }
  };

  const handleWatchVideo = async (part: number) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/latest-video?part=${part}`
      );
      window.location.href = response.data.url;
    } catch (e) {
      alert("영상을 불러올 수 없습니다.");
    }
  };

  return (
    <div
      style={{
        padding: "15px",
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
      }}
    >
      <header
        style={{
          backgroundColor: "#222",
          color: "#fff",
          padding: "25px 15px",
          borderRadius: "20px",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "24px", margin: 0, color: "#FFD700" }}>
          ☀️ 오늘 15도 맑음 ｜ ⛪ 주일 예배 예정
        </h1>
      </header>

      <section
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <MenuButton
          icon={<Youtube color="red" size={32} />}
          label="주일 1부 메세지"
          onClick={() => handleWatchVideo(1)}
          description="최신 영상으로 바로 연결"
        />
        <MenuButton
          icon={<Youtube color="red" size={32} />}
          label="주일 2부 메세지"
          onClick={() => handleWatchVideo(2)}
        />
        <MenuButton
          icon={<ExternalLink color="#1E90FF" size={32} />}
          label="화요집회 신청"
          onClick={() => window.open("https://237.co.kr/board/bus")}
          bgColor="#E3F2FD"
        />
        <MenuButton
          icon={<MapPin color="#2DB400" size={40} />}
          label="교회 가기"
          onClick={() => openNaverMap("church")}
          bgColor="#E8F5E9"
          description={`🚌 3006번: ${busTime}`}
        />
        <MenuButton
          icon={<MapPin color="#FF8C00" size={32} />}
          label="집에 가기"
          onClick={() => openNaverMap("home")}
          bgColor="#FFF3E0"
        />
        <MenuButton
          icon={<CheckSquare color="#8A2BE2" size={32} />}
          label="오늘 할 일"
          onClick={() => {}}
          bgColor="#F3E5F5"
        />
      </section>
    </div>
  );
};

const MenuButton = ({
  icon,
  label,
  onClick,
  bgColor = "white",
  description,
}: any) => (
  <button
    onClick={onClick}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "20px",
      padding: "30px 20px",
      fontSize: "26px",
      fontWeight: "900",
      border: "3px solid #ddd",
      borderRadius: "25px",
      backgroundColor: bgColor,
      cursor: "pointer",
      textAlign: "left",
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    }}
  >
    <div style={{ flexShrink: 0 }}>{icon}</div>
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span>{label}</span>
      {description && (
        <span
          style={{
            fontSize: "16px",
            fontWeight: "normal",
            color: "#d32f2f",
            marginTop: "5px",
          }}
        >
          {description}
        </span>
      )}
    </div>
  </button>
);

export default App;
