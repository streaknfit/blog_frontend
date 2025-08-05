"use client"

import { useState } from "react"

interface BlogImageProps {
  src: string
  alt: string
  className?: string
  fallbackClassName?: string
}

export function BlogImage({ src, alt, className = "", fallbackClassName = "" }: BlogImageProps) {
  const [hasError, setHasError] = useState(false)

  if (hasError || !src) {
    return (
      <div className={`bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center ${fallbackClassName}`}>
        <svg 
          className="w-16 h-16 text-gray-400 dark:text-gray-600" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => {
        console.error('Failed to load image:', src)
        setHasError(true)
      }}
    />
  )
} 