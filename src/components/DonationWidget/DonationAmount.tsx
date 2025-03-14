
import React from 'react';
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface DonationAmountProps {
  value: number;
  selected: boolean;
  onClick: (amount: number) => void;
  impactStatement?: string;
}

const DonationAmount: React.FC<DonationAmountProps> = ({ 
  value, 
  selected,
  onClick,
  impactStatement 
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="donation-amount-container">
      <button
        className={cn(
          "donation-circle",
          selected && "selected",
          "transition-all duration-300 ease-in-out"
        )}
        onClick={() => onClick(value)}
        aria-pressed={selected}
      >
        <span className={cn(
          "text-lg font-bold",
          selected ? "text-white" : "text-gray-800"
        )}>
          ${value}
        </span>
      </button>
      
      {impactStatement && selected && (
        <p className="impact-statement text-xs font-normal mt-1.5 text-center text-gray-600">
          {impactStatement}
        </p>
      )}
    </div>
  );
};

export default DonationAmount;
