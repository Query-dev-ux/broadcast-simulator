import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { parseURLParams, buildAffomelodyURL, getParamValue } from '../utils/urlParser'



export interface VideoAction {
  id: string
  name: string
  videoPath: string
  duration: number
  excitementIncrease: number
  tokenCost: number
}

export interface GameState {
  // Основное состояние
  tokens: number
  excitement: number
  showCTA: boolean
  
  // URL параметры
  urlParams: {
    sub1?: string
    sub2?: string
    sub3?: string
    [key: string]: string | undefined
  }
  
  // Видео
  currentVideo: string | null
  isVideoPlaying: boolean
  videoActions: VideoAction[]
  defaultVideo: string
  
  // Действия
  performAction: (action: string) => void
  playVideoAction: (actionName: string) => void
  stopVideo: () => void
  playDefaultVideo: () => void
  spendTokens: (amount: number) => void
  addTokens: (amount: number) => void
  resetGame: () => void
  hideCTA: () => void
  getAffomelodyURL: () => string
  getURLParam: (key: string) => string | undefined
}



// Действия пользователя с видео
const videoActions: VideoAction[] = [
  {
    id: '1',
    name: 'Покажи попку',
    videoPath: '/videos/actions/ass.mp4',
    duration: 3000,
    excitementIncrease: 15,
    tokenCost: 2.5
  },
  {
    id: '2',
    name: 'Покажи сиськи',
    videoPath: '/videos/actions/tits.mp4',
    duration: 3500,
    excitementIncrease: 18,
    tokenCost: 2.5
  },
  {
    id: '3',
    name: 'Покажи анал',
    videoPath: '/videos/actions/show-more.mp4',
    duration: 4000,
    excitementIncrease: 20,
    tokenCost: 5
  },
  {
    id: '4',
    name: 'Пососи член',
    videoPath: '/videos/actions/dick.mp4',
    duration: 5000,
    excitementIncrease: 25,
    tokenCost: 5
  },
  {
    id: '5',
    name: 'Покажи киску',
    videoPath: '/videos/actions/pussy.mp4',
    duration: 4500,
    excitementIncrease: 30,
    tokenCost: 5
  },
  {
    id: '6',
    name: 'Подрочи киску',
    videoPath: '/videos/actions/orgasm.mp4',
    duration: 8000,
    excitementIncrease: 35,
    tokenCost: 5
  }
]

export const useGameStore = create<GameState>()(
  subscribeWithSelector((set, get) => {
    // Парсим URL параметры при инициализации
    const initialURLParams = parseURLParams()
    
    return {
      // Начальное состояние
      tokens: 10,
      excitement: 0,
      showCTA: false,
      currentVideo: null,
      isVideoPlaying: false,
      videoActions,
      defaultVideo: '/videos/actions/usual.mp4',
      urlParams: initialURLParams,

      // Методы

      performAction: (action: string) => {
        const { excitement } = get()
        const videoAction = videoActions.find(v => v.name === action)
        const excitementIncrease = videoAction ? videoAction.excitementIncrease : Math.random() * 15 + 5
        
        set((state) => ({
          excitement: Math.min(100, state.excitement + excitementIncrease)
        }))
        
        // Если достигли 100% возбуждения, показываем CTA
        if (excitement + excitementIncrease >= 100) {
          setTimeout(() => {
            set({ showCTA: true })
          }, 1000)
        }
      },

      playVideoAction: (actionName: string) => {
        const videoAction = videoActions.find(v => v.name === actionName)
        if (videoAction) {
          set({
            currentVideo: videoAction.videoPath,
            isVideoPlaying: true
          })
          // Убираем автоматическую остановку - видео будет воспроизводиться до конца
        }
      },

      playDefaultVideo: () => {
        set({
          currentVideo: '/videos/actions/usual.mp4',
          isVideoPlaying: true
        })
      },

      stopVideo: () => {
        set({
          isVideoPlaying: false
        })
      },

      spendTokens: (amount: number) => {
        set((state) => ({
          tokens: Math.max(0, state.tokens - amount)
        }))
      },

      addTokens: (amount: number) => {
        set((state) => ({
          tokens: state.tokens + amount
        }))
      },

      resetGame: () => {
        set({
          tokens: 10,
          excitement: 0,
          showCTA: false,
          currentVideo: '/videos/actions/usual.mp4',
          isVideoPlaying: true
        })
      },

      hideCTA: () => {
        set({ showCTA: false })
      },

      getAffomelodyURL: () => {
        const { urlParams } = get()
        return buildAffomelodyURL(urlParams.sub1, urlParams.sub2, urlParams.sub3)
      },

      getURLParam: (key: string) => {
        return getParamValue(key)
      }
    }
  })
)