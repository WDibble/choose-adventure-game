type Props = {
  text: string
}

export default function StoryDisplay({ text }: Props) {
  return (
    <div className="text-xl leading-relaxed p-6 bg-emerald-950/70 backdrop-blur-md rounded-lg shadow-2xl min-h-[200px] flex items-center justify-center border border-emerald-800/30">
      <p className="font-['Palatino'] text-center text-emerald-50 whitespace-pre-wrap tracking-wide leading-relaxed">
        {text}
      </p>
    </div>
  )
}