
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import DonationAmount from './DonationAmount';
import CustomAmount from './CustomAmount';
import { useIsMobile } from "@/hooks/use-mobile";
import { Progress } from "@/components/ui/progress";
import { HandHeart } from "lucide-react";

interface DonationWidgetProps {
  organizationName: string;
  missionStatement: string;
  logoUrl: string;
}

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

const DonationWidget: React.FC<DonationWidgetProps> = ({
  organizationName,
  missionStatement,
  logoUrl
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null); // Changed from 25 to null
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isCustomActive, setIsCustomActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
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
    
    setTimeout(() => {
      console.log(`Donating $${amount} to ${organizationName}`);
      setIsSubmitting(false);
      // In a real app, you would submit to your payment processor here
    }, 1000);
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
      "w-full bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-500",
      "border border-gray-100",
      animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    )}>
      <div className="p-6 flex flex-col items-center">
        <div className={cn(
          "w-16 h-16 rounded-2xl overflow-hidden flex items-center justify-center mb-4 transition-all",
          "bg-purple-100 duration-700 delay-100",
          animateIn ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}>
          <HandHeart className="w-8 h-8 text-purple-600" />
        </div>

        <div className={cn(
          "text-center mb-5 transition-all duration-700 delay-200",
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <h2 className="text-xl font-bold text-gray-900 mb-1">{organizationName}</h2>
          <p className="text-sm text-gray-600">{missionStatement}</p>
        </div>

        <div className={cn(
          "w-full mb-6 transition-all duration-700 delay-250",
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-700 font-medium">
              $3,250 raised
            </span>
            <span className="text-sm text-gray-600">
              $5,000 goal
            </span>
          </div>
          <Progress 
            value={progressValue} 
            className="h-2.5 bg-gray-100 rounded-full" 
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
            "w-full mb-4 p-3 bg-purple-50 border border-purple-100 rounded-xl text-sm text-purple-800",
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
            className="w-full py-3 px-4 bg-donation-purple text-white rounded-xl
                     text-base font-semibold tracking-wide transition-all duration-300
                     hover:bg-[#7C3AED] active:scale-[0.98] shadow-md
                     hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-donation-purple
                     focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
              <span>Donate ${getDonationAmount()}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationWidget;
