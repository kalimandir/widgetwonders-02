
import React from 'react';
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface DonationAmountProps {
  value: number;
  selected: boolean;
  onClick: (amount: number) => void;
}

const DonationAmount: React.FC<DonationAmountProps> = ({ 
  value, 
  selected,
  onClick 
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div 
      className={cn(
        "donation-amount-button animate-scale-in",
        selected && "selected",
        isMobile ? "h-12" : "h-16" // Even shorter on mobile
      )}
      onClick={() => onClick(value)}
    >
      <span className={cn(
        "text-lg sm:text-2xl font-semibold transition-colors duration-300",
        selected ? "text-donation-purple" : "text-gray-800"
      )}>
        ${value}
      </span>
      
      {selected && (
        <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-donation-purple rounded-full animate-fade-in" />
      )}
    </div>
  );
};

export default DonationAmount;
