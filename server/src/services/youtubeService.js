const axios = require('axios');

/**
 * 유튜브 최신 주일 메세지 조회 서비스
 */
class YouTubeService {
  constructor() {
    this.apiKey = process.env.YOUTUBE_API_KEY;
    this.channelId = 'UCRgXErYOtPB8oWdrVFtYe1Q';
    this.baseUrl = 'https://www.googleapis.com/youtube/v3/search';
  }

  /**
   * 주일 1부 또는 2부 메세지 최신 영상 조회 (본문 포함)
   * @param {number} part - 1 또는 2 몇부 예배인지 나타내는 인자
   */
  async getLatestSermon(part) {
    if (!this.apiKey || this.apiKey.startsWith('UC')) {
      return { 
        success: false, 
        message: 'YouTube API Key가 설정되지 않았습니다.' 
      };
    }

    const searchQuery = `주일 ${part}부`;

    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          part: 'snippet',
          channelId: this.channelId,
          maxResults: 5,
          order: 'date',
          type: 'video',
          key: this.apiKey,
          q: searchQuery
        }
      });

      const videos = response.data.items;
      
      if (!videos || videos.length === 0) {
        return {
          success: false,
          message: '최근 메세지를 찾을 수 없습니다.'
        };
      }

      // 「」 괄호와 () 구절 패턴이 있는 영상만 필터링 (정확한 부수 매칭)
      const messageRegex = new RegExp(`주일 ${part}부 「.+」 \\((.+)\\)$`);
      const matchingVideos = videos.filter(v => {
        const title = v.snippet.title;
        return messageRegex.test(title);
      });

      if (matchingVideos.length === 0) {
        return {
          success: false,
          message: '본문이 포함된 메세지를 찾을 수 없습니다.'
        };
      }

      // 첫 번째 매칭 영상 선택
      const bestVideo = matchingVideos[0];
      const videoId = bestVideo.id.videoId;
      const title = bestVideo.snippet.title;
      
      // 제목에서 성경 구절 추출 (괄호 안 마지막 내용)
      const reference = this.extractBibleReference(title);

      return {
        success: true,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        title: title,
        reference: reference // 예: "행 27:24-27"
      };

    } catch (error) {
      console.error('YouTube API Error:', error.message);
      return { 
        success: false, 
        message: '영상 조회 중 오류가 발생했습니다.',
        error: error.message 
      };
    }
  }

  /**
   * 유튜브 제목에서 성경 구절 추출
   * 패턴: 주일 1부 「제목」 (구절) 형식
   * @param {string} title - 영상 제목 (예: "[ 4K ] 2025.12.21. 주일 1부 「구원은 하나님의 선택」 (엡 1:1-14)")
   * @returns {string|null} 성경 구절 (예: "엡 1:1-14")
   */
  extractBibleReference(title) {
    // '주일 1부' 또는 '주일 2부' 뒤에 '「'가 오고 마지막에 '(구절)'이 오는 패턴
    const messageRegex = /주일 [12]부 「.+?」 \((.+?)\)/;
    const match = title.match(messageRegex);
    
    if (match && match[1]) {
      const reference = match[1].trim();
      console.log(`📖 추출된 성경 구절: ${reference} (제목: ${title})`);
      return reference;
    }
    
    console.warn(`⚠️ 제목에서 성경 구절을 찾을 수 없습니다: ${title}`);
    console.warn(`   (전체 예배 영상이거나 형식이 맞지 않습니다)`);
    return null;
  }
}

module.exports = new YouTubeService();
