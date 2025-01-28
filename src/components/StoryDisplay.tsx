type Props = {
  text: string
}

export default function StoryDisplay({ text }: Props) {
  return (
    <div className="text-xl leading-relaxed p-6 bg-emerald-950 rounded-lg shadow-lg min-h-[200px] flex items-center justify-center">
      <p className="font-['Georgia'] text-center text-white whitespace-pre-wrap tracking-wide">
        {text}
      </p>
    </div>
  )
}