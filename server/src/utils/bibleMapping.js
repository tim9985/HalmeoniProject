/**
 * 성경 약어 참조 매핑 (검증/참고용)
 * 
 * ⚠️ 주의: DB의 short_label을 직접 사용하므로 이 파일은 참고용입니다.
 * 실제 쿼리는 bibleTextService에서 short_label을 그대로 사용합니다.
 * 
 * DB 구조:
 * - short_label: '창', '행' 등 약어 → ✅ 직접 사용
 * - long_label: '창세기', '사도행전' 등 정식 명칭
 * 
 * 이 매핑은 향후 유효성 검증이나 UI 표시용으로 사용 가능
 */
const BIBLE_BOOK_MAPPING = {
  // 구약
  '창': '창세기', '출': '출애굽기', '레': '레위기', '민': '민수기', '신': '신명기',
  '수': '여호수아', '삿': '사사기', '룻': '룻기', '삼상': '사무엘상', '삼하': '사무엘하',
  '왕상': '열왕기상', '왕하': '열왕기하', '대상': '역대상', '대하': '역대하',
  '스': '에스라', '느': '느헤미야', '에': '에스더', '욥': '욥기', '시': '시편',
  '잠': '잠언', '전': '전도서', '아': '아가', '사': '이사야', '렘': '예레미야',
  '애': '예레미야애가', '겔': '에스겔', '단': '다니엘', '호': '호세아', '욜': '요엘',
  '암': '아모스', '옵': '오바댜', '욘': '요나', '미': '미가', '나': '나훔',
  '합': '하박국', '습': '스바냐', '학': '학개', '슥': '스가랴', '말': '말라기',
  // 신약
  '마': '마태복음', '막': '마가복음', '눅': '누가복음', '요': '요한복음', '행': '사도행전',
  '롬': '로마서', '고전': '고린도전서', '고후': '고린도후서', '갈': '갈라디아서',
  '엡': '에베소서', '빌': '빌립보서', '골': '골로새서', '살전': '데살로니가전서',
  '살후': '데살로니가후서', '딤전': '디모데전서', '딤후': '디모데후서', '딛': '디도서',
  '몬': '빌레몬서', '히': '히브리서', '약': '야고보서', '벧전': '베드로전서',
  '벧후': '베드로후서', '요일': '요한일서', '요이': '요한이서', '요삼': '요한삼서',
  '유': '유다서', '계': '요한계시록'
};

/**
 * 약어 검증 (DB에 존재하는 약어인지 확인)
 * @param {string} abbreviation - 성경 약어 (예: "행")
 * @returns {boolean} 유효한 약어인지 여부
 */
function isValidAbbreviation(abbreviation) {
  return BIBLE_BOOK_MAPPING.hasOwnProperty(abbreviation);
}

/**
 * 약어를 정식 명칭으로 변환 (UI 표시용)
 * @param {string} abbreviation - 성경 약어 (예: "행")
 * @returns {string} 정식 명칭 (예: "사도행전")
 */
function getFullBookName(abbreviation) {
  return BIBLE_BOOK_MAPPING[abbreviation] || abbreviation;
}

/**
 * 정식 명칭을 약어로 변환 (참고용)
 * @param {string} fullName - 정식 명칭 (예: "사도행전")
 * @returns {string|null} 약어 (예: "행")
 */
function getAbbreviation(fullName) {
  const entry = Object.entries(BIBLE_BOOK_MAPPING).find(([_, value]) => value === fullName);
  return entry ? entry[0] : null;
}

module.exports = {
  BIBLE_BOOK_MAPPING,
  isValidAbbreviation,
  getFullBookName,
  getAbbreviation
};
