
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/contexts/AdminContext';
import { Wallet } from 'lucide-react';

const WalletConnect: React.FC = () => {
  const { connectWallet, isAdmin, isLoading, address } = useAdmin();

  return (
    <div className="absolute top-2 right-2 z-10">
      {!address ? (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={connectWallet}
          disabled={isLoading}
          className="text-xs bg-white/90 border border-purple-200 text-purple-800 hover:bg-purple-50"
        >
          <Wallet className="h-3.5 w-3.5 mr-1.5" />
          {isLoading ? "Connecting..." : "Connect Wallet"}
        </Button>
      ) : isAdmin ? (
        <div className="flex items-center gap-1.5 bg-purple-50 border border-purple-200 rounded-md px-2 py-1 text-xs text-purple-800">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
          Admin Mode
        </div>
      ) : (
        <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-md px-2 py-1 text-xs text-gray-600">
          <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
          Connected
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
