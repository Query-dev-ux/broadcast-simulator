import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../stores/gameStore';

interface ModelViewerProps {
  excitement: number;
  onActionPerformed?: () => void;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ excitement, onActionPerformed }) => {
  const { currentVideo, getAffomelodyURL } = useGameStore();
  const [showSimulatorOverlay, setShowSimulatorOverlay] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Начинаем с выключенного звука
  const [volume, setVolume] = useState(0); // Громкость на минимуме
  const [showVolumeSlider, setShowVolumeSlider] = useState(false); // Показ ползунка
  const videoRef = useRef<HTMLVideoElement>(null);

  // Функция для изменения громкости
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      if (newVolume > 0) {
        videoRef.current.muted = false;
        setIsMuted(false);
      } else {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  // Функция для показа/скрытия ползунка
  const toggleVolumeSlider = () => {
    setShowVolumeSlider(!showVolumeSlider);
  };

  // Показываем оверлей в конце видео usual.mp4 (1:40 = 100 секунд)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      // Проверяем, что это видео usual.mp4
      if (currentVideo === '/videos/actions/usual.mp4') {
        // Показываем оверлей за 5 секунд до конца видео (в 95 секунде)
        if (video.currentTime >= 95) {
          setShowSimulatorOverlay(true);
        }
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [currentVideo]);

  // Таймер для появления заглушки
  useEffect(() => {
    // Снимаем заглушку при выполнении действия
    if (onActionPerformed) {
      setShowSimulatorOverlay(false);
    }

    let timer: number;

    if (currentVideo === '/videos/actions/usual.mp4') {
      // Для usual.mp4 - заглушка через 100 секунд (1:40)
      timer = setTimeout(() => {
        setShowSimulatorOverlay(true);
      }, 100000); // 100 секунд = 1:40
    } else {
      // Для всех остальных видео - заглушка через 18 секунд
      timer = setTimeout(() => {
        setShowSimulatorOverlay(true);
      }, 18000); // 18 секунд
    }

    return () => clearTimeout(timer);
  }, [currentVideo, onActionPerformed]);

  return (
    <div className="video-stream-container">
      <div className="video-content-wrapper">
        <video
          ref={videoRef}
          src={currentVideo || ''}
          className="video-stream"
          autoPlay
          muted={isMuted}
          playsInline
        />

        {/* Кнопка звука */}
        <button
          onClick={toggleVolumeSlider}
          className="sound-toggle-button"
          title={isMuted ? "Включить звук" : "Выключить звук"}
        >
          {isMuted ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="white" strokeWidth="2" fill="none"/>
              <path d="M15.5 8.5C16.5 9.5 17 11 17 12C17 13 16.5 14.5 15.5 15.5" stroke="white" strokeWidth="2" fill="none"/>
              <path d="M18 6C20 8 21 10 21 12C21 14 20 16 18 18" stroke="white" strokeWidth="2" fill="none"/>
              <line x1="2" y1="22" x2="22" y2="2" stroke="red" strokeWidth="2"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="white" strokeWidth="2" fill="none"/>
              <path d="M15.5 8.5C16.5 9.5 17 11 17 12C17 13 16.5 14.5 15.5 15.5" stroke="white" strokeWidth="2" fill="none"/>
              <path d="M18 6C20 8 21 10 21 12C21 14 20 16 18 18" stroke="white" strokeWidth="2" fill="none"/>
            </svg>
          )}
        </button>

        {/* Ползунок громкости под кнопкой */}
        <AnimatePresence>
          {showVolumeSlider && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="volume-slider-container"
            >
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="volume-slider"
                title="Громкость"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Блюренный оверлей симулятора */}
        <AnimatePresence>
          {showSimulatorOverlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="simulator-blur-overlay"
            >
                                                                                         <h2 className="simulator-blur-title desktop-title">🎭 Симулятор WebCam Трансляций</h2>

                               <div className="simulator-blur-text">
                   <p className="desktop-text">
                     Хотите смотреть подобный контент без ограничений?
                   </p>
                   <p className="desktop-text">
                     Тогда бесплатно регистрируйтесь на нашем официальном сайте и получайте 10 бесплатных токенов за регистрацию.
                   </p>
                   <p className="desktop-text">
                     Выбирайте модель по вкусу и тратьте токены на выполнение ваших заветных желаний.
                     Уже без ограничений.
                   </p>
                   
                   <p className="mobile-text">
                     Хотите смотреть подобный контент без ограничений?
                   </p>
                   <p className="mobile-text">
                     Регистрируйтесь, получайте бесплатно 10 токенов и смотрите любой контент уже у нас на сайте!
                   </p>
                 </div>

              <button
                onClick={() => {
                  const affomelodyURL = getAffomelodyURL();
                  window.open(affomelodyURL, '_blank');
                  setShowSimulatorOverlay(false);
                }}
                className="simulator-blur-button"
              >
                Зарегистрироваться
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Полоска возбуждения под видео как продолжение экрана */}
      <div className="excitement-bar-extension">
        <div className="excitement-bar-container">
          <div className="excitement-bar-label">
            <span className="excitement-icon">🔥</span>
            <span className="excitement-text">Возбуждение</span>
            <span className="excitement-percentage">{excitement}%</span>
          </div>
          <div className="excitement-bar">
            <div
              className="excitement-fill"
              style={{ width: `${excitement}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelViewer;