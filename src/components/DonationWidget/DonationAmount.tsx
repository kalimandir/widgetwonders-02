
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
        return <Pencil className="h-6 w-6 text-[#4016ad] dark:text-[#8968e2]" />;
      case 'day':
        return <Clock className="h-6 w-6 text-[#4016ad] dark:text-[#8968e2]" />;
      case 'week':
        return <BookOpen className="h-6 w-6 text-[#4016ad] dark:text-[#8968e2]" />;
      case 'month':
        return <Users className="h-6 w-6 text-[#4016ad] dark:text-[#8968e2]" />;
      default:
        return null;
    }
  };
  
  return (
    <div
      className={cn(
        "donation-card relative w-full overflow-hidden",
        selected && "selected",
        isPopular && "popular-tier",
        "transition-all duration-300 ease-in-out"
      )}
      onClick={() => onClick(value)}
    >
      {isPopular && (
        <div className="absolute top-0 right-0 bg-white dark:bg-donation-dark-selected text-[#4016ad] dark:text-[#8968e2] text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
          <span className="inline-block h-1.5 w-1.5 bg-[#4016ad] dark:bg-[#8968e2] rounded-full animate-pulse"></span>
          Popular
        </div>
      )}
      
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
              selected 
                ? "border-[#4016ad] dark:border-[#8968e2] bg-purple-50 dark:bg-[#2A1A5E]" 
                : isPopular 
                  ? "border-[#6742ca] dark:border-[#8968e2]" 
                  : "border-gray-300 dark:border-donation-dark-gray-medium",
              "transition-all duration-200"
            )}>
              {selected && <div className="w-2.5 h-2.5 bg-[#4016ad] dark:bg-[#8968e2] rounded-full"></div>}
            </div>
            <span className={cn(
              "text-xl font-bold",
              "text-gray-800 dark:text-donation-dark-text"
            )}>
              ${value}
            </span>
          </div>
          
          {getIcon() && (
            <div className="flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0 bg-purple-100 dark:bg-donation-dark-selected/60">
              {getIcon()}
            </div>
          )}
        </div>
        
        {impactStatement && (
          <p className="text-xs font-medium leading-tight ml-7 mt-1 break-words pr-2 text-gray-700 dark:text-donation-dark-text-secondary">
            {impactStatement}
          </p>
        )}
        
        {specialItem && (
          <div className={cn(
            "ml-7 mt-2 border-l-2 pl-2.5 pr-2",
            selected 
              ? "border-gray-300 dark:border-donation-dark-gray-medium" 
              : isPopular 
                ? "border-[#6742ca]/30 dark:border-[#8968e2]/30" 
                : "border-purple-200 dark:border-donation-dark-selected/50"
          )}>
            <p className="text-2xs break-words text-gray-500 dark:text-donation-dark-gray-light">
              {specialItem}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationAmount;
