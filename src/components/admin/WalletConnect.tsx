
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/contexts/AdminContext';
import { Wallet } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Badge } from '@/components/ui/badge';

const WalletConnect: React.FC = () => {
  const { connectWallet, isAdmin, isLoading, address } = useAdmin();
  const isMobile = useIsMobile();

  return (
    <>
      {/* Admin mode indicator only shown if user is admin */}
      {address && isAdmin && (
        <div className="absolute top-4 left-4 z-10">
          <Badge variant="indicator" className="flex items-center gap-1.5 bg-purple-50 border border-purple-200 
                        dark:bg-[#2A1A5E] dark:border-[#6742ca] dark:text-purple-300">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            {!isMobile ? "Admin Mode" : ""}
          </Badge>
        </div>
      )}
      
      {/* Connect Wallet button stays on the right */}
      <div className="absolute top-4 right-6 z-10">
        {!address && (
          <Button 
            variant="outline" 
            size={isMobile ? "icon" : "sm"}
            onClick={connectWallet}
            disabled={isLoading}
            className={`flex items-center gap-1.5 ${isMobile ? 'w-10 h-10 p-0' : 'px-4 py-2 h-auto text-xs'}
              bg-white/90 border border-purple-200 text-purple-800 hover:bg-purple-50
              dark:bg-donation-dark-gray dark:border-donation-dark-border dark:text-donation-dark-text-secondary dark:hover:bg-donation-dark-gray-medium
              transition-all duration-300`}
          >
            <Wallet className={isMobile ? "h-5 w-5" : "h-3.5 w-3.5"} />
            {!isMobile && (isLoading ? "Connecting..." : "Connect Wallet")}
          </Button>
        )}
      </div>
    </>
  );
};

export default WalletConnect;
