type Props = {
    text: string
    onClick: () => void
  }
  
  export default function ChoiceButton({ text, onClick }: Props) {
    return (
      <button
        onClick={onClick}
        className="text-white w-full p-4 bg-red-950 hover:bg-red-800 rounded-lg transition-all duration-300 
                   transform hover:scale-105 shadow-md text-center border border-red-700
                   animate-fade-in opacity-0 [animation-fill-mode:forwards]"
      >
        {text}
      </button>
    )
  }