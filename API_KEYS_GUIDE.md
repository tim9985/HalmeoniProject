# API 키 발급 가이드

할매 프로젝트에 필요한 API 키를 발급받는 방법을 상세히 안내합니다.

## 🚌 부산 버스 API 키 발급

### 1. 공공데이터포털 회원가입

1. [공공데이터포털](https://www.data.go.kr/) 접속
2. 우측 상단 "회원가입" 클릭
3. 개인 회원으로 가입 (본인인증 필요)

### 2. API 활용신청

1. 로그인 후 검색창에 "부산 버스정보시스템" 입력
2. **"부산광역시_버스정보시스템 정류소별 도착 정보 조회 서비스"** 선택
   - 또는 직접 링크: https://www.data.go.kr/data/15067528/openapi.do
3. "활용신청" 버튼 클릭
4. 상세기능정보에서 **모든 항목 체크** (선택)
5. "활용목적" 입력:
   ```
   가족 할머니를 위한 개인 맞춤 웹 서비스 개발
   부산 3006번 버스 실시간 도착 정보 제공 목적
   ```
6. "신청" 클릭

### 3. 승인 대기

- 일반적으로 즉시 승인됨 (자동 승인)
- 드물게 1-2시간 소요

### 4. API 키 확인

1. 마이페이지 > "오픈API" 탭
2. 신청한 API 찾기
3. **일반 인증키 (Encoding)** 복사
   - ⚠️ **Decoding 키가 아닌 Encoding 키를 사용하세요!**

### 5. 서버 환경 변수에 설정

```bash
cd server
nano .env
```

```env
BUS_API_KEY=복사한_API_키_여기에_붙여넣기
```

---

## 📺 유튜브 API 키 발급

### 1. Google Cloud Console 접속

1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. Google 계정으로 로그인

### 2. 새 프로젝트 생성

1. 상단의 프로젝트 선택 드롭다운 클릭
2. "새 프로젝트" 클릭
3. 프로젝트 이름: `Halmeoni-Project`
4. "만들기" 클릭

### 3. YouTube Data API v3 활성화

1. 왼쪽 메뉴에서 "API 및 서비스" > "라이브러리"
2. 검색창에 "YouTube Data API v3" 입력
3. 검색 결과에서 "YouTube Data API v3" 클릭
4. "사용" 버튼 클릭

### 4. API 키 생성

1. 왼쪽 메뉴에서 "API 및 서비스" > "사용자 인증 정보"
2. 상단의 "+ 사용자 인증 정보 만들기" 클릭
3. "API 키" 선택
4. API 키가 생성되면 복사

### 5. API 키 제한 설정 (선택사항, 보안 강화)

1. 생성된 API 키 옆 편집 아이콘 클릭
2. "API 제한사항" 섹션에서 "키 제한" 선택
3. "YouTube Data API v3"만 체크
4. "저장" 클릭

### 6. 할당량 확인

- 무료: 일일 10,000 유닛
- 주일 메세지 조회는 약 3유닛/요청
- 하루에 3,000회 이상 충분히 사용 가능

### 7. 서버 환경 변수에 설정

```env
YOUTUBE_API_KEY=복사한_API_키_여기에_붙여넣기
```

---

## ☀️ 기상청 날씨 API 키 발급

### 1. 공공데이터포털 로그인

1. [공공데이터포털](https://www.data.go.kr/) 접속
2. 로그인 (위에서 만든 계정 사용)

### 2. API 활용신청

1. 검색창에 "기상청 단기예보" 입력
2. **"기상청_단기예보 ((구)_동네예보) 조회서비스"** 선택
   - 또는 직접 링크: https://www.data.go.kr/data/15084084/openapi.do
3. "활용신청" 버튼 클릭
4. 상세기능정보에서 필요한 항목 체크:
   - ✅ 초단기실황조회
   - ✅ 초단기예보조회
5. "활용목적" 입력:
   ```
   가족 할머니를 위한 개인 웹 서비스
   부산 지역 실시간 날씨 정보 제공
   ```
6. "신청" 클릭

### 3. 승인 대기

- 즉시 승인 또는 1-2시간 소요

### 4. API 키 확인

1. 마이페이지 > "오픈API"
2. 신청한 날씨 API 찾기
3. **일반 인증키 (Encoding)** 복사

### 5. 서버 환경 변수에 설정

```env
WEATHER_API_KEY=복사한_API_키_여기에_붙여넣기
```

---

## 🔍 격자 좌표(nx, ny) 찾기

날씨 API는 위도/경도가 아닌 기상청 격자 좌표를 사용합니다.

### 부산 주요 지역 격자 좌표

| 지역 | nx | ny |
|------|----|----|
| 해운대구 (송정) | 98 | 76 |
| 부산진구 | 98 | 75 |
| 동래구 | 98 | 76 |
| 수영구 | 99 | 75 |
| 남구 | 98 | 75 |

### 다른 지역 좌표 찾기

1. [기상청 격자 좌표 변환 도구](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15084084) 다운로드
2. 엑셀 파일에서 지역명으로 검색
3. 해당하는 격자 X, Y 값 확인

### 서버 코드에 좌표 설정

[server/src/services/weatherService.js](../server/src/services/weatherService.js):

```javascript
constructor() {
  // ... 
  this.nx = 98; // 격자 X (변경)
  this.ny = 76; // 격자 Y (변경)
}
```

---

## ✅ API 키 설정 확인

### 최종 .env 파일 예시

```env
# 서버 포트
PORT=5000

# 부산 버스 API 키
BUS_API_KEY=abcdefghijklmnop1234567890%2B%3D%3D

# 유튜브 API 키
YOUTUBE_API_KEY=AIzaSyAaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQq

# 기상청 날씨 API 키
WEATHER_API_KEY=abcdefghijklmnop1234567890%2B%3D%3D
```

### 테스트하기

```bash
cd server
npm run dev
```

브라우저에서 테스트:
- 버스: `http://localhost:5000/api/church-bus`
- 날씨: `http://localhost:5000/api/weather`
- 유튜브: `http://localhost:5000/api/latest-video?part=1`

---

## ⚠️ 주의사항

### API 키 보안

- ❌ GitHub에 API 키 푸시 금지
- ❌ 코드에 직접 하드코딩 금지
- ✅ `.env` 파일에만 저장
- ✅ `.env`는 `.gitignore`에 포함되어 있음

### API 사용 제한

#### 공공데이터포털
- 일일 1,000 ~ 10,000건
- 초과 시 다음날 00시에 리셋

#### YouTube API
- 일일 10,000 유닛
- 조회 1건 ≈ 3유닛
- 할당량 초과 시:
  1. Google Cloud Console에서 할당량 증가 요청
  2. 또는 결제 정보 등록 (극히 저렴)

---

## 🆘 문제 해결

### "인증키가 유효하지 않습니다"
- Encoding 키를 사용했는지 확인
- API 키 앞뒤 공백 제거
- API 활용신청 승인 상태 확인

### "일일 트래픽 초과"
- 다음날까지 대기
- 또는 다른 계정으로 추가 API 키 발급

### "SERVICE KEY IS NOT REGISTERED ERROR"
- API 활용신청을 했는지 확인
- 승인 대기 중일 수 있음 (1-2시간)

### YouTube API가 작동하지 않음
- API 키가 올바른지 확인
- YouTube Data API v3가 활성화되었는지 확인
- 할당량을 초과하지 않았는지 확인

---

## 📞 고객센터

### 공공데이터포털
- 전화: 1577-0380
- 이메일: datamail@mcst.go.kr
- 운영시간: 평일 09:00-18:00

### Google Cloud Support
- [지원 센터](https://support.google.com/googleapi/)
- 커뮤니티 포럼 활용

---

API 키 발급 완료! 이제 서버를 실행할 준비가 되었습니다! 🎉
