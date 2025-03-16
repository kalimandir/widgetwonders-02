
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Users, Clock, Trophy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface JoinChallengeModalProps {
  isOpen: boolean
  onClose: () => void
  challengeName: string
  currentAmount: number
  targetAmount: number
  daysRemaining: number
  participantCount: number
}

const JoinChallengeModal = ({
  isOpen,
  onClose,
  challengeName,
  currentAmount,
  targetAmount,
  daysRemaining,
  participantCount,
}: JoinChallengeModalProps) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const { toast } = useToast()
  
  const progress = (currentAmount / targetAmount) * 100

  const handleJoinChallenge = async () => {
    setIsLoading(true)
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Successfully joined challenge!",
        description: "You're now part of the community making a difference.",
      })
      onClose()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to join challenge",
        description: "Please try again later.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Join {challengeName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Challenge Stats */}
          <div className="space-y-4">
            <Progress value={progress} className="h-2" />
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1">
                  <Trophy className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Progress</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  ${currentAmount.toLocaleString()} of ${targetAmount.toLocaleString()}
                </p>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Time Left</span>
                </div>
                <p className="text-sm text-muted-foreground">{daysRemaining} days</p>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Participants</span>
                </div>
                <p className="text-sm text-muted-foreground">{participantCount}</p>
              </div>
            </div>
          </div>

          {/* Challenge Information */}
          <div className="space-y-3">
            <h3 className="font-medium">About This Challenge</h3>
            <p className="text-sm text-muted-foreground">
              Join our community in making a difference! When you participate in this challenge, 
              you'll be part of a collective effort to reach our goal. There's no upfront 
              commitment - donate what you can, when you can.
            </p>
          </div>

          {/* Participation Details */}
          <div className="space-y-3">
            <h3 className="font-medium">What to Expect</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Track progress towards our shared goal</li>
              <li>• Connect with other participants</li>
              <li>• Receive updates on challenge milestones</li>
              <li>• Share your impact with the community</li>
            </ul>
          </div>
        </div>

        <DialogFooter className="sm:justify-between">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleJoinChallenge}
            className="w-full sm:w-auto"
            disabled={isLoading}
          >
            {isLoading ? "Joining..." : "Join Challenge"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default JoinChallengeModal
