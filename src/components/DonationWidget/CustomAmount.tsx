
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
        "donation-card custom-amount",
        active && "selected",
        "transition-all duration-300 ease-in-out hover:scale-[1.02]"
      )}
    >
      <div className="flex items-center w-full gap-2">
        <div className={cn(
          "w-5 h-5 rounded-full border-2 flex items-center justify-center",
          active ? "border-white bg-white/20" : "border-gray-300",
          "transition-all duration-200"
        )}>
          {active && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
        </div>
        
        <div className="flex items-center flex-1">
          <DollarSign className={cn(
            "h-4 w-4 mr-0.5",
            active ? "text-white" : "text-gray-600"
          )} />
          <input
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            className={cn(
              "w-full bg-transparent text-xl font-bold focus:outline-none",
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
      </div>
      
      <p className={cn(
        "text-xs font-normal mt-1 ml-7 leading-tight",
        active ? "text-white/90" : "text-gray-600"
      )}>
        Enter custom amount
      </p>
      
      <p className={cn(
        "text-2xs ml-7 mt-1 pl-2 border-l-2",
        active ? "text-white/80 border-white/30" : "text-gray-500 border-purple-200"
      )}>
        Receive benefits based on donation level
      </p>
    </div>
  );
};

export default CustomAmount;
