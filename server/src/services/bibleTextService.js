const { pool } = require('../config/database');

/**
 * 성경 본문 조회 서비스
 * 
 * DB 테이블: bible2
 * - short_label: 약어 (예: "행") - ✅ 직접 사용
 * - long_label: 정식 책 이름 (예: "사도행전")
 * - chapter: 장 번호
 * - paragraph: 절 번호 (verse)
 * - sentence: 본문 내용
 */
class BibleTextService {
  /**
   * 성경 구절 범위로 본문 조회 (약어 직접 사용)
   * @param {string} bookAbbr - 성경책 약어 (예: "행", "창")
   * @param {number} chapter - 장 번호
   * @param {number} startVerse - 시작 절
   * @param {number} endVerse - 끝 절
   * @returns {Promise<Array>} 본문 배열
   */
  async getVerses(bookAbbr, chapter, startVerse, endVerse) {
    try {
      const [rows] = await pool.query(
        `SELECT short_label as book, chapter, paragraph as verse, sentence as text
         FROM bible2 
         WHERE short_label = ? AND chapter = ? AND paragraph BETWEEN ? AND ?
         ORDER BY paragraph ASC`,
        [bookAbbr, chapter, startVerse, endVerse]
      );

      return {
        success: true,
        verses: rows,
        reference: `${bookAbbr} ${chapter}:${startVerse}${endVerse !== startVerse ? `-${endVerse}` : ''}`,
        count: rows.length
      };
    } catch (error) {
      console.error('Bible Query Error:', error);
      return {
        success: false,
        message: '본문 조회 중 오류가 발생했습니다.',
        error: error.message
      };
    }
  }

  /**
   * 구절 참조 문자열로 본문 조회 (약어 그대로 사용)
   * @param {string} reference - 예: "행 27:24-27"
   */
  async getByReference(reference) {
    const parsed = this.parseReference(reference);
    
    if (!parsed) {
      return {
        success: false,
        message: '잘못된 구절 형식입니다.'
      };
    }

    return await this.getVerses(
      parsed.book,      // 약어 그대로 (예: "행")
      parsed.chapter,
      parsed.startVerse,
      parsed.endVerse
    );
  }

  /**
   * 성경 구절 파싱 (약어 그대로 사용)
   * @param {string} reference - 성경 구절 참조 (예: "행 27:24-27")
   * @returns {object|null} { book, chapter, startVerse, endVerse }
   */
  parseReference(reference) {
    const cleaned = reference.trim();
    
    // 패턴: "행 27:24-27" 또는 "창 1:1"
    const pattern = /^(.+?)\s+(\d+):(\d+)(?:-(\d+))?$/;
    const match = cleaned.match(pattern);
    
    if (!match) {
      console.warn(`⚠️ 잘못된 구절 형식: ${reference}`);
      return null;
    }
    
    const [, book, chapter, startVerse, endVerse] = match;
    
    return {
      book: book.trim(),  // 약어 그대로 (예: "행")
      chapter: parseInt(chapter),
      startVerse: parseInt(startVerse),
      endVerse: endVerse ? parseInt(endVerse) : parseInt(startVerse)
    };
  }

  /**
   * 데이터베이스에 본문이 있는지 확인
   */
  async hasData() {
    try {
      const [rows] = await pool.query('SELECT COUNT(*) as count FROM bible2 LIMIT 1');
      return rows[0].count > 0;
    } catch (error) {
      console.error('Database check error:', error);
      return false;
    }
  }
}

module.exports = new BibleTextService();
