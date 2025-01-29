export function useSound() {
    const playClick = () => new Audio('/sounds/click.mp3').play()
    const playAmbient = () => {
      const audio = new Audio('/sounds/forest-ambient.mp3')
      audio.loop = true
      return audio.play()
    }
    return { playClick, playAmbient }
  }