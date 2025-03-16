import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Heart, AlertCircle, Loader2, Send, Wallet, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type MessageStatus = 'idle' | 'sending' | 'success' | 'error';
type TokenType = 'USDC' | 'USDT' | 'DAI';

interface ThanksMessageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  donor: {
    name: string;
    ens?: string;
    donation: number;
    donationDate: string;
    milestone?: string;
    streak?: number;
    totalContribution?: number;
  };
}

const ThanksMessageModal: React.FC<ThanksMessageModalProps> = ({
  open,
  onOpenChange,
  donor,
}) => {
  const [personalNote, setPersonalNote] = useState('');
  const [status, setStatus] = useState<MessageStatus>('idle');
  const [includeTip, setIncludeTip] = useState(false);
  const [tipAmount, setTipAmount] = useState(2);
  const [tokenType, setTokenType] = useState<TokenType>('USDC');
  const { toast } = useToast();
  const maxChars = 150;

  // Mock token balances (in a real app these would come from a wallet connection)
  const tokenBalances: Record<TokenType, number> = {
    'USDC': 25.45,
    'USDT': 12.75,
    'DAI': 8.20
  };

  // Mock gas fee estimate (in a real app this would be calculated based on network conditions)
  const gasEstimate = 0.12;

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

  // Updated message template with conditional tip text
  const getDefaultMessage = () => {
    const baseMessage = `Thank you for your continued support to Hope Foundation! Your dedication over ${donor.streak} donations totaling $${donor.totalContribution} has helped us ${getImpactMessage(donor.donation)}.`;
    return includeTip ? `${baseMessage} We've included a small token of our appreciation.` : baseMessage;
  };
  
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
        title: "Thank you message sent",
        description: `Your message was successfully sent to ${donor.ens || donor.name}`,
      });
      
      // Close modal after success (with slight delay)
      setTimeout(() => {
        onOpenChange(false);
        // Reset for next time
        setTimeout(() => {
          setStatus('idle');
          setPersonalNote('');
          setIncludeTip(false);
          setTipAmount(2);
        }, 300);
      }, 1500);
    } catch (error) {
      console.error("Error sending thank you message:", error);
      setStatus('error');
    }
  };
  
  const handleRetry = () => {
    setStatus('idle');
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {/* Add DialogDescription for accessibility */}
        <DialogDescription className="sr-only">
          Send a thank you message to {donor.name} for their donation streak
        </DialogDescription>
        
        {/* Content depends on status */}
        {status === 'sending' && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
            <Loader2 className="h-8 w-8 text-amber-600 animate-spin mb-4" />
            <p className="text-center font-medium">Sending thank you message...</p>
            <p className="text-center text-sm text-muted-foreground mt-2">Creating blockchain transaction</p>
          </div>
        )}
        
        {status === 'success' && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Heart className="h-6 w-6 text-red-600" />
            </div>
            <p className="text-center font-medium">Thank you message sent to {donor.ens || donor.name}</p>
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
            Thank {donor.name} for Donation
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          {/* Recipient information */}
          <div className="rounded-md bg-muted p-3">
            <div className="flex flex-col gap-1">
              {donor.ens && (
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Acknowledging donation from</span>
                  <span className="text-sm">{donor.ens}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-sm font-medium">Milestone</span>
                <span className="text-sm">{donor.milestone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">{donor.name}'s total contributions</span>
                <span className="text-sm">${donor.totalContribution}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Streak</span>
                <span className="text-sm">{donor.streak} donations</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Date</span>
                <span className="text-sm">{donor.donationDate}</span>
              </div>
            </div>
          </div>
          
          {/* Default message */}
          <div className="rounded-md bg-amber-50 p-3 border border-amber-100">
            <p className="text-sm text-gray-700">{getDefaultMessage()}</p>
            <p className="text-sm text-gray-700 mt-2">Your ongoing support inspires our community!</p>
          </div>
          
          {/* Personal note */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="personal-note" className="text-sm font-medium">
                Add a personal note (optional)
              </label>
              <span className={`text-xs ${personalNote.length >= maxChars * 0.9 ? 'text-amber-600' : 'text-muted-foreground'}`}>
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
          
          {/* Include tip toggle */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex flex-col">
              <span className="text-sm font-medium">Include tip with message</span>
              <span className="text-xs text-muted-foreground">Send a small token of appreciation</span>
            </div>
            <Switch
              checked={includeTip}
              onCheckedChange={setIncludeTip}
            />
          </div>
          
          {/* Conditional tip options */}
          {includeTip && (
            <div className="rounded-md bg-amber-50 p-3 border border-amber-100 space-y-4 animate-in fade-in-50 duration-200">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Your tip amount</span>
                  <span className="text-sm font-medium text-amber-700">${tipAmount}</span>
                </div>
                <Slider
                  value={[tipAmount]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(value) => setTipAmount(value[0])}
                  className="py-1"
                />
                <p className="text-xs text-gray-600 pt-1">
                  Send ${tipAmount} tip via Yodl Protocol
                </p>
              </div>
              
              {/* Token selection */}
              <div className="space-y-2">
                <label htmlFor="token-select" className="text-sm font-medium">
                  Select token
                </label>
                <Select 
                  value={tokenType}
                  onValueChange={(value) => setTokenType(value as TokenType)}
                >
                  <SelectTrigger id="token-select" className="w-full">
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USDC">USDC</SelectItem>
                    <SelectItem value="USDT">USDT</SelectItem>
                    <SelectItem value="DAI">DAI</SelectItem>
                  </SelectContent>
                </Select>
                <div className="text-xs text-gray-600 flex justify-between pt-1">
                  <span>Your balance:</span>
                  <span className={tokenBalances[tokenType] < tipAmount ? 'text-red-500 font-medium' : ''}>
                    {tokenBalances[tokenType]} {tokenType}
                    {tokenBalances[tokenType] < tipAmount && ' (insufficient)'}
                  </span>
                </div>
              </div>
            </div>
          )}
          
          {/* Blockchain note */}
          <div className="rounded-md bg-amber-50 p-3 border border-amber-100">
            <p className="text-xs text-gray-600">
              {includeTip 
                ? "This will send a thank you message and your $" + tipAmount + " tip via blockchain."
                : "This will send a thank you message via blockchain transaction."}
            </p>
            <p className="text-xs text-gray-600 mt-2 flex items-center">
              <Wallet className="h-3 w-3 mr-1 inline" /> Estimated gas fee: ~${gasEstimate.toFixed(2)}
            </p>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-between flex-col-reverse sm:flex-row gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSendMessage} 
            disabled={status === 'sending' || (includeTip && tokenBalances[tokenType] < tipAmount)}
            className="bg-amber-600 hover:bg-amber-700 gap-2"
          >
            {status === 'sending' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : includeTip ? (
              <>
                <CreditCard className="h-4 w-4" />
                Send Thanks + ${tipAmount} Tip
              </>
            ) : (
              <>
                <Heart className="h-4 w-4 text-red-500" />
                Send Thanks
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ThanksMessageModal;
