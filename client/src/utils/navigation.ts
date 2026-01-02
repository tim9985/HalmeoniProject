/**
 * 네이버 지도 길찾기 열기
 */
export function openNaverMap(destination: 'church' | 'home') {
  const destinations = {
    church: { lat: 35.0768, lng: 129.0718, name: '임마누엘교회' },
    home: { lat: 35.1796, lng: 129.0756, name: '우리집' },
  };

  const dest = destinations[destination];

  // 모바일 환경 감지
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isMobile) {
    // 모바일: 네이버 지도 앱 실행
    const appUrl = `nmap://route/public?dlat=${dest.lat}&dlng=${dest.lng}&dname=${encodeURIComponent(dest.name)}&appname=halmeoni-web`;
    window.location.href = appUrl;

    // 앱이 설치되지 않은 경우를 대비해 웹 버전 fallback
    setTimeout(() => {
      window.open(
        `https://map.naver.com/v5/directions/-/-/-/transit?c=${dest.lng},${dest.lat},15,0,0,0,dh`
      );
    }, 1500);
  } else {
    // PC: 네이버 지도 웹 버전 열기
    window.open(
      `https://map.naver.com/v5/directions/-/-/-/transit?c=${dest.lng},${dest.lat},15,0,0,0,dh`,
      '_blank'
    );
  }
}

/**
 * 외부 URL 열기
 */
export function openExternalUrl(url: string) {
  window.open(url, '_blank');
}
