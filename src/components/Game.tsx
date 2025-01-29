import { useState, useEffect } from 'react'
import storyData from '../data/story.json'
import StoryDisplay from './StoryDisplay'
import ChoiceButton from './ChoiceButton'
import LoadingScreen from './LoadingScreen'
import backgroundImage from '../assets/background.jpg'

type Choice = {
  text: string
  next: string
}

type Scene = {
  text: string
  choices: Choice[]
}

type StoryData = {
  [key: string]: Scene
}

export default function Game() {
  const [currentScene, setCurrentScene] = useState<string>('home')
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  const story = storyData as StoryData
  const scene = currentScene === 'home' ? null : story[currentScene]

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!scene) return

    setIsTyping(true)
    setDisplayedText('')
    let currentText = ''
    let index = 0

    const intervalId = setInterval(() => {
      if (index < scene.text.length) {
        currentText += scene.text[index]
        setDisplayedText(currentText)
        index++
      } else {
        setIsTyping(false)
        clearInterval(intervalId)
      }
    }, 30)

    return () => {
      clearInterval(intervalId)
    }
  }, [scene])

  const handleChoice = (nextScene: string) => {
    setIsTransitioning(true)
    setCurrentScene(nextScene)
    // Remove transition state after a brief delay
    setTimeout(() => setIsTransitioning(false), 50)
  }

  useEffect(() => {
    if (!isTransitioning) {
      window.history.pushState(
        { scene: currentScene },
        '',
        `/${currentScene === 'home' ? '' : currentScene}`
      )
    }
  }, [currentScene, isTransitioning])

  if (isLoading) {
    return <LoadingScreen />
  }

  if (currentScene === 'home') {
    return (
      <div 
        className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60 pointer-events-none z-0" />
        <div className="w-full max-w-md p-6 flex flex-col items-center space-y-8 backdrop-blur-sm bg-black/30 rounded-xl z-10">
          <h1 className="font-['CustomFont'] text-5xl font-bold text-center text-emerald-50 drop-shadow-lg animate-fade-in">
            LOST IN THE WOODS
          </h1>
          <button
            onClick={() => setCurrentScene('start')}
            className="font-['CustomFont'] w-full px-8 py-4 text-xl 
                       bg-emerald-900/80 hover:bg-emerald-800 
                       text-emerald-200 hover:text-white 
                       border border-emerald-800 rounded-lg 
                       transition-all transform hover:scale-105 
                       shadow-2xl animate-slide-up"
          >
            Begin Journey
          </button>
        </div>
      </div>
    )
  }

  if (!scene) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-950/50">
        <div className="p-4 bg-red-900/50 rounded-lg text-red-100">
          Error: Scene not found. Please restart the game.
        </div>
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60 
                   pointer-events-none z-0"
      />
      <div className="w-full max-w-md h-screen flex flex-col items-center justify-center p-4 space-y-8">
        <div className="absolute top-4 right-4 flex gap-2">
          <button 
            onClick={() => setCurrentScene('home')}
            className="px-3 py-1 text-sm bg-emerald-900/50 hover:bg-emerald-800/50 
                       text-emerald-100 rounded border border-emerald-700/30"
          >
            Restart
          </button>
        </div>
        <div className="w-full backdrop-blur-sm bg-black/30 rounded-xl p-4">
          <div className={`w-full transition-opacity duration-200 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <StoryDisplay text={displayedText} />
          </div>
          <div className="w-full flex flex-col items-center gap-2 mt-2">
            {!isTyping && !isTransitioning && scene.choices.map((choice, index) => (
              <ChoiceButton
                key={index}
                text={choice.text}
                onClick={() => handleChoice(choice.next)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}