import React, { useState, useEffect } from "react";
import { BookOpen, MapPin, ExternalLink, CheckSquare } from "lucide-react";
import Header from "./components/Header";
import MenuButton from "./components/MenuButton";
import BibleVerse from "./components/BibleVerse";
import BibleModal from "./components/BibleModal";
import { getChurchBus, getLatestBible, getCurrentWeather, getDailyVerse } from "./services/api";
import { openNaverMap } from "./utils/navigation";
import type { WeatherData, BibleVerse as BibleVerseType } from "./types";
import "./App.css";

const App: React.FC = () => {
  const [busTime, setBusTime] = useState<string>("확인 중...");
  const [weather, setWeather] = useState<WeatherData>({ temp: null, condition: "로딩중", icon: "🌤️" });
  const [verse, setVerse] = useState<BibleVerseType | null>(null);
  
  // 성경 본문 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<{
    reference: string;
    verses: Array<{ book: string; chapter: number; verse: number; text: string }>;
  }>({ reference: '', verses: [] });

  // 버스 정보 조회
  useEffect(() => {
    const fetchBus = async () => {
      const data = await getChurchBus();
      if (data.min !== null && data.min !== undefined) {
        const stationInfo = data.station ? ` (${data.station}정거장 전)` : "";
        setBusTime(`${data.min}분 후${stationInfo}`);
      } else {
        setBusTime(data.message || "정보 없음");
      }
    };
    fetchBus();
    const timer = setInterval(fetchBus, 60000);
    return () => clearInterval(timer);
  }, []);

  // 날씨 정보 조회
  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getCurrentWeather();
      setWeather(data);
    };
    fetchWeather();
    // 30분마다 갱신
    const timer = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  // 오늘의 말씀 조회
  useEffect(() => {
    const fetchVerse = async () => {
      const data = await getDailyVerse();
      setVerse(data);
    };
    fetchVerse();
  }, []);

  /**
   * 주일 본문 보기 클릭 핸들러
   */
  const handleViewBible = async (part: number) => {
    try {
      const data = await getLatestBible(part);
      
      if (!data.reference || !data.verses || data.verses.length === 0) {
        alert(data.bibleMessage || '본문 정보를 찾을 수 없습니다.');
        return;
      }

      setModalData({
        reference: data.reference,
        verses: data.verses
      });
      setIsModalOpen(true);
    } catch (error) {
      alert('본문을 불러올 수 없습니다.');
    }
  };

  const getTodayEvent = () => {
    const day = new Date().getDay();
    if (day === 0) return "⛪ 주일 예배 예정";
    if (day === 2) return "🙏 화요집회 예정";
    return "";
  };

  return (
    <div className="app-container">
      <Header weather={weather} todayEvent={getTodayEvent()} />

      <section
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <MenuButton
          icon={<BookOpen color="#8A2BE2" size={32} />}
          label="주일 1부 본문 보기"
          onClick={() => handleViewBible(1)}
          bgColor="#F3E5F5"
        />
        <MenuButton
          icon={<BookOpen color="#8A2BE2" size={32} />}
          label="주일 2부 본문 보기"
          onClick={() => handleViewBible(2)}
          bgColor="#F3E5F5"
        />
        <MenuButton
          icon={<ExternalLink color="#1E90FF" size={32} />}
          label="화요집회 신청"
          onClick={() => window.open("https://237.co.kr/board/bus", "_blank")}
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
          onClick={() => alert("할 일 기능은 준비 중입니다.")}
          bgColor="#F3E5F5"
        />
      </section>

      <BibleVerse verse={verse} />

      {/* 성경 본문 모달 */}
      <BibleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reference={modalData.reference}
        verses={modalData.verses}
      />
    </div>
  );
};

export default App;
