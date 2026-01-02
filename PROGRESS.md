# 🎯 프로젝트 진행 계획

## ✅ 완료된 작업 (리팩토링)

### 1. 서버 구조 개선
- ✅ MVC 패턴으로 리팩토링
- ✅ Services 레이어 분리
  - `busService.js` - 버스 도착 정보
  - `youtubeService.js` - 유튜브 영상 조회
  - `weatherService.js` - 날씨 정보 (신규 추가)
  - `bibleService.js` - 성경 말씀 (신규 추가)
- ✅ Controllers 레이어 분리
- ✅ Routes 분리
- ✅ 환경 변수 관리 개선

### 2. 클라이언트 구조 개선
- ✅ 컴포넌트 분리
  - `Header.tsx` - 날씨 및 이벤트 헤더
  - `MenuButton.tsx` - 재사용 가능한 메뉴 버튼
  - `BibleVerse.tsx` - 오늘의 말씀 표시
- ✅ API 서비스 레이어 분리 (`services/api.ts`)
- ✅ 유틸리티 함수 분리 (`utils/navigation.ts`)
- ✅ TypeScript 타입 정의 개선

### 3. 신규 기능 추가
- ✅ 실시간 날씨 정보 (기상청 API)
- ✅ 오늘의 성경 말씀 (날짜 기반 순환)
- ✅ 요일별 이벤트 표시 (주일 예배, 화요집회)

### 4. 문서화
- ✅ README.md - 프로젝트 전체 가이드
- ✅ DEPLOYMENT.md - 배포 가이드
- ✅ API_KEYS_GUIDE.md - API 키 발급 가이드
- ✅ 환경 변수 예시 파일 (.env.example)

---

## 📂 현재 프로젝트 구조

```
halmeoni_project/
│
├── client/                          # 프론트엔드
│   ├── src/
│   │   ├── components/              # UI 컴포넌트
│   │   │   ├── Header.tsx          # 날씨/이벤트 헤더
│   │   │   ├── MenuButton.tsx      # 메뉴 버튼
│   │   │   └── BibleVerse.tsx      # 성경 말씀
│   │   ├── services/
│   │   │   └── api.ts              # API 통신 레이어
│   │   ├── utils/
│   │   │   └── navigation.ts       # 네비게이션 유틸
│   │   ├── types/
│   │   │   └── index.ts            # TypeScript 타입
│   │   ├── App.tsx                 # 메인 앱
│   │   ├── App.css
│   │   ├── main.tsx
│   │   └── index.css
│   ├── .env                         # 환경 변수
│   ├── .env.example
│   └── package.json
│
├── server/                          # 백엔드
│   ├── src/
│   │   ├── services/                # 비즈니스 로직
│   │   │   ├── busService.js       # 버스 API
│   │   │   ├── youtubeService.js   # 유튜브 API
│   │   │   ├── weatherService.js   # 날씨 API
│   │   │   └── bibleService.js     # 성경 말씀
│   │   ├── controllers/
│   │   │   └── apiController.js    # API 컨트롤러
│   │   ├── routes/
│   │   │   └── api.js              # 라우트 정의
│   │   └── server.js               # 서버 진입점
│   ├── index.js                     # (기존 파일, 사용 안 함)
│   ├── .env                         # 환경 변수
│   ├── .env.example
│   └── package.json
│
├── README.md                        # 프로젝트 가이드
├── DEPLOYMENT.md                    # 배포 가이드
├── API_KEYS_GUIDE.md                # API 키 발급 가이드
├── PROGRESS.md                      # 이 파일
└── .gitignore                       # Git 제외 파일

```

---

## 🔄 다음 단계 (앞으로 해야 할 일)

### Phase 1: API 키 설정 및 테스트 (우선순위: ⭐⭐⭐)

