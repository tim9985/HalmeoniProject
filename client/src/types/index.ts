// src/types/index.ts
export interface WeatherData {
  temp: number;
  condition: string; // 예: "맑음", "흐림"
  icon: string;
}

export interface BusArrival {
  busNum: string;
  remainTime: number; // 분 단위
}

export interface YouTubeLink {
  title: string;
  url: string;
}