
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import DonationAmount from './DonationAmount';
import CustomAmount from './CustomAmount';
import { useIsMobile } from "@/hooks/use-mobile";
import { Progress } from "@/components/ui/progress";
import { ArrowUp } from "lucide-react";

interface DonationWidgetProps {
  organizationName: string;
  missionStatement: string;
  logoUrl: string;
}

const PREDEFINED_AMOUNTS = [5, 10, 25, 50];

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
  const isMobile = useIsMobile();

  useEffect(() => {
    // Animate in elements with a slight delay for a nice entrance
    setAnimateIn(true);
    
    // Animate progress bar from 0 to 65%
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
    setSelectedAmount(null);
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
    
    // Simulate API call
    setTimeout(() => {
      console.log(`Donating $${amount} to ${organizationName}`);
      setIsSubmitting(false);
      // Here you would redirect to payment processor or next step
    }, 1000);
  };

  const isValidAmount = getDonationAmount() > 0;

  return (
    <div className={cn(
      "w-full bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-500",
      "border border-gray-100",
      animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    )}>
      <div className="p-3 sm:p-6 flex flex-col items-center">
        {/* Logo */}
        <div className={cn(
          "w-16 h-16 rounded-2xl overflow-hidden shadow-md mb-2 sm:mb-4 transition-all",
          "bg-gray-50 duration-700 delay-100",
          animateIn ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}>
          <img
            src={logoUrl}
            alt={`${organizationName} logo`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Organization info */}
        <div className={cn(
          "text-center mb-4 sm:mb-6 transition-all duration-700 delay-200",
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{organizationName}</h2>
          <p className="text-xs sm:text-sm text-gray-600">{missionStatement}</p>
        </div>

        {/* Progress bar section */}
        <div className={cn(
          "w-full px-1 mb-4 sm:mb-5 transition-all duration-700 delay-250",
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs sm:text-sm text-gray-700">
              $3,250 raised toward $5,000 goal
            </span>
            <div className="flex items-center text-xs text-green-600 font-medium">
              <ArrowUp size={12} className="mr-0.5" />
              <span>+$250 this week</span>
            </div>
          </div>
          <Progress 
            value={progressValue} 
            className="h-2 bg-gray-100 rounded-full w-[90%] mx-auto" 
          />
        </div>

        {/* Donation amounts */}
        <div className={cn(
          "w-full grid grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6 transition-all duration-700 delay-300",
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          {PREDEFINED_AMOUNTS.map((amount) => (
            <DonationAmount
              key={amount}
              value={amount}
              selected={selectedAmount === amount}
              onClick={handleAmountSelect}
            />
          ))}
        </div>

        {/* Custom amount */}
        <div className={cn(
          "w-full mb-4 sm:mb-6 transition-all duration-700 delay-400",
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <CustomAmount
            active={isCustomActive}
            value={customAmount}
            onChange={handleCustomAmountChange}
            onFocus={handleCustomFocus}
          />
        </div>

        {/* Donate button */}
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
              <span>Donate Now</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationWidget;
