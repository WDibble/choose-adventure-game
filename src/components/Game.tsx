import { useState, useEffect } from 'react'
import storyData from '../data/story.json'
import StoryDisplay from './StoryDisplay'
import ChoiceButton from './ChoiceButton'
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
  
  const story = storyData as StoryData
  const scene = currentScene === 'home' ? null : story[currentScene]

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
    setCurrentScene(nextScene)
  }

  if (currentScene === 'home') {
    return (
      <div 
        className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="w-full max-w-md p-6 flex flex-col items-center space-y-8 backdrop-blur-sm bg-black/30 rounded-xl">
          <h1 className="font-['CustomFont'] text-4xl font-bold text-center text-white drop-shadow-lg">
            LOST IN THE WOODS
          </h1>
          <button
            onClick={() => setCurrentScene('start')}
            className="font-['CustomFont'] w-full px-8 py-4 text-xl bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 hover:text-white border border-emerald-800 rounded-lg transition-all transform hover:scale-105 shadow-2xl"
          >
            Begin Journey
          </button>
        </div>
      </div>
    )
  }

  if (!scene) {
    return <div>Error: Scene not found</div>
  }

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full max-w-md h-screen flex flex-col items-center justify-center p-4 space-y-8">
        <div className="w-full backdrop-blur-sm bg-black/30 rounded-xl p-4">
          <div className="w-full">
            <StoryDisplay text={displayedText} />
          </div>
          <div className="w-full flex flex-col items-center gap-2 mt-2">
            {!isTyping && scene.choices.map((choice, index) => (
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