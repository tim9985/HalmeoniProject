import React from 'react';
import { X } from 'lucide-react';

interface BibleModalProps {
  isOpen: boolean;
  onClose: () => void;
  reference: string;
  verses: Array<{
    book: string;
    chapter: number;
    verse: number;
    text: string;
  }>;
}

const BibleModal: React.FC<BibleModalProps> = ({ isOpen, onClose, reference, verses }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* 배경 오버레이 */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 999,
          animation: 'fadeIn 0.2s ease-in-out',
        }}
      />

      {/* 모달 컨테이너 */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '600px',
          maxHeight: '80vh',
          backgroundColor: '#fff',
          borderRadius: '20px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideUp 0.3s ease-out',
        }}
      >
        {/* 헤더 */}
        <div
          style={{
            padding: '20px',
            borderBottom: '2px solid #f0f0f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          <h2
            style={{
              fontSize: '28px', // 노안 배려
              fontWeight: 'bold',
              color: '#8A2BE2',
              margin: 0,
            }}
          >
            📖 {reference}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f0f0f0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <X size={32} color="#666" />
          </button>
        </div>

        {/* 본문 스크롤 영역 */}
        <div
          style={{
            padding: '25px',
            overflowY: 'auto',
            flex: 1,
            lineHeight: '1.8', // 노안 배려
          }}
        >
          {verses.length === 0 ? (
            <p
              style={{
                fontSize: '24px',
                color: '#999',
                textAlign: 'center',
                padding: '40px 20px',
              }}
            >
              본문을 불러올 수 없습니다.
            </p>
          ) : (
            verses.map((verse) => (
              <div
                key={`${verse.chapter}-${verse.verse}`}
                style={{
                  marginBottom: '20px',
                }}
              >
                <span
                  style={{
                    fontSize: '20px',
                    color: '#8A2BE2',
                    fontWeight: 'bold',
                    marginRight: '10px',
                  }}
                >
                  {verse.verse}
                </span>
                <span
                  style={{
                    fontSize: '24px', // 노안 배려: 큰 글씨
                    color: '#222',
                    lineHeight: '1.8', // 노안 배려: 넓은 줄간격
                  }}
                >
                  {verse.text}
                </span>
              </div>
            ))
          )}
        </div>

        {/* 하단 버튼 */}
        <div
          style={{
            padding: '20px',
            borderTop: '2px solid #f0f0f0',
            flexShrink: 0,
          }}
        >
          <button
            onClick={onClose}
            style={{
              width: '100%',
              padding: '18px',
              fontSize: '24px',
              fontWeight: 'bold',
              backgroundColor: '#8A2BE2',
              color: '#fff',
              border: 'none',
              borderRadius: '15px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#7A1FD2';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#8A2BE2';
            }}
          >
            닫기
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, -40%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
      `}</style>
    </>
  );
};

export default BibleModal;
