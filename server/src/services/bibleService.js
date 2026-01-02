/**
 * 매일 성경 말씀 제공 서비스
 */
class BibleService {
  constructor() {
    // 365일 성경 말씀 데이터
    this.verses = [
      { reference: "요한복음 3:16", text: "하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니 이는 그를 믿는 자마다 멸망하지 않고 영생을 얻게 하려 하심이라" },
      { reference: "시편 23:1", text: "여호와는 나의 목자시니 내게 부족함이 없으리로다" },
      { reference: "잠언 3:5-6", text: "너는 마음을 다하여 여호와를 신뢰하고 네 명철을 의지하지 말라 너는 범사에 그를 인정하라 그리하면 네 길을 지도하시리라" },
      { reference: "빌립보서 4:13", text: "내게 능력 주시는 자 안에서 내가 모든 것을 할 수 있느니라" },
      { reference: "로마서 8:28", text: "우리가 알거니와 하나님을 사랑하는 자 곧 그의 뜻대로 부르심을 입은 자들에게는 모든 것이 합력하여 선을 이루느니라" },
      { reference: "마태복음 11:28", text: "수고하고 무거운 짐 진 자들아 다 내게로 오라 내가 너희를 쉬게 하리라" },
      { reference: "시편 46:1", text: "하나님은 우리의 피난처시요 힘이시니 환난 중에 만날 큰 도움이시라" },
      { reference: "이사야 41:10", text: "두려워하지 말라 내가 너와 함께 함이라 놀라지 말라 나는 네 하나님이 됨이라" },
      { reference: "에베소서 2:8", text: "너희는 그 은혜에 의하여 믿음으로 말미암아 구원을 받았으니 이것은 너희에게서 난 것이 아니요 하나님의 선물이라" },
      { reference: "골로새서 3:23", text: "무슨 일을 하든지 마음을 다하여 주께 하듯 하고 사람에게 하듯 하지 말라" }
    ];
  }

  /**
   * 오늘의 말씀 조회 (날짜 기반 순환)
   */
  getDailyVerse() {
    const today = new Date();
    const dayOfYear = this.getDayOfYear(today);
    const index = dayOfYear % this.verses.length;
    
    return {
      success: true,
      ...this.verses[index],
      date: today.toLocaleDateString('ko-KR')
    };
  }

  /**
   * 랜덤 말씀 조회
   */
  getRandomVerse() {
    const randomIndex = Math.floor(Math.random() * this.verses.length);
    return {
      success: true,
      ...this.verses[randomIndex]
    };
  }

  /**
   * 연중 날짜 계산
   */
  getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }
}

module.exports = new BibleService();
