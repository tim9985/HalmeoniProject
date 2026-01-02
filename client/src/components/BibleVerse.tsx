import React from 'react';

interface BibleVerseProps {
  verse: {
    reference: string;
    text: string;
  } | null;
}

const BibleVerse: React.FC<BibleVerseProps> = ({ verse }) => {
  if (!verse) return null;

  return (
    <div
      style={{
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '15px',
        marginTop: '20px',
        border: '2px solid #FFD700',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#8A2BE2', marginBottom: '10px' }}>
        📖 오늘의 말씀
      </div>
      <div style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '10px' }}>
        {verse.text}
      </div>
      <div style={{ fontSize: '14px', color: '#666', textAlign: 'right' }}>
        - {verse.reference}
      </div>
    </div>
  );
};

export default BibleVerse;
