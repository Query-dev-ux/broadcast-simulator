import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../stores/gameStore'

const CTAModal: React.FC = () => {
  const { hideCTA, addTokens, getAffomelodyURL } = useGameStore()

  const handleGetTokens = () => {
    // Получаем динамическую ссылку с параметрами
    const affomelodyURL = getAffomelodyURL()
    
    // Открываем ссылку в новой вкладке
    window.open(affomelodyURL, '_blank')
    
    // Добавляем токены для демонстрации
    addTokens(10)
    hideCTA()
  }

  const handleClose = () => {
    hideCTA()
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-gradient-to-br from-orange-500/90 to-orange-600/90 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full border border-white/20"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Заголовок */}
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">😳</div>
            <h2 className="text-2xl font-bold text-white mb-2">
              У вас закончились токены!
            </h2>
            <p className="text-white/80 text-sm">
              Модель готова к финалу, но вам не хватает 10 токенов, чтобы довести её до оргазма.
            </p>
          </div>

          {/* Основной CTA */}
          <motion.button
            onClick={handleGetTokens}
            className="btn-neon-orange w-full py-4 px-6 rounded-xl mb-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">💰</span>
              <span>Получить 10 токенов и закончить начатое</span>
            </div>
          </motion.button>

          {/* Дополнительная информация */}
          <div className="bg-white/10 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-2 text-white/80 text-sm">
              <span>🎁</span>
              <span>Бесплатно при регистрации</span>
            </div>
            <div className="flex items-center space-x-2 text-white/80 text-sm mt-1">
              <span>⚡</span>
              <span>Мгновенная активация</span>
            </div>
            <div className="flex items-center space-x-2 text-white/80 text-sm mt-1">
              <span>🔒</span>
              <span>Безопасная регистрация</span>
            </div>
          </div>

          {/* Кнопка закрытия */}
          <motion.button
            onClick={handleClose}
            className="w-full text-white/60 hover:text-white transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Может быть позже
          </motion.button>

          {/* Декор */}
          <motion.div
            className="absolute -top-4 -right-4 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <span className="text-white text-sm">🔥</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default CTAModal