1. **API 키 발급**
   - [ ] 부산 버스 API 키 발급 ([가이드](API_KEYS_GUIDE.md#-부산-버스-api-키-발급))
   - [ ] 유튜브 API 키 발급 ([가이드](API_KEYS_GUIDE.md#-유튜브-api-키-발급))
   - [ ] 기상청 날씨 API 키 발급 ([가이드](API_KEYS_GUIDE.md#-기상청-날씨-api-키-발급))

2. **환경 변수 설정**
   ```bash
   cd server
   cp .env.example .env
   # .env 파일에 API 키 입력
   ```

3. **로컬 테스트**
   ```bash
   # 터미널 1: 서버 실행
   cd server
   npm install
   npm run dev
   
   # 터미널 2: 클라이언트 실행
   cd client
   npm install
   npm run dev
   ```

4. **기능 테스트**
   - [ ] 버스 도착 정보 확인
   - [ ] 주일 메세지 영상 링크 작동 확인
   - [ ] 날씨 정보 표시 확인
   - [ ] 오늘의 말씀 표시 확인
   - [ ] 네이버 지도 길찾기 작동 확인

---

### Phase 2: 커스터마이징 (우선순위: ⭐⭐)

#### A. 교회 정보 업데이트

1. **버스 정보**
   - [ ] 실제 정류장 ID 확인 및 변경
   - [ ] 실제 버스 번호 확인 (3006번이 맞는지)
   - 파일: `server/src/services/busService.js`

2. **교회 위치**
   - [ ] 실제 교회 좌표 확인 (네이버 지도에서)
   - 파일: `client/src/utils/navigation.ts`
   ```typescript
   church: { lat: 35.0768, lng: 129.0718, name: '임마누엘교회' }
   ```

3. **집 위치**
   - [ ] 할머니 집 실제 좌표 입력
   - 파일: `client/src/utils/navigation.ts`
   ```typescript
   home: { lat: 35.1796, lng: 129.0756, name: '우리집' }
   ```

#### B. 유튜브 채널 설정

1. **채널 확인**
   - [ ] 교회 유튜브 채널 ID 확인
   - [ ] Uploads Playlist ID 확인
   - 파일: `server/src/services/youtubeService.js`

2. **검색어 조정**
   - [ ] 주일 메세지 영상 제목 패턴 확인
   - [ ] 필요시 검색어 변경 (현재: "주일 1부", "주일 2부")

#### C. 날씨 위치 설정

1. **격자 좌표 확인**
   - [ ] 할머니가 사는 지역의 격자 좌표(nx, ny) 확인
   - [격자 좌표 가이드](API_KEYS_GUIDE.md#-격자-좌표nxny-찾기)
   - 파일: `server/src/services/weatherService.js`
   ```javascript
   this.nx = 98; // 변경 필요
   this.ny = 76; // 변경 필요
   ```

#### D. 성경 말씀 추가

1. **더 많은 말씀 추가**
   - [ ] 할머니가 좋아하시는 성경 구절 추가
   - 파일: `server/src/services/bibleService.js`
   ```javascript
   this.verses = [
     { reference: "요한복음 3:16", text: "..." },
     // 여기에 더 추가
   ];
   ```

---

### Phase 3: UI/UX 개선 (우선순위: ⭐)

#### A. 디자인 커스터마이징

1. **색상 테마**
   - [ ] 할머니가 선호하는 색상으로 변경
   - 파일: `client/src/App.tsx`, `client/src/components/*.tsx`

2. **글씨 크기**
   - [ ] 할머니가 보기 편한 크기로 조정
   - 현재: 26px (메뉴), 24px (헤더)

3. **버튼 크기**
   - [ ] 필요시 버튼 크기 조정
   - 현재: 30px 패딩

#### B. 추가 기능

1. **할 일 기능 구현**
   - [ ] 간단한 할 일 목록 추가
   - [ ] localStorage 사용하여 저장
   - 현재: 알림만 표시

2. **알림 기능**
   - [ ] 주일/화요일 알림 (선택사항)
   - [ ] 브라우저 알림 권한 요청

3. **쿠팡 바로가기**
   - [ ] 쿠팡 링크 추가 (할머니 요청사항)
   - [ ] 또는 쇼핑 가이드 링크

---

### Phase 4: 배포 (우선순위: ⭐⭐⭐)

#### A. 배포 플랫폼 선택

**추천: Vercel (프론트) + Railway (백엔드)**
- 무료
- 간단한 설정
- 자동 배포

1. **백엔드 배포 (Railway)**
   - [ ] Railway 계정 생성
   - [ ] GitHub 연동
   - [ ] 환경 변수 설정
   - [ ] 배포 및 URL 확인
   - [자세한 가이드](DEPLOYMENT.md#백엔드-배포-railway)

2. **프론트엔드 배포 (Vercel)**
   - [ ] Vercel 계정 생성
   - [ ] GitHub 연동
   - [ ] 환경 변수 설정 (백엔드 URL)
   - [ ] 배포 및 URL 확인
   - [자세한 가이드](DEPLOYMENT.md#프론트엔드-배포-vercel)

#### B. 할머니 휴대폰 설정

1. **홈 화면 추가**
   - [ ] 배포된 URL을 휴대폰 홈 화면에 추가
   - iOS: Safari > 공유 > 홈 화면에 추가
   - Android: Chrome > 메뉴 > 홈 화면에 추가

2. **즐겨찾기 등록**
   - [ ] 브라우저 즐겨찾기에도 추가

3. **사용법 안내**
   - [ ] 할머니께 기능별 사용법 설명
   - [ ] 간단한 사용 가이드 작성 (인쇄)

---

### Phase 5: 모니터링 및 유지보수 (우선순위: ⭐)

1. **정기 점검**
   - [ ] 주 1회 기능 작동 확인
   - [ ] API 키 만료 확인
   - [ ] 로그 확인

2. **피드백 수집**
   - [ ] 할머니 사용 후기 듣기
   - [ ] 불편한 점 개선
   - [ ] 추가 기능 요청 반영

3. **업데이트**
   - [ ] 버그 수정
   - [ ] 성경 말씀 추가
   - [ ] UI 개선

---

## 🎯 단계별 시간 예상

| Phase | 작업 내용 | 예상 시간 |
|-------|----------|----------|
| Phase 1 | API 키 설정 및 테스트 | 1-2시간 |
| Phase 2 | 커스터마이징 | 2-3시간 |
| Phase 3 | UI/UX 개선 (선택) | 1-2시간 |
| Phase 4 | 배포 | 1시간 |
| Phase 5 | 유지보수 (지속) | 주 30분 |

**총 예상 시간: 5-8시간**

---

## 📞 도움이 필요하면

1. **API 관련**: [API_KEYS_GUIDE.md](API_KEYS_GUIDE.md)
2. **배포 관련**: [DEPLOYMENT.md](DEPLOYMENT.md)
3. **프로젝트 전체**: [README.md](README.md)

---

## 🎉 체크리스트

프로젝트 완성을 위한 최소 체크리스트:

- [ ] API 키 3개 발급 완료
- [ ] 로컬 테스트 성공
- [ ] 교회/집 위치 정보 정확히 설정
- [ ] 버스 정보 실제 데이터로 확인
- [ ] 유튜브 영상 자동 로드 작동 확인
- [ ] 배포 완료
- [ ] 할머니 휴대폰에 설치
- [ ] 할머니께 사용법 안내

**모든 항목 완료 시: 할머니께 자랑하기! 🎉**

---

제작일: 2026년 1월
목적: 할머니의 편리한 디지털 생활을 위하여 ❤️
