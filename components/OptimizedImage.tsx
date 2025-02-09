import Image from 'next/image'
import { ComponentProps } from 'react'

type OptimizedImageProps = {
  src: string
  alt: string
  className?: string
  aspectRatio?: 'square' | 'video' | 'hero' | 'campaign'
  priority?: boolean
} & Omit<ComponentProps<typeof Image>, 'width' | 'height'>

const aspectRatioClasses = {
  square: 'aspect-square',
  video: 'aspect-video',
  hero: 'aspect-[16/9]',
  campaign: 'aspect-[4/3]'
}

const imageSizes = {
  square: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  video: '(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw',
  hero: '100vw',
  campaign: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
}

export default function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  aspectRatio = 'video',
  priority = false,
  ...props 
}: OptimizedImageProps) {
  const isHero = aspectRatio === 'hero'
  
  return (
    <div className={`relative ${aspectRatioClasses[aspectRatio]} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={imageSizes[aspectRatio]}
        quality={isHero ? 85 : 75}
        className="object-cover"
        loading={priority || isHero ? "eager" : "lazy"}
        priority={priority || isHero}
        fetchPriority={isHero ? "high" : undefined}
        decoding={isHero ? "sync" : "async"}
        {...props}
      />
    </div>
  )
} 