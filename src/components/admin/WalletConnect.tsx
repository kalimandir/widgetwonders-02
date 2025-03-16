
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/contexts/AdminContext';
import { Wallet } from 'lucide-react';

const WalletConnect: React.FC = () => {
  const { connectWallet, isAdmin, isLoading, address } = useAdmin();

  return (
    <div className="absolute top-4 right-6 z-10">
      {!address ? (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={connectWallet}
          disabled={isLoading}
          className="text-xs flex items-center gap-1.5 px-4 py-2 h-auto
            bg-white/90 border border-purple-200 text-purple-800 hover:bg-purple-50
            dark:bg-[#8968e2]/90 dark:border-purple-800/40 dark:text-white dark:hover:bg-[#9d7eeb]
            transition-all duration-300"
        >
          <Wallet className="h-3.5 w-3.5" />
          {isLoading ? "Connecting..." : "Connect Wallet"}
        </Button>
      ) : isAdmin ? (
        <div className="flex items-center gap-1.5 bg-purple-50 border border-purple-200 rounded-md px-3 py-1.5 text-xs text-purple-800
                        dark:bg-[#2A1A5E] dark:border-[#6742ca] dark:text-purple-300">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
          Admin Mode
        </div>
      ) : (
        <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-md px-3 py-1.5 text-xs text-gray-600
                        dark:bg-donation-dark-gray dark:border-donation-dark-border dark:text-donation-dark-text-secondary">
          <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-donation-dark-gray-medium"></div>
          Connected
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
