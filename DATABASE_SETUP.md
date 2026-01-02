# MySQL 데이터베이스 설정 가이드

## 📚 성경 본문 데이터베이스 설치

### 1. MySQL 설치

#### Windows
1. [MySQL Community Server](https://dev.mysql.com/downloads/mysql/) 다운로드
2. 설치 프로그램 실행
3. root 비밀번호 설정 (기억하세요!)

#### macOS (Homebrew)
```bash
brew install mysql
brew services start mysql
mysql_secure_installation
```

---

### 2. 데이터베이스 및 테이블 생성

MySQL에 접속:
```bash
mysql -u root -p
```

데이터베이스 생성:
```sql
CREATE DATABASE halmeoni_bible CHARACTER SET utf8 COLLATE utf8_general_ci;
USE halmeoni_bible;
```

테이블 구조 (전체 SQL 파일에 포함됨):
```sql
CREATE TABLE IF NOT EXISTS `bible2` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `cate` int(11) NOT NULL,
  `book` int(11) NOT NULL,
  `chapter` int(11) NOT NULL,
  `paragraph` int(11) NOT NULL COMMENT '절 번호',
  `sentence` tinytext NOT NULL COMMENT '본문 내용',
  `testament` varchar(10) NOT NULL,
  `long_label` varchar(30) NOT NULL COMMENT '정식 책 이름',
  `short_label` varchar(10) NOT NULL COMMENT '약어',
  PRIMARY KEY (`idx`),
  KEY `idx_sequense` (`book`,`chapter`,`paragraph`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
```

---

### 3. 전체 성경 SQL 파일 준비

이미 완성된 성경 전체 SQL 덤프 파일을 사용합니다.

**파일 구조 예시:**
```sql
INSERT INTO `bible2` (`idx`, `cate`, `book`, `chapter`, `paragraph`, `sentence`, `testament`, `long_label`, `short_label`) VALUES
(1, 1, 1, 1, 1, '태초에 하나님이 천지를 창조하시니라', '구', '창세기', '창'),
(2, 1, 1, 1, 2, '땅이 혼돈하고 공허하며 흑암이 깊음 위에 있고...', '구', '창세기', '창'),
...
(31138, 27, 66, 22, 21, '주 예수의 은혜가 모든 자들에게 있을지어다 아멘', '신', '요한계시록', '계');
```

**컬럼 설명:**
- `paragraph`: 절 번호 (verse)
- `sent전체 성경 SQL 파일 임포트 (권장)

#### 방법 1: MySQL 명령어로 직접 임포트 (가장 빠름)

```bash
# 1. 성경 전체 SQL 파일 다운로드 (또는 준비)
# 파일명 예: bible_full.sql 또는 q.sql

# 2. MySQL에 임포트
mysql -u root -p halmeoni_bible < C:\Users\timjj\Desktop\bible_full.sql

# 또는 Windows PowerShell:
Get-Content "C:/path/to/bible_full.sql" | mysql -u root -p halmeoni_bible
```

#### 방법 2: MySQL Workbench 사용

1. MySQL Workbench 실행
2. Server → Data Import 선택
3. "Import from Self-Contained File" 선택
4. SQL 파일 경로 지정
5. Default Target Schema: `halmeoni_bible`
6. "Start Import" 클릭

#### 방법 3: phpMyAdmin 사용 (웹 호스팅)

1. phpMyAdmin 접속
2. `halmeoni_bible` 데이터베이스 선택
3. "Import" 탭 클릭
4. SQL 파일 선택 (최대 크기 제한 주의)
5. "Go" 클릭

#### 방법 4: MySQL 콘솔에서 직접 실행

```bash
mysql -u root -p
```

```sql
USE halmeoni_bible;
SOURCE C:/path/to/bible_full.sql;
-- 또는
\. C:/path/to/bible_full.sqlINTO bible_verses (book, chapter, verse, text) VALUES (%s, %s, %s, %s)",
            (row['book'], int(row['chapter']), int(row['verse']), row['text'])
        )

conn.commit()
conn.close()
print("데이터 임포트 완료!")
```

---

### 5. 데이터 확인

```sql
-- 총 구절 수 확인
SELECT COUNT(*) FROM bible_verses;

-- 사도행전 27장 확인
SELECT * FROM bible_verses 
WHERE book = '사도행전' AND chapter = 27 
ORDER BY verse;

-- 데이터 샘플 확인
SELECT * FROM bible_verses LIMIT 10;
```

---

### 6. 서버 환경 변수 설정

`server/.env` 파일에 MySQL 정보 추가:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=halmeoni_bible
```

--- (약 31,138개)
SELECT COUNT(*) FROM bible2;

-- 성경책 목록 확인
SELECT DISTINCT long_label, short_label, testament 
FROM bible2 
ORDER BY book;

-- 사도행전 27장 24-27절 확인 (테스트)
SELECT paragraph, sentence 
FROM bible2 
WHERE long_label = '사도행전' AND chapter = 27 AND paragraph BETWEEN 24 AND 27
ORDER BY paragraph;

