type Props = {
    src: string
    alt: string
    className?: string
  }
  
  export default function OptimizedImage({ src, alt, className }: Props) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={className}
        onLoad={(e) => {
          e.currentTarget.classList.remove('opacity-0')
        }}
      />
    )
  }