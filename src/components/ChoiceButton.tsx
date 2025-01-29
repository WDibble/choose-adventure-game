type Props = {
    text: string
    onClick: () => void
  }
  
  export default function ChoiceButton({ text, onClick }: Props) {
    return (
      <button
        onClick={onClick}
        className="font-['Palatino'] font-semibold text-white w-full p-4 
                  bg-emerald-900/80 hover:bg-emerald-800 rounded-lg 
                  transition-all duration-300 transform hover:scale-102
                  border border-emerald-700/50 shadow-lg
                  animate-fade-in opacity-0 [animation-fill-mode:forwards]
                  hover:border-emerald-600 hover:shadow-emerald-900/20"
        role="button"
        aria-label={text}
        tabIndex={0}
      >
        {text}
      </button>
    )
  }