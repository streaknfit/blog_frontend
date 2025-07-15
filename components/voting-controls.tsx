"use client"

import { useState } from "react"
import { ArrowUp, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface VotingControlsProps {
  blogId: string
  upvotes: number
  downvotes: number
}

export function VotingControls({ blogId, upvotes, downvotes }: VotingControlsProps) {
  const [currentUpvotes, setCurrentUpvotes] = useState(upvotes)
  const [currentDownvotes, setCurrentDownvotes] = useState(downvotes)
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null)
  const { toast } = useToast()

  const handleVote = async (type: "up" | "down") => {
    try {
      // Simulate API call
      if (userVote === type) {
        // Remove vote
        if (type === "up") {
          setCurrentUpvotes((prev) => prev - 1)
        } else {
          setCurrentDownvotes((prev) => prev - 1)
        }
        setUserVote(null)
      } else {
        // Add vote or change vote
        if (userVote) {
          // Change vote
          if (userVote === "up") {
            setCurrentUpvotes((prev) => prev - 1)
            setCurrentDownvotes((prev) => prev + 1)
          } else {
            setCurrentDownvotes((prev) => prev - 1)
            setCurrentUpvotes((prev) => prev + 1)
          }
        } else {
          // New vote
          if (type === "up") {
            setCurrentUpvotes((prev) => prev + 1)
          } else {
            setCurrentDownvotes((prev) => prev + 1)
          }
        }
        setUserVote(type)
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
      <Button
        variant={userVote === "down" ? "default" : "outline"}
        size="sm"
        onClick={() => handleVote("down")}
        className="h-8"
      >
        <ArrowDown className="h-3 w-3 mr-1" />
        <span className="text-xs">{currentDownvotes}</span>
      </Button>
    </div>
  )
}
