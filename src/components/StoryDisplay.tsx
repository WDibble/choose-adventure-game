type Props = {
    text: string
  }
  
  export default function StoryDisplay({ text }: Props) {
    return (
      <div className="text-xl leading-relaxed p-6 bg-red-950 rounded-lg shadow-lg min-h-[200px] flex items-center justify-center">
        <p className="text-center text-white whitespace-pre-wrap">{text}</p>
      </div>
    )
  }