
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
  
  // Get the appropriate icon based on the iconType
  const getIcon = () => {
    switch(iconType) {
      case 'supplies':
        return <Pencil className="h-4 w-4 text-purple-600" />;
      case 'day':
        return <Clock className="h-4 w-4 text-purple-600" />;
      case 'week':
        return <BookOpen className="h-4 w-4 text-purple-600" />;
      case 'month':
        return <Users className="h-4 w-4 text-purple-600" />;
      default:
        return null;
    }
  };
  
  return (
    <div
      className={cn(
        "donation-card relative w-full overflow-hidden",
        selected && !isPopular && "selected",
        isPopular && !selected && "popular-tier",
        isPopular && selected && "popular-tier selected",
        "transition-all duration-300 ease-in-out"
      )}
      onClick={() => onClick(value)}
    >
      {isPopular && (
        <div className="absolute top-0 right-0 bg-donation-purple text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
          <span className="inline-block h-1.5 w-1.5 bg-white rounded-full animate-pulse"></span>
          Popular
        </div>
      )}
      
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
              selected ? "border-gray-500 bg-gray-100" : "border-gray-300",
              "transition-all duration-200"
            )}>
              {selected && <div className="w-2.5 h-2.5 bg-gray-500 rounded-full"></div>}
            </div>
            <span className={cn(
              "text-xl font-bold",
              "text-gray-800"
            )}>
              ${value}
            </span>
          </div>
          
          {getIcon() && (
            <div className={cn(
              "flex items-center justify-center w-6 h-6 rounded-full flex-shrink-0",
              selected ? "bg-gray-100" : "bg-purple-100"
            )}>
              {getIcon()}
            </div>
          )}
        </div>
        
        {impactStatement && (
          <p className={cn(
            "text-xs font-medium leading-tight ml-7 mt-1 break-words pr-2",
            "text-gray-700"
          )}>
            {impactStatement}
          </p>
        )}
        
        {specialItem && (
          <div className={cn(
            "ml-7 mt-2 border-l-2 pl-2.5 pr-2",
            selected ? "border-gray-300" : "border-purple-200"
          )}>
            <p className={cn(
              "text-2xs break-words",
              "text-gray-500"
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
