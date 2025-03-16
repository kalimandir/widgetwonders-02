
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Target, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  Calendar,
  Share2,
  Bell,
  UserPlus,
  Trophy
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export interface Challenge {
  id: string;
  name: string;
  goal: number;
  current: number;
  participants: number;
  daysLeft: number;
  description?: string;
}

interface JoinChallengeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  challenge: Challenge;
  onJoinChallenge: (challengeId: string) => Promise<void>;
}

const JoinChallengeModal: React.FC<JoinChallengeModalProps> = ({
  open,
  onOpenChange,
  challenge,
  onJoinChallenge
}) => {
  const [isJoining, setIsJoining] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const { toast } = useToast();

  const progressPercentage = (challenge.current / challenge.goal) * 100;

  const handleJoinChallenge = async () => {
    try {
      setIsJoining(true);
      await onJoinChallenge(challenge.id);
      setIsJoined(true);
      toast({
        title: "Challenge joined!",
        description: `You are now participating in ${challenge.name}`,
      });
    } catch (error) {
      toast({
        title: "Failed to join challenge",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">
              {challenge.name}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 mb-2 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-200" />
              <span>{challenge.participants} participants</span>
            </div>
            <Badge className="bg-purple-400/30 text-white border-none">
              <Clock className="h-3.5 w-3.5 mr-1" />
              {challenge.daysLeft} days left
            </Badge>
          </div>
          <div className="mt-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>${challenge.current.toLocaleString()} of ${challenge.goal.toLocaleString()}</span>
            </div>
            <Progress 
              value={progressPercentage} 
              className="h-2 bg-purple-400/30" 
            />
          </div>
        </div>

        {!isJoined ? (
          <>
            <div className="p-6 space-y-4">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  About This Challenge
                </h3>
                <p className="text-gray-600">
                  {challenge.description || `Join our community effort to raise funds for ${challenge.name}. Together, we can make a bigger impact!`}
                </p>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-purple-600" />
                  How Participation Works
                </h3>
                <div className="space-y-2">
                  <div className="flex gap-3">
                    <div className="bg-purple-100 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                      <Calendar className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-gray-700 font-medium">Track Your Progress</p>
                      <p className="text-sm text-gray-500">Your donations will automatically count toward the challenge goal</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="bg-purple-100 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                      <Bell className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-gray-700 font-medium">Stay Updated</p>
                      <p className="text-sm text-gray-500">Receive progress notifications as our community works together</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="bg-purple-100 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                      <Share2 className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-gray-700 font-medium">Community Impact</p>
                      <p className="text-sm text-gray-500">Join forces with other donors to create meaningful change</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="rounded-lg bg-blue-50 p-4 border border-blue-100">
                <h3 className="text-base font-medium text-blue-800 flex items-center gap-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-blue-500" />
                  What You're Confirming
                </h3>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                    <span>You're joining the "{challenge.name}" community challenge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                    <span>No financial pre-commitment is required to join</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                    <span>You'll receive updates on challenge progress and milestones</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <DialogFooter className="p-6 pt-0">
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="border-gray-300"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleJoinChallenge}
                className="bg-purple-600 hover:bg-purple-700"
                disabled={isJoining}
              >
                {isJoining ? "Joining..." : "Join Challenge"}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="p-6 space-y-5 text-center">
            <div className="flex justify-center">
              <div className="bg-green-100 rounded-full p-4">
                <Trophy className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">You've Joined the Challenge!</h3>
              <p className="text-gray-600 mt-1">
                Thank you for supporting {challenge.name}
              </p>
            </div>
            <div className="pt-2 space-y-3">
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={() => onOpenChange(false)}
              >
                Back to Challenges
              </Button>
              <Button 
                variant="outline" 
                className="w-full gap-1"
                onClick={() => onOpenChange(false)}
              >
                Share with Friends <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default JoinChallengeModal;
