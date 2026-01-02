# 📦 배포 가이드

할매 프로젝트를 실제 서비스로 배포하는 방법입니다.

## 🎯 배포 전략

프론트엔드와 백엔드를 분리하여 배포합니다:
- **프론트엔드**: 정적 호스팅 서비스 (Vercel, Netlify 등)
- **백엔드**: 서버 호스팅 서비스 (Railway, Render 등)

## 📱 Option 1: Vercel + Railway (추천)

가장 간단하고 무료로 시작할 수 있는 방법입니다.

### 백엔드 배포 (Railway)

1. **Railway 계정 생성**
   - [Railway.app](https://railway.app/) 접속
   - GitHub 계정으로 로그인

2. **새 프로젝트 생성**
   - "New Project" 클릭
   - "Deploy from GitHub repo" 선택
   - 저장소 선택

3. **환경 변수 설정**
   - 프로젝트 > "Variables" 탭
   - 다음 환경 변수 추가:
     ```
     BUS_API_KEY=실제_버스_API_키
     YOUTUBE_API_KEY=실제_유튜브_API_키
     WEATHER_API_KEY=실제_날씨_API_키
     PORT=5000
     ```

4. **루트 디렉토리 설정**
   - Settings > "Root Directory" 설정: `server`
   - "Start Command": `npm start`

5. **배포 URL 확인**
   - 배포가 완료되면 URL 생성 (예: `https://your-app.railway.app`)
   - 이 URL을 복사해둡니다

### 프론트엔드 배포 (Vercel)

1. **Vercel 계정 생성**
   - [Vercel.com](https://vercel.com/) 접속
   - GitHub 계정으로 로그인

2. **새 프로젝트 Import**
   - "Add New" > "Project" 클릭
   - GitHub 저장소 선택

3. **프로젝트 설정**
   - Root Directory: `client`
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **환경 변수 설정**
   - "Environment Variables" 섹션에서 추가:
     ```
     VITE_API_URL=https://your-app.railway.app/api
     ```
   - (Railway에서 받은 백엔드 URL 사용)

5. **배포**
   - "Deploy" 클릭
   - 배포 완료 후 URL 확인 (예: `https://your-app.vercel.app`)

---

## 📱 Option 2: Netlify + Render

### 백엔드 배포 (Render)

1. **Render 계정 생성**
   - [Render.com](https://render.com/) 접속
   - GitHub 계정으로 로그인

2. **새 Web Service 생성**
   - "New +" > "Web Service"
   - GitHub 저장소 연결

3. **서비스 설정**
   - Name: `halmeoni-server`
   - Root Directory: `server`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **환경 변수 설정**
   - "Environment" 탭에서 추가:
     ```
     BUS_API_KEY=실제_버스_API_키
     YOUTUBE_API_KEY=실제_유튜브_API_키
     WEATHER_API_KEY=실제_날씨_API_키
     ```

5. **배포 URL 확인**
   - 배포 완료 후 URL 복사

### 프론트엔드 배포 (Netlify)

1. **Netlify 계정 생성**
   - [Netlify.com](https://netlify.com/) 접속
   - GitHub 계정으로 로그인

2. **새 사이트 추가**
   - "Add new site" > "Import an existing project"
   - GitHub 저장소 선택

3. **빌드 설정**
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `client/dist`

4. **환경 변수 설정**
   - Site settings > "Environment variables"
   - 추가:
     ```
     VITE_API_URL=https://your-app.onrender.com/api
     ```

5. **배포**
   - "Deploy site" 클릭

---

## 📱 Option 3: AWS (고급)

프로페셔널한 배포를 원하는 경우.

### 백엔드 (AWS EC2 + PM2)

1. **EC2 인스턴스 생성**
   - Ubuntu 22.04 LTS
   - t2.micro (프리티어)
   - 보안 그룹: HTTP(80), HTTPS(443), Custom(5000) 열기

2. **서버 설정**
   ```bash
   # Node.js 설치
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # PM2 설치 (프로세스 관리자)
   sudo npm install -g pm2
   
   # 프로젝트 클론
   git clone <your-repo-url>
   cd halmeoni_project/server
   
   # 의존성 설치
   npm install
   
   # 환경 변수 설정
   nano .env
   # (API 키들 입력)
   
   # PM2로 서버 실행
   pm2 start src/server.js --name halmeoni-server
   pm2 startup
   pm2 save
   ```

3. **Nginx 리버스 프록시 설정**
   ```bash
   sudo apt install nginx
   sudo nano /etc/nginx/sites-available/halmeoni
   ```
   
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   
   ```bash
   sudo ln -s /etc/nginx/sites-available/halmeoni /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

### 프론트엔드 (AWS S3 + CloudFront)

1. **S3 버킷 생성**
   - 버킷 이름: `halmeoni-app`
   - 정적 웹사이트 호스팅 활성화

2. **빌드 및 업로드**
   ```bash
   cd client
   
   # 환경 변수 설정
   echo "VITE_API_URL=https://your-ec2-domain.com/api" > .env.production
   
   # 빌드
   npm run build
   
   # S3에 업로드 (AWS CLI 필요)
   aws s3 sync dist/ s3://halmeoni-app --delete
   ```

3. **CloudFront 배포**
   - CloudFront distribution 생성
   - Origin: S3 버킷
   - 도메인 연결 (선택사항)

---

## 🔒 보안 설정

### CORS 설정 업데이트

배포 후 서버의 CORS 설정을 업데이트하세요:

[server/src/server.js](../server/src/server.js):
```javascript
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://your-app.vercel.app',  // 프론트엔드 URL
  ],
  credentials: true
};
app.use(cors(corsOptions));
```

### API 키 보안

- 절대 API 키를 코드에 직접 넣지 마세요
- 환경 변수만 사용하세요
- `.env` 파일은 `.gitignore`에 포함되어 있습니다

---

## 📊 모니터링

### Railway/Render
- 대시보드에서 실시간 로그 확인 가능
- 자동 재시작 기능 제공

### PM2 (AWS)
```bash
# 로그 확인
pm2 logs halmeoni-server

# 상태 확인
pm2 status

# 재시작
pm2 restart halmeoni-server
```

---

## 🔄 업데이트 배포

### Vercel/Netlify/Railway
- GitHub에 push하면 자동으로 재배포됩니다
- `main` 브랜치에 병합하면 프로덕션 배포

### AWS
```bash
cd halmeoni_project
git pull
cd server
npm install
pm2 restart halmeoni-server
```

---

## 📱 할머니께 전달하기

1. **배포된 URL을 홈 화면에 추가**
   - iOS: Safari에서 공유 > 홈 화면에 추가
   - Android: Chrome에서 메뉴 > 홈 화면에 추가

2. **아이콘 설정**
   - 예쁜 아이콘으로 설정하면 앱처럼 사용 가능

3. **북마크 저장**
   - 할머니 휴대폰 브라우저에 즐겨찾기 추가

---

## 💡 유용한 팁

### 무료 도메인
- [Freenom](https://www.freenom.com/) - 무료 도메인 제공
- Vercel/Netlify - 무료 서브도메인 제공

### SSL 인증서
- Vercel/Netlify/Railway - 자동 HTTPS 제공
- AWS - Let's Encrypt 무료 SSL

### 비용 절감
- Railway: $5/월 크레딧 제공
- Render: 750시간/월 무료
- AWS: 프리티어 12개월 무료

---

## 🆘 문제 해결

### 배포 후 API가 안 돼요
- 환경 변수가 올바르게 설정되었는지 확인
- CORS 설정에 프론트엔드 URL이 포함되었는지 확인
- 서버 로그 확인

### 빌드가 실패해요
- Node.js 버전 확인 (18+ 필요)
- 의존성 버전 충돌 확인: `npm install`

### 모바일에서 느려요
- 이미지 최적화
- API 응답 캐싱 추가
- CDN 사용 (CloudFront, Cloudflare 등)

---

배포 완료 후 할머니께 자랑하세요! 🎉
