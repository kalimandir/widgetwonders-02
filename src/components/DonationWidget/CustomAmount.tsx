
import React from 'react';
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Plus } from "lucide-react";

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
    <div className="donation-amount-container">
      <button
        className={cn(
          "donation-circle custom",
          active && "selected",
          "transition-all duration-300 ease-in-out"
        )}
        onClick={onFocus}
        aria-pressed={active}
      >
        <Plus className="h-5 w-5" />
      </button>
      
      {active && (
        <div className="custom-amount-input mt-2">
          <div className="flex items-center justify-center">
            <span className="text-gray-800 text-lg font-bold">$</span>
            <input
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              className="w-16 bg-transparent text-lg font-bold pl-0.5 focus:outline-none text-gray-800"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={onFocus}
              placeholder="Amount"
              min="1"
              step="1"
              autoFocus
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomAmount;
