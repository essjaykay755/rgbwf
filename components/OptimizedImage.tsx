import Image from 'next/image'
import { ComponentProps } from 'react'

type OptimizedImageProps = {
  src: string
  alt: string
  className?: string
  aspectRatio?: 'square' | 'video' | 'hero'
} & Omit<ComponentProps<typeof Image>, 'width' | 'height'>

const aspectRatioClasses = {
  square: 'aspect-square',
  video: 'aspect-video',
  hero: 'aspect-[16/10]'
}

export default function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  aspectRatio = 'video',
  ...props 
}: OptimizedImageProps) {
  return (
    <div className={`relative ${aspectRatioClasses[aspectRatio]} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={80}
        className="object-cover"
        {...props}
      />
    </div>
  )
} 