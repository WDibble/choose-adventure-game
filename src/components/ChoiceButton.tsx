type Props = {
    text: string
    onClick: () => void
  }
  
  export default function ChoiceButton({ text, onClick }: Props) {
    return (
      <button
        onClick={onClick}
        className="font-['Georgia'] font-semibold text-white w-full p-4 bg-emerald-950 hover:bg-emerald-800 rounded-lg transition-all duration-300 
                  transform hover:scale-105 shadow-md text-center border border-emerald-700
                  animate-fade-in opacity-0 [animation-fill-mode:forwards]"
      >
        {text}
      </button>
    )
  }