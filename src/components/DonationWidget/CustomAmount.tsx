
import React from 'react';
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { DollarSign } from "lucide-react";

interface CustomAmountProps {
  active: boolean;
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
}

const CustomAmount: React.FC<CustomAmountProps> = ({
  active,
  value,
  onChange,
  onFocus
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div 
      className={cn(
        "donation-card custom-amount w-full overflow-hidden",
        active && "selected",
        "transition-all duration-300 ease-in-out"
      )}
    >
      <div className="flex flex-col w-full">
        <div className="flex items-center w-full gap-2">
          <div className={cn(
            "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
            active 
              ? "border-[#4016ad] dark:border-[#8968e2] bg-purple-50 dark:bg-[#2A1A5E]" 
              : "border-gray-300 dark:border-donation-dark-gray-medium",
            "transition-all duration-200"
          )}>
            {active && <div className="w-2.5 h-2.5 bg-[#4016ad] dark:bg-[#8968e2] rounded-full"></div>}
          </div>
          
          <div className="flex items-center flex-1 overflow-hidden">
            <DollarSign className="h-6 w-6 mr-0.5 flex-shrink-0 text-gray-600 dark:text-donation-dark-gray-light" />
            <input
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              className="w-full bg-transparent text-xl font-bold focus:outline-none text-gray-800 dark:text-donation-dark-text placeholder-gray-400 dark:placeholder-donation-dark-gray-medium"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={onFocus}
              placeholder="Other amount"
              min="1"
              step="1"
            />
          </div>
        </div>
        
        <p className="text-xs font-medium leading-tight ml-7 mt-1 break-words pr-2 text-gray-700 dark:text-donation-dark-text-secondary">
          Enter custom amount
        </p>
        
        <div className={cn(
          "ml-7 mt-2 border-l-2 pl-2.5 pr-2",
          active 
            ? "border-gray-300 dark:border-donation-dark-gray-medium" 
            : "border-[#6742ca]/30 dark:border-[#8968e2]/30"
        )}>
          <p className="text-2xs break-words text-gray-500 dark:text-donation-dark-gray-light">
            Receive benefits based on donation level
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomAmount;
