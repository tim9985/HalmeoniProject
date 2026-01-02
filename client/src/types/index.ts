// src/types/index.ts
export interface WeatherData {
  temp: number | null;
  condition: string;
  icon: string;
}

export interface BusArrival {
  busNum?: string;
  min: number | null;
  station?: string;
  stopName?: string;
  message?: string;
}

export interface YouTubeVideo {
  title?: string;
  url: string;
}

export interface BibleVerse {
  reference: string;
  text: string;
  date?: string;
}