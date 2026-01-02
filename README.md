# 🌸 할매 프로젝트

할머니를 위한 맞춤형 개인 웹사이트 - 교회, 날씨, 메세지, 성경 말씀을 한눈에!

## 📋 프로젝트 개요

어르신이 스마트폰으로 간편하게 사용할 수 있는 대형 버튼 UI의 맞춤형 웹 애플리케이션입니다.

### 주요 기능

1. **🚌 버스 도착 정보**: 교회 가는 3006번 버스 실시간 도착 시간
2. **🎥 주일 메세지**: 유튜브 최신 주일 1부/2부 메세지 자동 연결
3. **🙏 화요집회 신청**: 화요집회 신청 페이지 바로가기
4. **🗺️ 길찾기**: 교회/집 네이버 지도 길찾기 (앱/웹 자동 연결)
5. **☀️ 날씨 정보**: 실시간 부산 날씨 정보
6. **📖 오늘의 말씀**: 매일 바뀌는 성경 말씀

## 🏗️ 프로젝트 구조

```
halmeoni_project/
├── client/                # 프론트엔드 (React + TypeScript + Vite)
│   ├── src/
│   │   ├── components/    # UI 컴포넌트
│   │   │   ├── Header.tsx
│   │   │   ├── MenuButton.tsx
│   │   │   └── BibleVerse.tsx
│   │   ├── services/      # API 통신
│   │   │   └── api.ts
│   │   ├── utils/         # 유틸리티 함수
│   │   │   └── navigation.ts
│   │   ├── types/         # TypeScript 타입 정의
│   │   │   └── index.ts
│   │   ├── App.tsx        # 메인 앱
│   │   └── main.tsx       # 진입점
│   ├── .env.example       # 환경 변수 예시
│   └── package.json
│
└── server/                # 백엔드 (Node.js + Express)
    ├── src/
    │   ├── services/      # 비즈니스 로직
    │   │   ├── busService.js
    │   │   ├── youtubeService.js
    │   │   ├── weatherService.js
    │   │   └── bibleService.js
    │   ├── controllers/   # API 컨트롤러
    │   │   └── apiController.js
    │   ├── routes/        # 라우트 정의
    │   │   └── api.js
    │   └── server.js      # 서버 진입점
    ├── .env.example       # 환경 변수 예시
    └── package.json
```

## 🚀 시작하기

### 사전 요구사항

- Node.js 18+ 설치
- npm 또는 yarn 패키지 매니저

### 1. API 키 발급

#### 부산 버스 API
1. [공공데이터포털](https://www.data.go.kr/) 회원가입
2. [부산 버스정보시스템 API](https://www.data.go.kr/data/15067528/openapi.do) 활용신청
3. 발급받은 일반 인증키(Encoding) 복사

#### 유튜브 API
1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 새 프로젝트 생성
3. YouTube Data API v3 활성화
4. 사용자 인증 정보 > API 키 생성

#### 기상청 날씨 API
1. [공공데이터포털](https://www.data.go.kr/) 로그인
2. [기상청 단기예보 API](https://www.data.go.kr/data/15084084/openapi.do) 활용신청
3. 발급받은 일반 인증키(Encoding) 복사

### 2. 설치 및 설정

#### 서버 설정

```bash
cd server

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env

# .env 파일 편집하여 API 키 입력
# BUS_API_KEY=실제_버스_API_키
# YOUTUBE_API_KEY=실제_유튜브_API_키
# WEATHER_API_KEY=실제_날씨_API_키
```

#### 클라이언트 설정

```bash
cd client

# 의존성 설치
npm install

# 환경 변수 설정 (개발 환경은 기본값 사용 가능)
cp .env.example .env
```

### 3. 개발 서버 실행

#### 터미널 1: 백엔드 서버

```bash
cd server
npm run dev
# 서버가 http://localhost:5000 에서 실행됩니다
```

#### 터미널 2: 프론트엔드 개발 서버

```bash
cd client
npm run dev
# 클라이언트가 http://localhost:5173 에서 실행됩니다
```

브라우저에서 `http://localhost:5173`을 열어 애플리케이션을 확인하세요.

## 📡 API 엔드포인트

### 버스 정보
- **GET** `/api/church-bus`
- 응답: `{ busNum, min, station, stopName, message }`

### 유튜브 영상
- **GET** `/api/latest-video?part=1` (또는 2)
- 응답: `{ url, title }`

### 날씨 정보
- **GET** `/api/weather`
- 응답: `{ temp, condition, icon }`

### 성경 말씀
- **GET** `/api/daily-verse` - 오늘의 말씀
- **GET** `/api/random-verse` - 랜덤 말씀
- 응답: `{ reference, text, date }`

### 헬스 체크
- **GET** `/health`
- 응답: `{ status, message }`

## 🎨 UI/UX 특징

- **대형 버튼**: 어르신이 쉽게 누를 수 있는 큰 버튼 (30px 패딩)
- **큰 글씨**: 26px 폰트 크기로 가독성 향상
- **직관적 아이콘**: 기능별 색상과 아이콘으로 구분
- **모바일 최적화**: 스마트폰 화면에 최적화된 반응형 디자인
- **단순한 구조**: 한 화면에 모든 기능 배치

## 🔧 커스터마이징

### 교회/집 좌표 변경

[client/src/utils/navigation.ts](client/src/utils/navigation.ts) 파일에서 좌표 수정:

```typescript
const destinations = {
  church: { lat: 35.0768, lng: 129.0718, name: '임마누엘교회' },
  home: { lat: 35.1796, lng: 129.0756, name: '우리집' },
};
```

### 버스 노선 및 정류장 변경

[server/src/services/busService.js](server/src/services/busService.js) 파일에서 설정 수정:

```javascript
this.songjeongStationId = '187600303'; // 정류장 ID
// ... 
const bus3006 = itemList.find(bus => bus.lineno === '3006'); // 버스 번호
```

### 성경 말씀 추가

[server/src/services/bibleService.js](server/src/services/bibleService.js)의 `verses` 배열에 말씀 추가

## 📦 배포

### 프론트엔드 빌드

```bash
cd client
npm run build
# dist/ 폴더에 빌드 파일 생성
```

### 배포 옵션

1. **Vercel** (프론트엔드) + **Railway** (백엔드)
2. **Netlify** (프론트엔드) + **Render** (백엔드)
3. **AWS S3** (프론트엔드) + **AWS EC2** (백엔드)

자세한 배포 가이드는 [DEPLOYMENT.md](DEPLOYMENT.md)를 참조하세요.

## 🐛 문제 해결

### 버스 정보가 안 나와요
- BUS_API_KEY가 올바르게 설정되었는지 확인
- 정류장 ID가 정확한지 확인
- API 활용신청 승인 상태 확인

### 유튜브 영상이 안 나와요
- YOUTUBE_API_KEY가 올바르게 설정되었는지 확인
- YouTube Data API v3가 활성화되었는지 확인
- API 할당량 초과 여부 확인 (일일 10,000 유닛)

### 날씨 정보가 안 나와요
- WEATHER_API_KEY가 올바르게 설정되었는지 확인
- 좌표(nx, ny)가 정확한지 확인
- API 활용신청 승인 상태 확인

## 📝 라이선스

이 프로젝트는 개인 용도로 제작되었습니다.

## 🙏 감사의 말

할머니를 위한 사랑이 담긴 프로젝트입니다. ❤️

---

**만든이**: 사랑하는 손자/손녀  
**제작일**: 2026년 1월
