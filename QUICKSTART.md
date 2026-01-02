# 🚀 빠른 시작 가이드

할매 프로젝트를 5분 안에 실행하는 방법!

## ⚡ 초간단 시작 (개발 모드)

### 1단계: API 키 설정 (2분)

```bash
# 서버 환경 변수 설정
cd server
cp .env.example .env
```

`.env` 파일 편집:
```env
PORT=5000
BUS_API_KEY=발급받은_버스_API_키
YOUTUBE_API_KEY=발급받은_유튜브_API_키
WEATHER_API_KEY=발급받은_날씨_API_키
```

> 💡 **API 키가 없다면?** 
> - 일단 더미 값으로 시작 가능 (기능은 작동 안 함)
> - 나중에 [API_KEYS_GUIDE.md](API_KEYS_GUIDE.md)를 보고 발급

---

### 2단계: 서버 실행 (1분)

**터미널 1 (서버)**:
```bash
cd server
npm install
npm run dev
```

✅ 성공 메시지:
```
✅ 할매 프로젝트 서버 구동 중: http://localhost:5000
📍 API 엔드포인트: http://localhost:5000/api
🏥 헬스 체크: http://localhost:5000/health
```

---

### 3단계: 클라이언트 실행 (1분)

**터미널 2 (클라이언트)**:
```bash
cd client
npm install
npm run dev
```

✅ 성공 메시지:
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

### 4단계: 브라우저에서 확인 (30초)

브라우저를 열고 `http://localhost:5173` 접속!

🎉 **완료!** 할매 프로젝트가 실행됩니다.

---

## 🛠️ 문제 해결

### 포트가 이미 사용 중입니다
```bash
# 5000 포트 사용 중인 프로세스 종료
# Windows PowerShell:
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process
```

### npm install 에러
```bash
# 노드 버전 확인
node -v  # 18 이상이어야 함

# 캐시 클리어
npm cache clean --force
npm install
```

### API가 작동하지 않습니다
1. API 키가 올바르게 설정되었는지 확인
2. 서버가 실행 중인지 확인 (`http://localhost:5000/health`)
3. 서버 터미널에서 에러 로그 확인

---

## 📱 모바일에서 테스트하기

### 같은 Wi-Fi에 연결된 경우

1. **서버의 네트워크 IP 확인**
   ```bash
   # Windows PowerShell:
   ipconfig | Select-String IPv4
   # 예: 192.168.0.10
   ```

2. **클라이언트 환경 변수 변경**
   ```bash
   # client/.env
   VITE_API_URL=http://192.168.0.10:5000/api
   ```

3. **클라이언트 재시작**
   ```bash
   # Ctrl+C로 중단 후
   npm run dev -- --host
   ```

4. **스마트폰 브라우저에서 접속**
   ```
   http://192.168.0.10:5173
   ```

---

## 🎯 다음 단계

### API 키 발급하기
실제 기능을 사용하려면 API 키가 필요합니다:
- [API 키 발급 가이드](API_KEYS_GUIDE.md) 참조
- 소요 시간: 약 1-2시간

### 커스터마이징하기
할머니에 맞게 설정 변경:
- 교회/집 위치 설정
- 버스 노선 및 정류장 변경
- 날씨 지역 설정
- [PROGRESS.md](PROGRESS.md) Phase 2 참조

### 배포하기
실제 서비스로 배포:
- [DEPLOYMENT.md](DEPLOYMENT.md) 참조
- 추천: Vercel + Railway (무료)
- 소요 시간: 약 1시간

---

## 📚 전체 문서

| 문서 | 내용 | 소요 시간 |
|------|------|----------|
| [README.md](README.md) | 프로젝트 전체 가이드 | 10분 읽기 |
| [API_KEYS_GUIDE.md](API_KEYS_GUIDE.md) | API 키 발급 방법 | 1-2시간 |
| [DEPLOYMENT.md](DEPLOYMENT.md) | 배포 가이드 | 1시간 |
| [PROGRESS.md](PROGRESS.md) | 진행 단계 및 체크리스트 | 5분 읽기 |
| [ARCHITECTURE.md](ARCHITECTURE.md) | 시스템 구조 설명 | 15분 읽기 |
| **QUICKSTART.md** | **이 문서** | **5분** |

---

## 💡 유용한 명령어

### 개발 중
```bash
# 서버 자동 재시작 (코드 변경 시)
cd server
npm run dev

# 클라이언트 개발 서버 (HMR)
cd client
npm run dev
```

### 빌드
```bash
# 프로덕션 빌드
cd client
npm run build

# 빌드 결과 미리보기
npm run preview
```

### 테스트
```bash
# API 엔드포인트 테스트
curl http://localhost:5000/health
curl http://localhost:5000/api/daily-verse
```

---

## 🎉 시작 완료!

프로젝트가 실행되었다면 이제 개발을 시작할 준비가 되었습니다!

**다음 할 일:**
1. ✅ 프로젝트 실행 완료
2. 📝 [PROGRESS.md](PROGRESS.md)의 체크리스트 따라가기
3. 🔧 커스터마이징
4. 🚀 배포
5. ❤️ 할머니께 자랑하기!

---

**문제가 있나요?** 
- 각 문서의 "문제 해결" 섹션 참조
- 에러 로그를 자세히 확인
- 환경 변수 설정 재확인

**행복한 코딩 되세요! 🎈**
