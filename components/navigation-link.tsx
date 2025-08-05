"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface NavigationLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function NavigationLink({ href, children, className = "" }: NavigationLinkProps) {
  const [isNavigating, setIsNavigating] = useState(false)
  const router = useRouter()

  const handleClick = (e: React.MouseEvent) => {
    // Only handle internal navigation
    if (href.startsWith('/') || href.startsWith('#')) {
      e.preventDefault()
      setIsNavigating(true)
      
      // Small delay to show loading state
      setTimeout(() => {
        router.push(href)
      }, 50)
    }
  }

  return (
    <Link 
      href={href} 
      onClick={handleClick}
      className={`${className} ${isNavigating ? 'opacity-70' : ''}`}
    >
      {children}
    </Link>
  )
} 