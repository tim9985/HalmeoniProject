import React from 'react';

interface HeaderProps {
  weather: {
    temp: number | null;
    condition: string;
    icon: string;
  };
  todayEvent?: string;
}

const Header: React.FC<HeaderProps> = ({ weather, todayEvent }) => {
  const weatherText = weather.temp !== null 
    ? `${weather.icon} 오늘 ${weather.temp}도 ${weather.condition}` 
    : '날씨 정보 로딩 중...';

  // 우산 알림 체크 (비, 눈, 소나기)
  const needUmbrella = weather.condition.includes('비') || 
                       weather.condition.includes('눈') || 
                       weather.condition.includes('소나기');

  return (
    <header
      style={{
        backgroundColor: '#222',
        color: '#fff',
        padding: '25px 15px',
        borderRadius: '20px',
        marginBottom: '20px',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '24px', margin: 0, color: '#FFD700' }}>
        {weatherText} {todayEvent && `｜ ${todayEvent}`}
      </h1>
      {needUmbrella && (
        <div style={{
          marginTop: '12px',
          padding: '12px 20px',
          backgroundColor: '#FF6B6B',
          color: '#fff',
          borderRadius: '15px',
          fontSize: '20px',
          fontWeight: 'bold',
          animation: 'pulse 2s infinite'
        }}>
          ☔ 우산 챙기세요!
        </div>
      )}
    </header>
  );
};

export default Header;
