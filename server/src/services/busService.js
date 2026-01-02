const axios = require('axios');
const xml2js = require('xml2js');

/**
 * 부산 버스 도착 정보를 조회하는 서비스
 */
class BusService {
  constructor() {
    this.serviceKey = process.env.BUS_API_KEY;
    this.apiUrl = 'http://apis.data.go.kr/6260000/BusanBIMS/stopArrByBstopid';
    // 동해남부선송정역 정류장 ID
    this.songjeongStationId = '187600303'; // 09007 경자청 방향
  }

  /**
   * 특정 정류장의 3006번 버스 도착 정보 조회
   */
  async getChurchBusArrival() {
    try {
      const response = await axios.get(this.apiUrl, {
        params: {
          serviceKey: this.serviceKey,
          bstopid: this.songjeongStationId
        },
        timeout: 5000
      });

      const parser = new xml2js.Parser({ explicitArray: false });
      const result = await parser.parseStringPromise(response.data);

      const resultCode = result?.response?.header?.resultCode;
      if (resultCode !== '00') {
        console.error('Bus API Error:', result?.response?.header?.resultMsg);
        return { 
          success: false, 
          message: "버스 정보 조회 실패" 
        };
      }

      const items = result?.response?.body?.items?.item;
      if (!items) {
        return { 
          success: false, 
          message: "운행 중인 버스 없음" 
        };
      }

      const itemList = Array.isArray(items) ? items : [items];
      const bus3006 = itemList.find(bus => bus.lineno === '3006');

      if (bus3006 && bus3006.min1) {
        const arrivalMin = parseInt(bus3006.min1);
        if (!isNaN(arrivalMin)) {
          return {
            success: true,
            busNum: '3006',
            min: arrivalMin,
            station: bus3006.station1 || '정보없음',
            stopName: '동해남부선송정역'
          };
        }
      }

      return { 
        success: false, 
        message: "3006번 정보 없음" 
      };

    } catch (error) {
      console.error('Bus API Error:', error.message);
      return { 
        success: false, 
        message: "서버 연결 실패",
        error: error.message 
      };
    }
  }
}

module.exports = new BusService();
