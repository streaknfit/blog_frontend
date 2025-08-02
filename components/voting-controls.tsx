"use client"

import { useState } from "react"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { blogApi } from "@/lib/api"

interface VotingControlsProps {
  blogId: number
  upvotes: number
}

export function VotingControls({ blogId, upvotes }: VotingControlsProps) {
  const [currentUpvotes, setCurrentUpvotes] = useState(upvotes)
  const [userVote, setUserVote] = useState<"up" | null>(null)
  const { toast } = useToast()

  const handleVote = async (type: "up") => {
    try {
      if (userVote === type) {
        // Remove vote
        setCurrentUpvotes((prev) => prev - 1)
        setUserVote(null)
      } else {
        // Add vote
        setCurrentUpvotes((prev) => prev + 1)
        setUserVote(type)
        
        // Call API to increment upvotes
        await blogApi.incrementUpvotes(blogId)
      }

      toast({
        description: `Vote ${userVote === type ? "removed" : "recorded"}!`,
      })
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to record vote. Please try again.",
      })
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={userVote === "up" ? "default" : "outline"}
        size="sm"
        onClick={() => handleVote("up")}
        className="h-8"
      >
        <ArrowUp className="h-3 w-3 mr-1" />
        <span className="text-xs">{currentUpvotes}</span>
      </Button>
    </div>
  )
}
