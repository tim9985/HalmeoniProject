import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * 교회 가는 버스(3006번) 도착 정보 조회
 */
export async function getChurchBus() {
  try {
    const response = await axios.get(`${API_BASE_URL}/church-bus`);
    return response.data;
  } catch (error) {
    console.error('Bus API Error:', error);
    return { min: null, message: '서버 연결 실패' };
  }
}

/**
 * 주일 메세지 영상 + 성경 본문 조회
 */
export async function getLatestBible(part: number) {
  try {
    const response = await axios.get(`${API_BASE_URL}/latest-bible?part=${part}`);
    return response.data;
  } catch (error) {
    console.error('Bible API Error:', error);
    throw new Error('본문을 불러올 수 없습니다.');
  }
}

/**
 * 주일 메세지 최신 영상 조회 (기존 호환성)
 */
export async function getLatestVideo(part: number) {
  try {
    const response = await axios.get(`${API_BASE_URL}/latest-video?part=${part}`);
    return response.data;
  } catch (error) {
    console.error('YouTube API Error:', error);
    throw new Error('영상을 불러올 수 없습니다.');
  }
}

/**
 * 현재 날씨 정보 조회
 */
export async function getCurrentWeather() {
  try {
    const response = await axios.get(`${API_BASE_URL}/weather`);
    return response.data;
  } catch (error) {
    console.error('Weather API Error:', error);
    return { temp: null, condition: '정보없음', icon: '🌤️' };
  }
}

/**
 * 오늘의 성경 말씀 조회
 */
export async function getDailyVerse() {
  try {
    const response = await axios.get(`${API_BASE_URL}/daily-verse`);
    return response.data;
  } catch (error) {
    console.error('Bible API Error:', error);
    return null;
  }
}

/**
 * 랜덤 성경 말씀 조회
 */
export async function getRandomVerse() {
  try {
    const response = await axios.get(`${API_BASE_URL}/random-verse`);
    return response.data;
  } catch (error) {
    console.error('Bible API Error:', error);
    return null;
  }
}