-- 데이터 샘플 확인
SELECT long_label, chapter, paragraph, sentence 
FROM bible2 

```bash
# 브라✅ 현재 사용 중인 SQL 파일
- **phpMyAdmin 덤프 형식** (약 31,138개 구절)
- 테이블명: `bible2`
- 인코딩: UTF-8
- 약어와 정식명칭이 모두 포함된 완전한 데이터

### 무료 성경 데이터 (대안)
1. **GitHub 한글 성경 데이터**
   - 검색: "korean bible sql"
   - JSON/CSV 형식도 가능

2. **공개 성경 데이터베이스**
   - 개신교 표준 번역 (개역개정)
전체 SQL 파일이 없는 경우 테스트용 최소 데이터:

```sql
USE halmeoni_bible;

INSERT INTO `bible2` (`idx`, `cate`, `book`, `chapter`, `paragraph`, `sentence`, `testament`, `long_label`, `short_label`) VALUES
-- 창세기 1:1-2
(1, 1, 1, 1, 1, '태초에 하나님이 천지를 창조하시니라', '구', '창세기', '창'),
(2, 1, 1, 1, 2, '땅이 혼돈하고 공허하며 흑암이 깊음 위에 있고 하나님의 영은 수면 위에 운행하시니라', '구', '창세기', '창'),

-- 요한복음 3:16
(100, 4, 43, 3, 16, '하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니 이는 그를 믿는 자마다 멸망하지 않고 영생을 얻게 하려 하심이라', '신', '요한복음', '요'),

-- 사도행전 27:24-27 (주일 메세지 테스트용)
(200, 5, 44, 27, 24, '이르되 바울아 두려워하지 말라 네가 가이사 앞에 서야 하겠고 또 하나님께서 너와 함께 항해하는 자를 다 네게 주셨다 하였으니', '신', '사도행전', '행'),
(201, 5, 44, 27, 25, '그러므로 여러분이여 안심하라 나는 내게 말씀하신 그대로 되리라고 하나님을 믿노라', '신', '사도행전', '행'),
(202, 5, 44, 27, 26, '그러나 우리가 반드시 한 섬에 걸리리라 하더라', '신', '사도행전', '행'),
(203, 5, 44, 27, 27, '열나흘째 되는 날 밤에 우리가 아드리아 바다에서 이리 저리 쫓겨가다가 자정쯤 되어 선원들이 어느 육지에 가까워지는 줄을 짐작하고', '신', '사도행전', '행

# 데이터베이스 직접 확인
curl "http://localhost:5000/api/test-bible"  # 테스트 엔드포인트 (선택사항)

최소 테스트를 위한 샘플 SQL:

```sql
USE halmeoni_bible;

INSERT INTO bible_verses (book, chapter, verse, text) VALUES
-- 요한복음 3:16
('요한복음', 3, 16, '하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니 이는 그를 믿는 자마다 멸망하지 않고 영생을 얻게 하려 하심이라'),

-- 시편 23편
('시편', 23, 1, '여호와는 나의 목자시니 내게 부족함이 없으리로다'),
('시편', 23, 2, '그가 나를 푸른 풀밭에 누이시며 쉴 만한 물가로 인도하시는도다'),
('시편', 23, 3, '내 영혼을 소생시키시고 자기 이름을 위하여 의의 길로 인도하시는도다'),

-- 사도행전 27:24-27 (테스트용)
('사도행전', 27, 24, '이르되 바울아 두려워하지 말라 네가 가이사 앞에 서야 하겠고 또 하나님께서 너와 함께 항해하는 자를 다 네게 주셨다 하였으니'),
('사도행전', 27, 25, '그러므로 여러분이여 안심하라 나는 내게 말씀하신 그대로 되리라고 하나님을 믿노라'),
('사도행전', 27, 26, '그러나 우리가 반드시 한 섬에 걸리리라 하더라'),
('사도행전', 27, 27, '열나흘째 되는 날 밤에 우리가 아드리아 바다에서 이리 저리 쫓겨가다가 자정쯤 되어 선원들이 어느 육지에 가까워지는 줄을 짐작하고');
```

---

## 🐛 문제 해결

### 연결 오류
```
Error: ER_NOT_SUPPORTED_AUTH_MODE
```
해결:
```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
FLUSH PRIVILEGES;
```

### 한글 깨짐
- 테이블 생성 시 `CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci` 확인
- 연결 시 `charset=utf8mb4` 옵션 사용

### Local Infile 오류
```sql
SET GLOBAL local_infile = 1;
```

---

## 📝 다음 단계

1. ✅ MySQL 설치 완료
2. ✅ 데이터베이스 생성 완료
3. ✅ 테스트 데이터 삽입 완료
4. ✅ 서버 연결 확인
5. 🔜 전체 성경 데이터 임포트 (선택사항)

---

**참고**: 성경 데이터는 저작권을 확인 후 사용하세요. 개인/교회 용도는 대부분 허용됩니다.
