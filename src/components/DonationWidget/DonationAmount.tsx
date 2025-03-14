
import React from 'react';
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface DonationAmountProps {
  value: number;
  selected: boolean;
  onClick: (amount: number) => void;
  impactStatement?: string;
  isPopular?: boolean;
  boxSize?: number;
}

const DonationAmount: React.FC<DonationAmountProps> = ({ 
  value, 
  selected,
  onClick,
  impactStatement,
  isPopular = false,
  boxSize = 1
}) => {
  const isMobile = useIsMobile();
  
  // Calculate the height based on the boxSize (1-4)
  const getHeight = () => {
    const baseHeight = 64; // Base height for the smallest box
    const increment = 8; // Height increment per size
    return baseHeight + (boxSize - 1) * increment;
  };
  
  return (
    <div
      className={cn(
        "donation-card relative",
        selected && "selected",
        isPopular && "popular-tier",
        "transition-all duration-300 ease-in-out animate-scale-in"
      )}
      onClick={() => onClick(value)}
      style={{ 
        height: `${getHeight()}px`,
        transform: isPopular ? 'scale(1.02) translateX(4px)' : undefined
      }}
    >
      {isPopular && (
        <div className="absolute -top-1 -right-1 bg-donation-purple text-white text-xs px-2 py-0.5 rounded-full">
          Popular
        </div>
      )}
      
      <div className="flex items-center justify-between w-full">
        <span className={cn(
          "text-xl font-bold",
          selected ? "text-white" : "text-gray-800"
        )}>
          ${value}
        </span>
        
        {impactStatement && (
          <p className={cn(
            "text-xs font-normal leading-tight ml-2 flex-1 text-right",
            selected ? "text-white/90" : "text-gray-600"
          )}>
            {impactStatement}
          </p>
        )}
      </div>
    </div>
  );
};

export default DonationAmount;
