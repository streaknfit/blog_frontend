"use client"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams, useRouter } from "next/navigation"

export function LoadingSpinner() {
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    // Start loading immediately when component mounts or route changes
    setIsLoading(true)
    setProgress(0)

    // Animate progress more quickly for better responsiveness
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 85) return prev
        return prev + Math.random() * 20
      })
    }, 50)

    // Complete loading after a shorter time for better UX
    const timer = setTimeout(() => {
      setProgress(100)
      setTimeout(() => {
        setIsLoading(false)
        setProgress(0)
      }, 150)
    }, 600)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(timer)
    }
  }, [pathname, searchParams])

  // Listen for router events for immediate response
  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true)
      setProgress(0)
    }

    const handleComplete = () => {
      setProgress(100)
      setTimeout(() => {
        setIsLoading(false)
        setProgress(0)
      }, 150)
    }

    // Add event listeners for router events
    window.addEventListener('beforeunload', handleStart)
    
    return () => {
      window.removeEventListener('beforeunload', handleStart)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
      <div 
        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-r-full transition-all duration-200 ease-out" 
        style={{ 
          width: `${progress}%`,
          transition: 'width 0.2s ease-out'
        }}
      />
    </div>
  )
} 