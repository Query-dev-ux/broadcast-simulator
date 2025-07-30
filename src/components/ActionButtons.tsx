import React, { useState, useEffect } from 'react';
import { useGameStore } from '../stores/gameStore';

interface ActionButtonsProps {
  onAction: (action: string) => void;
  disabled?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onAction, disabled = false }) => {
  const { videoActions, tokens } = useGameStore();
  const [usedActions, setUsedActions] = useState<Set<string>>(new Set());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleAction = (action: string) => {
    if (!disabled && !usedActions.has(action)) {
      onAction(action);
      // Помечаем действие как использованное
      setUsedActions(prev => new Set(prev).add(action));
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'Покажи попку':
        return '🍑';
      case 'Покажи сиськи':
        return '🍒';
      case 'Покажи анал':
        return '🕳️';
      case 'Пососи член':
        return '🍆';
      case 'Покажи киску':
        return '🌸';
      case 'Подрочи киску':
        return '💦';
      default:
        return '🎮';
    }
  };

  return (
    <div className="actions-container">
      <div className={`actions-grid ${isMobile ? 'actions-grid-mobile' : ''}`}>
        {videoActions.map((videoAction) => {
          const isUsed = usedActions.has(videoAction.name);
          const isDisabled = disabled || tokens < videoAction.tokenCost || isUsed;
          
          return (
            <button
              key={videoAction.name}
              onClick={() => handleAction(videoAction.name)}
              disabled={isDisabled}
              className={`action-button ${isUsed ? 'action-button-used' : ''} ${isMobile ? 'action-button-mobile' : ''}`}
            >
              <span className="action-icon">{getActionIcon(videoAction.name)}</span>
              <span className="action-text">{videoAction.name}</span>
              <span className="token-cost">{videoAction.tokenCost} ткн</span>
              {isUsed && <span className="action-used-badge">✓</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ActionButtons;