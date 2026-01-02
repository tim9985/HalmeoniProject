import React from 'react';

interface MenuButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  bgColor?: string;
  description?: string;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  icon,
  label,
  onClick,
  bgColor = 'white',
  description,
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        padding: '30px 20px',
        fontSize: '26px',
        fontWeight: '900',
        border: '3px solid #ddd',
        borderRadius: '25px',
        backgroundColor: bgColor,
        cursor: 'pointer',
        textAlign: 'left',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      }}
    >
      <div style={{ flexShrink: 0 }}>{icon}</div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span>{label}</span>
        {description && (
          <span
            style={{
              fontSize: '16px',
              fontWeight: 'normal',
              color: '#d32f2f',
              marginTop: '5px',
            }}
          >
            {description}
          </span>
        )}
      </div>
    </button>
  );
};

export default MenuButton;
