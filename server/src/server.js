const express = require('express');
const cors = require('cors');
require('dotenv').config();

const apiRoutes = require('./routes/api');
const { testConnection } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// 미들웨어
app.use(cors());
app.use(express.json());

// 라우트
app.use('/api', apiRoutes);

// 헬스 체크
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: '할매 프로젝트 서버 정상 작동 중' });
});

// 404 처리
app.use((req, res) => {
  res.status(404).json({ error: '요청하신 경로를 찾을 수 없습니다.' });
});

// 에러 핸들러
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });
});

// 서버 시작
app.listen(PORT, async () => {
  console.log(`✅ 할매 프로젝트 서버 구동 중: http://localhost:${PORT}`);
  console.log(`📍 API 엔드포인트: http://localhost:${PORT}/api`);
  console.log(`🏥 헬스 체크: http://localhost:${PORT}/health`);
  
  // 데이터베이스 연결 테스트
  const dbConnected = await testConnection();
  if (!dbConnected) {
    console.warn('⚠️  MySQL 데이터베이스 연결 실패 - 성경 본문 기능이 제한됩니다.');
    console.warn('   .env 파일에 DB 설정을 확인하세요.');
  }
});

module.exports = app;
