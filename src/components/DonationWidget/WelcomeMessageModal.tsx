
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Check, AlertCircle, Loader2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type MessageStatus = 'idle' | 'sending' | 'success' | 'error';

interface WelcomeMessageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  donor: {
    name: string;
    ens?: string;
    initialDonation: number;
    joinDate: string;
  };
}

const WelcomeMessageModal: React.FC<WelcomeMessageModalProps> = ({
  open,
  onOpenChange,
  donor,
}) => {
  const [personalNote, setPersonalNote] = useState('');
  const [status, setStatus] = useState<MessageStatus>('idle');
  const { toast } = useToast();
  const maxChars = 150;

  // Example impact message based on donation amount
  const getImpactMessage = (amount: number) => {
    if (amount < 50) {
      return "provide school supplies for 2 students";
    } else if (amount < 100) {
      return "support a teacher for a week";
    } else {
      return "fund a classroom's technology needs for a month";
    }
  };

  const defaultMessage = `Thank you for your contribution to Hope Foundation! Your $${donor.initialDonation} will help us ${getImpactMessage(donor.initialDonation)}.`;
  
  const handleSendMessage = async () => {
    // Prevent sending if already in progress
    if (status === 'sending') return;
    
    setStatus('sending');
    
    // Simulate API call
    try {
      // In a real implementation, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success scenario
      setStatus('success');
      toast({
        title: "Welcome message sent",
        description: `Your message was successfully sent to ${donor.ens || donor.name}`,
      });
      
      // Close modal after success (with slight delay)
      setTimeout(() => {
        onOpenChange(false);
        // Reset for next time
        setTimeout(() => {
          setStatus('idle');
          setPersonalNote('');
        }, 300);
      }, 1500);
    } catch (error) {
      console.error("Error sending welcome message:", error);
      setStatus('error');
    }
  };
  
  const handleRetry = () => {
    setStatus('idle');
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {/* Content depends on status */}
        {status === 'sending' && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
            <Loader2 className="h-8 w-8 text-purple-600 animate-spin mb-4" />
            <p className="text-center font-medium">Sending welcome message...</p>
            <p className="text-center text-sm text-muted-foreground mt-2">Creating blockchain transaction</p>
          </div>
        )}
        
        {status === 'success' && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-center font-medium">Welcome message sent to {donor.ens || donor.name}</p>
          </div>
        )}
        
        {status === 'error' && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <p className="text-center font-medium">Message failed to send</p>
            <Button onClick={handleRetry} variant="outline" className="mt-4">
              Retry
            </Button>
          </div>
        )}
        
        <DialogHeader>
          <DialogTitle className="text-center sm:text-left">
            Send Welcome to {donor.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          {/* Recipient information */}
          <div className="rounded-md bg-muted p-3">
            <div className="flex flex-col gap-1">
              {donor.ens && (
                <div className="flex justify-between">
                  <span className="text-sm font-medium">ENS</span>
                  <span className="text-sm">{donor.ens}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-sm font-medium">Amount</span>
                <span className="text-sm">${donor.initialDonation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Date</span>
                <span className="text-sm">{donor.joinDate}</span>
              </div>
            </div>
          </div>
          
          {/* Default message */}
          <div className="rounded-md bg-purple-50 p-3 border border-purple-100">
            <p className="text-sm text-gray-700">{defaultMessage}</p>
            <p className="text-sm text-gray-700 mt-2">Join our community discussions to see your impact grow!</p>
          </div>
          
          {/* Personal note */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="personal-note" className="text-sm font-medium">
                Add a personal note (optional)
              </label>
              <span className="text-xs text-muted-foreground">
                {personalNote.length}/{maxChars} characters
              </span>
            </div>
            <Textarea
              id="personal-note"
              placeholder="Write a personal message..."
              value={personalNote}
              onChange={(e) => {
                if (e.target.value.length <= maxChars) {
                  setPersonalNote(e.target.value);
                }
              }}
              className="resize-none"
              rows={3}
            />
          </div>
          
          {/* Blockchain note */}
          <div className="rounded-md bg-blue-50 p-3 border border-blue-100">
            <p className="text-xs text-gray-600">
              This will create a blockchain transaction. The recipient will see this message in their wallet or notifications.
            </p>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-between flex-col-reverse sm:flex-row gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSendMessage} 
            disabled={status === 'sending'}
            className="bg-purple-600 hover:bg-purple-700 gap-2"
          >
            {status === 'sending' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send Message
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeMessageModal;
