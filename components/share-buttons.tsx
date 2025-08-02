"use client"

import { useState, useEffect } from "react"
import { Share2, Twitter, Linkedin, Mail, LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface ShareButtonsProps {
  url: string
  title: string
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const { toast } = useToast()
  const [fullUrl, setFullUrl] = useState('')

  useEffect(() => {
    setFullUrl(`${window.location.origin}${url}`)
  }, [url])

  const shareLinks = {
    twitter: fullUrl ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}` : '#',
    linkedin: fullUrl ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}` : '#',
    email: fullUrl ? `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article: ${fullUrl}`)}` : '#',
  }

  const copyToClipboard = async () => {
    if (!fullUrl) return
    
    try {
      await navigator.clipboard.writeText(fullUrl)
      toast({
        description: "Link copied to clipboard!",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to copy link.",
      })
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-foreground flex items-center">
        <Share2 className="h-4 w-4 mr-2" />
        Share:
      </span>

      <Button variant="outline" size="sm" asChild>
        <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer">
          <Twitter className="h-4 w-4" />
        </a>
      </Button>

      <Button variant="outline" size="sm" asChild>
        <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer">
          <Linkedin className="h-4 w-4" />
        </a>
      </Button>

      <Button variant="outline" size="sm" asChild>
        <a href={shareLinks.email}>
          <Mail className="h-4 w-4" />
        </a>
      </Button>

      <Button variant="outline" size="sm" onClick={copyToClipboard}>
        <LinkIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}
