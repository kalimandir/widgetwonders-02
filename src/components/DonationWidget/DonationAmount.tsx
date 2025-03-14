
import React from 'react';
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Pencil, Clock, BookOpen, Users } from "lucide-react";

interface DonationAmountProps {
  value: number;
  selected: boolean;
  onClick: (amount: number) => void;
  impactStatement?: string;
  specialItem?: string;
  isPopular?: boolean;
  boxSize?: number;
  iconType?: 'supplies' | 'day' | 'week' | 'month';
}

const DonationAmount: React.FC<DonationAmountProps> = ({ 
  value, 
  selected,
  onClick,
  impactStatement,
  specialItem,
  isPopular = false,
  boxSize = 1,
  iconType
}) => {
  const isMobile = useIsMobile();
  
  // Calculate the height based on the boxSize (1-4)
  const getHeight = () => {
    const baseHeight = specialItem ? 96 : 74; // Base height, larger if we have special item
    const increment = 8; // Height increment per size
    return baseHeight + (boxSize - 1) * increment;
  };

  const getIcon = () => {
    switch(iconType) {
      case 'supplies':
        return <Pencil className={cn("h-4 w-4", selected ? "text-white" : "text-purple-600")} />;
      case 'day':
        return <Clock className={cn("h-4 w-4", selected ? "text-white" : "text-purple-600")} />;
      case 'week':
        return <BookOpen className={cn("h-4 w-4", selected ? "text-white" : "text-purple-600")} />;
      case 'month':
        return <Users className={cn("h-4 w-4", selected ? "text-white" : "text-purple-600")} />;
      default:
        return null;
    }
  };
  
  return (
    <div
      className={cn(
        "donation-card relative",
        selected && "selected",
        isPopular && "popular-tier",
        "transition-all duration-300 ease-in-out hover:scale-[1.02]"
      )}
      onClick={() => onClick(value)}
      style={{ 
        height: `${getHeight()}px`,
        transform: isPopular ? 'scale(1.02) translateX(4px)' : undefined
      }}
    >
      {isPopular && (
        <div className="absolute -top-1 -right-1 bg-donation-purple text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
          <span className="inline-block h-1.5 w-1.5 bg-white rounded-full animate-pulse"></span>
          Popular
        </div>
      )}
      
      <div className="flex flex-col w-full gap-1.5">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-5 h-5 rounded-full border-2 flex items-center justify-center",
              selected ? "border-white bg-white/20" : "border-gray-300",
              "transition-all duration-200"
            )}>
              {selected && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
            </div>
            <span className={cn(
              "text-xl font-bold",
              selected ? "text-white" : "text-gray-800"
            )}>
              ${value}
            </span>
          </div>
          
          {getIcon() && (
            <div className={cn(
              "flex items-center justify-center w-6 h-6 rounded-full",
              selected ? "bg-white/20" : "bg-purple-100"
            )}>
              {getIcon()}
            </div>
          )}
        </div>
        
        {impactStatement && (
          <p className={cn(
            "text-xs font-medium leading-tight ml-7",
            selected ? "text-white/90" : "text-gray-700"
          )}>
            {impactStatement}
          </p>
        )}
        
        {specialItem && (
          <div className={cn(
            "ml-7 mt-2 border-l-2 pl-2.5 py-0.5",
            selected ? "border-white/30" : "border-purple-200"
          )}>
            <p className={cn(
              "text-2xs",
              selected ? "text-white/80" : "text-gray-500"
            )}>
              {specialItem}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationAmount;
