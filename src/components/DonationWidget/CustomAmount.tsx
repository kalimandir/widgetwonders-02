
import React from 'react';
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

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
        "relative w-full rounded-xl transition-all duration-300 animate-scale-in",
        isMobile ? "h-14" : "h-16", // Slightly shorter on mobile
        active 
          ? "border-2 border-donation-purple bg-white" 
          : "bg-donation-gray border-2 border-transparent"
      )}
    >
      <div className="absolute inset-0 flex items-center px-4">
        <span className={cn(
          "text-xl sm:text-2xl font-semibold transition-colors duration-300",
          active ? "text-donation-purple" : "text-gray-800"
        )}>
          $
        </span>
        <input
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          className={cn(
            "w-full h-full bg-transparent text-xl sm:text-2xl font-semibold pl-2 focus:outline-none",
            active ? "text-donation-purple" : "text-gray-800"
          )}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          placeholder="Other"
          min="1"
          step="1"
        />
      </div>
      
      {active && (
        <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-donation-purple rounded-full animate-fade-in" />
      )}
    </div>
  );
};

export default CustomAmount;
