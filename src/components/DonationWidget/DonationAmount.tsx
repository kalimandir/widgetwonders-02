
import React from 'react';
import { cn } from "@/lib/utils";

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
  return (
    <div 
      className={cn(
        "donation-amount-button animate-scale-in",
        selected && "selected"
      )}
      onClick={() => onClick(value)}
    >
      <span className={cn(
        "text-2xl font-semibold transition-colors duration-300",
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
