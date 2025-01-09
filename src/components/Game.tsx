import { useState, useEffect } from 'react'
import storyData from '../data/story.json'
import StoryDisplay from './StoryDisplay'
import ChoiceButton from './ChoiceButton'

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
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-red-950 to-red-900">
        <div className="w-full max-w-md p-6 flex flex-col items-center space-y-8">
          <h1 className="text-5xl font-bold mb-8 text-center text-red-100 drop-shadow-lg">
            Lost in the Woods
          </h1>
          <button
            onClick={() => setCurrentScene('start')}
            className="w-full px-8 py-4 text-xl bg-red-900 hover:bg-red-800 text-red-200 hover:text-white border border-red-800 rounded-lg transition-all transform hover:scale-105 shadow-2xl"
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
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-red-950 to-red-900">
      <div className="w-full max-w-md h-screen flex flex-col items-center justify-center p-4 space-y-8">
        <div className="w-full">
          <StoryDisplay text={displayedText} />
        </div>
        <div className="w-full flex flex-col items-center gap-3">
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
  )
}