const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// 버스 관련 API
router.get('/church-bus', apiController.getChurchBus);

// 유튜브 + 성경 본문 관련 API
router.get('/latest-bible', apiController.getLatestBible);  // 새 API: 영상 + 본문
router.get('/latest-video', apiController.getLatestVideo);   // 기존 API: 영상만

// 날씨 관련 API
router.get('/weather', apiController.getCurrentWeather);

// 성경 말씀 관련 API
router.get('/daily-verse', apiController.getDailyVerse);
router.get('/random-verse', apiController.getRandomVerse);

module.exports = router;
