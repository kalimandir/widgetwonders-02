
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
    <div
      className={cn(
        "donation-card",
        selected && "selected",
        "transition-all duration-300 ease-in-out animate-scale-in"
      )}
      onClick={() => onClick(value)}
    >
      <span className={cn(
        "text-xl font-bold",
        selected ? "text-white" : "text-gray-800"
      )}>
        ${value}
      </span>
      
      {impactStatement && (
        <p className={cn(
          "text-xs font-normal mt-1.5 leading-tight",
          selected ? "text-white/90" : "text-gray-600",
          "text-center px-1"
        )}>
          {impactStatement}
        </p>
      )}
    </div>
  );
};

export default DonationAmount;
