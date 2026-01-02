const axios = require('axios');

/**
 * 날씨 정보 조회 서비스 (기상청 단기예보 API)
 */
class WeatherService {
  constructor() {
    this.serviceKey = process.env.WEATHER_API_KEY;
    this.apiUrl = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst';
    // 부산 해운대구 좌표 (송정 지역)
    this.nx = 98; // 격자 X
    this.ny = 76; // 격자 Y
  }

  /**
   * 현재 날씨 정보 조회
   */
  async getCurrentWeather() {
    try {
      const now = new Date();
      const baseDate = this.formatDate(now);
      const baseTime = this.getBaseTime(now);

      const response = await axios.get(this.apiUrl, {
        params: {
          serviceKey: this.serviceKey,
          numOfRows: 60,
          pageNo: 1,
          dataType: 'JSON',
          base_date: baseDate,
          base_time: baseTime,
          nx: this.nx,
          ny: this.ny
        },
        timeout: 5000
      });

      const items = response.data?.response?.body?.items?.item;
      if (!items) {
        return {
          success: false,
          message: '날씨 정보를 가져올 수 없습니다.'
        };
      }

      const weatherData = this.parseWeatherData(items);
      
      return {
        success: true,
        ...weatherData
      };

    } catch (error) {
      console.error('Weather API Error:', error.message);
      return {
        success: false,
        message: '날씨 조회 중 오류가 발생했습니다.',
        error: error.message
      };
    }
  }

  /**
   * 날씨 데이터 파싱
   */
  parseWeatherData(items) {
    let temp = null;
    let sky = null;
    let pty = null;

    items.forEach(item => {
      if (item.category === 'T1H') temp = item.fcstValue; // 기온
      if (item.category === 'SKY') sky = item.fcstValue; // 하늘상태
      if (item.category === 'PTY') pty = item.fcstValue; // 강수형태
    });

    const condition = this.getWeatherCondition(sky, pty);
    const icon = this.getWeatherIcon(sky, pty);

    return {
      temp: temp ? Math.round(temp) : null,
      condition,
      icon
    };
  }

  /**
   * 날씨 상태 텍스트 반환
   */
  getWeatherCondition(sky, pty) {
    // 강수형태가 있는 경우
    if (pty && pty !== '0') {
      switch (pty) {
        case '1': return '비';
        case '2': return '비/눈';
        case '3': return '눈';
        case '4': return '소나기';
        default: return '흐림';
      }
    }

    // 하늘 상태
    switch (sky) {
      case '1': return '맑음';
      case '3': return '구름많음';
      case '4': return '흐림';
      default: return '정보없음';
    }
  }

  /**
   * 날씨 아이콘 반환
   */
  getWeatherIcon(sky, pty) {
    if (pty && pty !== '0') {
      if (pty === '3') return '❄️';
      return '🌧️';
    }

    switch (sky) {
      case '1': return '☀️';
      case '3': return '⛅';
      case '4': return '☁️';
      default: return '🌤️';
    }
  }

  /**
   * 날짜 포맷 (YYYYMMDD)
   */
  formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  }

  /**
   * Base Time 계산 (매시간 30분 이후 데이터 생성)
   */
  getBaseTime(date) {
    const hour = date.getHours();
    const minute = date.getMinutes();
    
    // 30분 이전이면 이전 시간 사용
    let baseHour = minute < 30 ? hour - 1 : hour;
    if (baseHour < 0) baseHour = 23;
    
    return String(baseHour).padStart(2, '0') + '30';
  }
}

module.exports = new WeatherService();
