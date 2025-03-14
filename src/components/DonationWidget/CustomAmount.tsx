
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
        "donation-card custom-amount",
        active && "selected",
        "transition-all duration-300 ease-in-out"
      )}
    >
      <div className="flex items-center w-full">
        <span className={cn(
          "text-xl font-bold",
          active ? "text-white" : "text-gray-800"
        )}>
          $
        </span>
        <input
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          className={cn(
            "w-full bg-transparent text-xl font-bold pl-0.5 focus:outline-none",
            active ? "text-white placeholder-white/70" : "text-gray-800 placeholder-gray-400"
          )}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          placeholder="Other amount"
          min="1"
          step="1"
        />
      </div>
      
      <p className={cn(
        "text-xs font-normal mt-1.5 leading-tight text-left",
        active ? "text-white/90" : "text-gray-600"
      )}>
        Enter custom amount
      </p>
    </div>
  );
};

export default CustomAmount;
