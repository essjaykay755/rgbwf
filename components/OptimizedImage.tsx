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
  hero: '(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px',
  campaign: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
}

const dimensions = {
  hero: { width: 1920, height: 1080 },
  video: { width: 1280, height: 720 },
  square: { width: 800, height: 800 },
  campaign: { width: 800, height: 600 }
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
  const { width, height } = dimensions[aspectRatio]
  
  return (
    <div className={`relative ${aspectRatioClasses[aspectRatio]} ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={imageSizes[aspectRatio]}
        quality={isHero ? 85 : 75}
        className={`object-cover ${isHero ? 'will-change-transform' : ''}`}
        loading={priority || isHero ? "eager" : "lazy"}
        priority={priority || isHero}
        fetchPriority={isHero ? "high" : undefined}
        decoding={isHero ? "sync" : "async"}
        placeholder={isHero ? "blur" : undefined}
        blurDataURL={isHero ? "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy0vLi44QjxAOEA4Qi5AOTc5PkVFPkdEREdHREdHR0f/2wBDAR" : undefined}
        style={{
          ...props.style,
          transform: isHero ? 'translate3d(0, 0, 0)' : undefined,
          backfaceVisibility: isHero ? 'hidden' : undefined,
          width: '100%',
          height: '100%'
        }}
        {...props}
      />
    </div>
  )
} 