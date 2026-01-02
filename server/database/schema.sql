-- 할매 프로젝트 성경 데이터베이스 스키마
-- 기존 phpMyAdmin 덤프 형식과 호환

-- 데이터베이스 생성
CREATE DATABASE IF NOT EXISTS halmeoni_bible 
CHARACTER SET utf8 COLLATE utf8_general_ci;

USE halmeoni_bible;

-- 성경 구절 테이블 (기존 SQL 덤프 구조 그대로 사용)
CREATE TABLE IF NOT EXISTS `bible2` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `cate` int(11) NOT NULL COMMENT '카테고리',
  `book` int(11) NOT NULL COMMENT '책 번호',
  `chapter` int(11) NOT NULL COMMENT '장 번호',
  `paragraph` int(11) NOT NULL COMMENT '절 번호 (verse)',
  `sentence` tinytext NOT NULL COMMENT '본문 내용',
  `testament` varchar(10) NOT NULL COMMENT '구약/신약 구분',
  `long_label` varchar(30) NOT NULL COMMENT '정식 책 이름 (예: 창세기, 사도행전)',
  `short_label` varchar(10) NOT NULL COMMENT '약어 (예: 창, 행)',
  PRIMARY KEY (`idx`),
  KEY `idx_sequense` (`book`,`chapter`,`paragraph`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=31139;

-- 테스트용 샘플 데이터 삽입
-- 전체 성경 SQL 파일을 임포트할 예정이므로 여기서는 구조 확인용 샘플만 제공

INSERT INTO `bible2` (`idx`, `cate`, `book`, `chapter`, `paragraph`, `sentence`, `testament`, `long_label`, `short_label`) VALUES
(1, 1, 1, 1, 1, '태초에 하나님이 천지를 창조하시니라', '구', '창세기', '창'),
(2, 1, 1, 1, 2, '땅이 혼돈하고 공허하며 흑암이 깊음 위에 있고 하나님의 영은 수면 위에 운행하시니라', '구', '창세기', '창');

-- 전체 성경 데이터는 별도 SQL 파일을 임포트하세요:
-- mysql -u root -p halmeoni_bible < 전체성경.sql

-- 데이터 확인
SELECT COUNT(*) as total_verses FROM bible2;
SELECT DISTINCT long_label, short_label FROM bible2 ORDER BY book;
