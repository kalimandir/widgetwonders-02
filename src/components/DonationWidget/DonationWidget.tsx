import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import DonationAmount from './DonationAmount';
import CustomAmount from './CustomAmount';
import { HandHeart, History } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useIsMobile } from "@/hooks/use-mobile";
import { openYodlCheckout } from '../../utils/yodl';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from "@/components/ui/button";
import HistoryTab from './HistoryTab';

const PREDEFINED_AMOUNTS = [5, 10, 25, 50];
const IMPACT_STATEMENTS = {
  5: "Equips a student with essential school supplies",
  10: "Funds a full day of quality education",
  25: "Supports a week of comprehensive learning materials",
  50: "Sponsors a student's education for an entire month"
};

const SPECIAL_ITEMS = {
  5: "Includes: Digital thank you card with student artwork",
  10: "Includes: Digital impact certificate + quarterly newsletter",
  25: "Includes: \"Supporter\" digital badge + thank you video",
  50: "Includes: Personalized impact report + leadership recognition"
};

const POPULAR_TIER = 25;

interface DonationWidgetProps {
  organizationName: string;
  missionStatement: string;
  logoUrl: string;
}

const DonationWidget: React.FC<DonationWidgetProps> = ({
  organizationName,
  missionStatement,
  logoUrl
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isCustomActive, setIsCustomActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [historyOpen, setHistoryOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setAnimateIn(true);
    
    const timer = setTimeout(() => {
      const animateProgress = () => {
        setProgressValue(prev => {
          const next = prev + 1;
          return next <= 65 ? next : 65;
        });
      };
      
      const progressInterval = setInterval(animateProgress, 15);
      return () => clearInterval(progressInterval);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
    setIsCustomActive(false);
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    if (value) {
      setSelectedAmount(null);
      setIsCustomActive(true);
    }
  };

  const handleCustomFocus = () => {
    setIsCustomActive(true);
    setSelectedAmount(null);
  };

  const getDonationAmount = (): number => {
    if (selectedAmount) return selectedAmount;
    if (customAmount) return parseFloat(customAmount);
    return 0;
  };

  const handleDonate = () => {
    const amount = getDonationAmount();
    if (amount <= 0) return;

    setIsSubmitting(true);
    
    try {
      openYodlCheckout({ 
        amount,
        organizationName 
      });
      
      console.log(`Redirecting to Yodl checkout for $${amount} donation to ${organizationName}`);
      
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      console.error('Error opening Yodl checkout:', error);
      setIsSubmitting(false);
    }
  };

  const getImpactSummary = () => {
    const amount = getDonationAmount();
    if (amount <= 0) return "";
    
    if (selectedAmount === 25 || (isCustomActive && amount === 25)) {
      return `Your $25 donation supports learning materials for 5 students`;
    }
    
    if (amount <= 5) return `Your $${amount} donation equips a student with school supplies`;
    if (amount <= 10) return `Your $${amount} donation funds ${Math.floor(amount/10)} day${amount >= 20 ? 's' : ''} of education`;
    if (amount <= 25) return `Your $${amount} donation supports learning materials for ${Math.ceil(amount/5)} students`;
    return `Your $${amount} donation sponsors ${Math.floor(amount/50)} student${amount >= 100 ? 's' : ''} for a month`;
  };

  const isValidAmount = getDonationAmount() > 0;

  return (
    <div className={cn(
      "w-full bg-white dark:bg-donation-dark-card rounded-3xl shadow-lg overflow-hidden transition-all duration-500 relative",
      "border border-gray-100 dark:border-donation-dark-border",
      animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    )}>
      <div className="p-6 flex flex-col items-center">
        <div className="w-full flex justify-between items-start mb-4">
          <div className={cn(
            "w-16 h-16 rounded-2xl overflow-hidden flex items-center justify-center transition-all",
            "bg-purple-100 dark:bg-donation-dark-selected/60 duration-700 delay-100",
            animateIn ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}>
            <HandHeart className="w-8 h-8 text-purple-600 dark:text-purple-300" />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setHistoryOpen(true)}
            className="rounded-full w-10 h-10 p-2 transition-all duration-300
              bg-white hover:bg-gray-50
              dark:bg-donation-dark-card dark:text-donation-dark-text dark:border-donation-dark-border dark:hover:bg-donation-dark-card-hover"
          >
            <History className="h-5 w-5" />
          </Button>
        </div>

        <div className={cn(
          "text-center mb-5 transition-all duration-700 delay-200",
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <h2 className="text-xl font-bold text-gray-900 dark:text-donation-dark-text mb-1">{organizationName}</h2>
          <p className="text-sm text-gray-600 dark:text-donation-dark-text-secondary">{missionStatement}</p>
        </div>

        <div className={cn(
          "w-full mb-4 transition-all duration-700 delay-250",
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-700 dark:text-donation-dark-text-secondary font-medium">
              $3,250 raised
            </span>
            <span className="text-sm text-gray-600 dark:text-donation-dark-gray-light">
              $5,000 goal
            </span>
          </div>
          <Progress 
            value={progressValue} 
            className="h-2.5 bg-gray-100 dark:bg-donation-dark-gray rounded-full" 
          />
        </div>

        <div className={cn(
          "w-full flex flex-col gap-3 mb-4 transition-all duration-700 delay-300",
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          {PREDEFINED_AMOUNTS.map((amount, index) => (
            <DonationAmount
              key={amount}
              value={amount}
              selected={selectedAmount === amount}
              onClick={handleAmountSelect}
              impactStatement={IMPACT_STATEMENTS[amount as keyof typeof IMPACT_STATEMENTS]}
              specialItem={SPECIAL_ITEMS[amount as keyof typeof SPECIAL_ITEMS]}
              isPopular={amount === POPULAR_TIER}
              boxSize={index + 1}
              iconType={
                amount === 5 ? 'supplies' :
                amount === 10 ? 'day' :
                amount === 25 ? 'week' :
                'month'
              }
            />
          ))}
        </div>

        <div className={cn(
          "w-full mb-4 transition-all duration-700 delay-400",
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <CustomAmount
            active={isCustomActive}
            value={customAmount}
            onChange={handleCustomAmountChange}
            onFocus={handleCustomFocus}
          />
        </div>

        {isValidAmount && (
          <div className={cn(
            "w-full mb-4 p-3 bg-purple-50 dark:bg-donation-dark-selected/30 border border-purple-100 dark:border-donation-dark-selected rounded-xl text-sm text-purple-800 dark:text-purple-300",
            "transition-all duration-300"
          )}>
            {getImpactSummary()}
          </div>
        )}
        
        <div className={cn(
          "w-full transition-all duration-700 delay-500",
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <button
            className="donation-button"
            disabled={!isValidAmount || isSubmitting}
            onClick={handleDonate}
          >
            {isSubmitting ? (
              <span className="inline-flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              <span>Donate ${getDonationAmount()} with Yodl</span>
            )}
          </button>
        </div>

        <Dialog open={historyOpen} onOpenChange={setHistoryOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle className="text-2xl mb-4">Transaction History</DialogTitle>
            </DialogHeader>
            <HistoryTab />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DonationWidget;
