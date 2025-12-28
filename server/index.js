const express = require('express');
const cors = require('cors');
const axios = require('axios');
const xml2js = require('xml2js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 1. 유튜브 최신 영상 로직
async function getLatestSermon(part) {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  if (!API_KEY || API_KEY.startsWith('UC')) return null;

  const UPLOADS_PLAYLIST_ID = 'UURgXErYOtPB8oWdrVFtYe1Q';
  const SEARCH_QUERY = `주일 ${part}부`;

  try {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems`, {
      params: { key: API_KEY, playlistId: UPLOADS_PLAYLIST_ID, part: 'snippet', maxResults: 15 }
    });
    const videos = response.data.items;
    const matchingVideos = videos.filter(v => v.snippet.title.includes(SEARCH_QUERY));
    const bestVideo = matchingVideos.find(v => !v.snippet.title.includes("전체 예배")) || matchingVideos[0] || videos[0];
    return `https://www.youtube.com/watch?v=${bestVideo.snippet.resourceId.videoId}`;
  } catch (error) { return null; }
}

app.get('/api/latest-video', async (req, res) => {
  const url = await getLatestSermon(req.query.part || 1);
  url ? res.json({ url }) : res.status(404).json({ error: "영상을 찾지 못했습니다." });
});

// 2. 부산 버스 도착 정보 로직 (문서  기준)
// server.js (버스 API 부분만 수정)

app.get('/api/church-bus', async (req, res) => {
  const serviceKey = process.env.BUS_API_KEY;
  
  // 동해남부선송정역 정류장 ID (09007 또는 09006)
  // 송정해수욕장입구가 아닌 동해남부선송정역으로 변경
  const bstopId = '187600303'; // 동해남부선송정역 (09007) - 경자청 방향
  // 또는 '187600303' // 동해남부선송정역 (09006) - 청강리 방향
  
  const url = `http://apis.data.go.kr/6260000/BusanBIMS/stopArrByBstopid`;

  try {
    const response = await axios.get(url, {
      params: { 
        serviceKey: serviceKey,
        bstopid: bstopId 
      },
      timeout: 5000
    });

    const parser = new xml2js.Parser({ explicitArray: false });
    const result = await parser.parseStringPromise(response.data);

    const resultCode = result?.response?.header?.resultCode;
    if (resultCode !== '00') {
      console.error('API Error:', result?.response?.header?.resultMsg);
      return res.json({ min: null, message: "버스 정보 조회 실패" });
    }

    const items = result?.response?.body?.items?.item;
    if (!items) {
      return res.json({ min: null, message: "운행 중인 버스 없음" });
    }

    const itemList = Array.isArray(items) ? items : [items];
    const myBus = itemList.find(bus => bus.lineno === '3006');

    if (myBus && myBus.min1) {
      const arrivalMin = parseInt(myBus.min1);
      if (!isNaN(arrivalMin)) {
        res.json({ 
          busNum: '3006', 
          min: arrivalMin,
          station: myBus.station1 || '정보없음',
          stopName: '동해남부선송정역' // 정류장 이름 추가
        });
      } else {
        res.json({ min: null, message: "도착 정보 없음" });
      }
    } else {
      res.json({ min: null, message: "3006번 정보 없음" });
    }
  } catch (error) {
    console.error('Bus API Error:', error.message);
    res.status(500).json({ min: null, message: "서버 연결 실패" });
  }
});


app.listen(PORT, () => console.log(`✅ 서버 구동 중: http://localhost:${PORT}`));