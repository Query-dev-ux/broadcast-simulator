import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { motion } from 'framer-motion'
import ModelViewer from './components/ModelViewer'
import ActionButtons from './components/ActionButtons'
import CTAModal from './components/CTAModal'
import { useGameStore } from './stores/gameStore'

function App() {
  const {
    tokens,
    excitement,
    showCTA,
    performAction,
    spendTokens,
    playDefaultVideo,
    videoActions
  } = useGameStore()

  const [actionPerformed, setActionPerformed] = useState(0)

  // Запускаем обычное видео при загрузке приложения
  useEffect(() => {
    playDefaultVideo()
  }, [playDefaultVideo])

  const handleAction = (action: string) => {
    const videoAction = videoActions.find(v => v.name === action)
    if (videoAction && tokens >= videoAction.tokenCost) {
      performAction(action)
      spendTokens(videoAction.tokenCost)
      // Запускаем видео действие
      useGameStore.getState().playVideoAction(action)
      
      // Уведомляем ModelViewer о выполнении действия
      setActionPerformed(prev => prev + 1)
    } else if (videoAction && tokens < videoAction.tokenCost) {
      // Показываем CTA когда не хватает токенов
      useGameStore.setState({ showCTA: true })
    }
  }

  const handleActionPerformed = () => {
    // Эта функция будет вызываться при каждом действии
    return actionPerformed
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-purple-900 to-dark">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid var(--primary)'
          }
        }}
      />

      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">
            🎭 Симулятор Трансляций
          </h1>
          <div className="text-white font-semibold">
            💰 {tokens.toFixed(1)} токенов
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4">
        <div className="flex flex-col gap-4">
          {/* Left Panel - Model Viewer */}
          <div className="flex-1">
            {/* Video container */}
            <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden relative">
              <ModelViewer excitement={excitement} onActionPerformed={handleActionPerformed} />
            </div>
          </div>

          {/* Bottom Panel - Actions */}
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/20 flex flex-col"
            >
              {/* Actions */}
              <div className="p-4 flex-1">
                <ActionButtons onAction={handleAction} disabled={tokens === 0} />
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* CTA Modal */}
      {showCTA && <CTAModal />}
    </div>
  )
}

export default App
