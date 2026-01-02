const busService = require('../services/busService');
const youtubeService = require('../services/youtubeService');
const weatherService = require('../services/weatherService');
const bibleService = require('../services/bibleService');
const bibleTextService = require('../services/bibleTextService');

/**
 * 버스 도착 정보 조회
 */
async function getChurchBus(req, res) {
  try {
    const result = await busService.getChurchBusArrival();
    
    if (result.success) {
      res.json({
        busNum: result.busNum,
        min: result.min,
        station: result.station,
        stopName: result.stopName
      });
    } else {
      res.json({
        min: null,
        message: result.message
      });
    }
  } catch (error) {
    console.error('Bus Controller Error:', error);
    res.status(500).json({
      min: null,
      message: '서버 오류'
    });
  }
}

/**
 * 유튜브 최신 영상 및 성경 본문 조회
 */
async function getLatestBible(req, res) {
  try {
    const part = parseInt(req.query.part) || 1;
    
    // 1. 유튜브 영상 조회 (성경 구절 포함)
    const videoResult = await youtubeService.getLatestSermon(part);
    
    if (!videoResult.success) {
      return res.status(404).json({
        error: videoResult.message
      });
    }

    // 2. 성경 구절이 없으면 영상 정보만 반환
    if (!videoResult.reference) {
      return res.json({
        url: videoResult.url,
        title: videoResult.title,
        reference: null,
        verses: null,
        message: '본문 정보를 찾을 수 없습니다.'
      });
    }

    // 3. 성경 본문 조회
    const bibleResult = await bibleTextService.getByReference(videoResult.reference);
    
    res.json({
      url: videoResult.url,
      title: videoResult.title,
      reference: videoResult.reference,
      verses: bibleResult.success ? bibleResult.verses : null,
      verseCount: bibleResult.success ? bibleResult.count : 0,
      bibleMessage: bibleResult.success ? null : bibleResult.message
    });

  } catch (error) {
    console.error('Bible Controller Error:', error);
    res.status(500).json({
      error: '서버 오류'
    });
  }
}

/**
 * 유튜브 최신 영상만 조회 (기존 호환성)
 */
async function getLatestVideo(req, res) {
  try {
    const part = parseInt(req.query.part) || 1;
    const result = await youtubeService.getLatestSermon(part);
    
    if (result.success) {
      res.json({
        url: result.url,
        title: result.title
      });
    } else {
      res.status(404).json({
        error: result.message
      });
    }
  } catch (error) {
    console.error('YouTube Controller Error:', error);
    res.status(500).json({
      error: '서버 오류'
    });
  }
}

/**
 * 현재 날씨 정보 조회
 */
async function getCurrentWeather(req, res) {
  try {
    const result = await weatherService.getCurrentWeather();
    
    if (result.success) {
      res.json({
        temp: result.temp,
        condition: result.condition,
        icon: result.icon
      });
    } else {
      res.status(404).json({
        error: result.message
      });
    }
  } catch (error) {
    console.error('Weather Controller Error:', error);
    res.status(500).json({
      error: '서버 오류'
    });
  }
}

/**
 * 오늘의 성경 말씀 조회
 */
function getDailyVerse(req, res) {
  try {
    const result = bibleService.getDailyVerse();
    res.json(result);
  } catch (error) {
    console.error('Bible Controller Error:', error);
    res.status(500).json({
      error: '서버 오류'
    });
  }
}

/**
 * 랜덤 성경 말씀 조회
 */
function getRandomVerse(req, res) {
  try {
    const result = bibleService.getRandomVerse();
    res.json(result);
  } catch (error) {
    console.error('Bible Controller Error:', error);
    res.status(500).json({
      error: '서버 오류'
    });
  }
}

module.exports = {
  getChurchBus,
  getLatestBible,    // 새로운 API
  getLatestVideo,    // 기존 API (호환성)
  getCurrentWeather,
  getDailyVerse,
  getRandomVerse
};
