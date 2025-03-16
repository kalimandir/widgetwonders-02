
import React from 'react';
import { format } from 'date-fns';
import { ArrowRightLeft, ArrowRight, Download, Upload } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

// Transaction type definition
interface Transaction {
  id: string;
  timestamp: Date;
  type: 'swap' | 'transfer' | 'receive' | 'send';
  amount: number;
  recipient: {
    address: string;
    ens?: string;
  };
}

// Mock data for demonstration
const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    timestamp: new Date(2025, 1, 7, 16, 37), // Feb 7, 2025, 4:37 PM
    type: 'swap',
    amount: 1.00,
    recipient: {
      address: '0xf081a73627214bddf2a59cb3d2667',
    }
  },
  {
    id: '2',
    timestamp: new Date(2025, 1, 7, 14, 2), // Feb 7, 2025, 2:02 PM
    type: 'transfer',
    amount: 1.00,
    recipient: {
      address: '0x3a91e3218bc89bfc251d12ee551',
      ens: 'swankycoins.eth'
    }
  },
  {
    id: '3',
    timestamp: new Date(2025, 1, 6, 11, 15), // Feb 6, 2025, 11:15 AM
    type: 'receive',
    amount: 2.50,
    recipient: {
      address: '0x742a1e67890dbcef45a901e23467',
      ens: 'donor.eth'
    }
  },
  {
    id: '4',
    timestamp: new Date(2025, 1, 5, 9, 30), // Feb 5, 2025, 9:30 AM
    type: 'send',
    amount: 0.75,
    recipient: {
      address: '0x821f47ab9ce560d213478fe12345',
    }
  }
];

// Helper function to truncate an address
const truncateAddress = (address: string): string => {
  if (address.length <= 12) return address;
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

// Helper function to group transactions by date
const groupTransactionsByDate = (transactions: Transaction[]) => {
  const groups: Record<string, Transaction[]> = {};
  
  transactions.forEach(transaction => {
    const dateKey = format(transaction.timestamp, 'yyyy-MM-dd');
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(transaction);
  });
  
  // Convert to array and sort by date (newest first)
  return Object.entries(groups)
    .map(([dateStr, txs]) => ({
      date: new Date(dateStr),
      transactions: txs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());
};

// Transaction icon component
const TransactionIcon: React.FC<{ type: Transaction['type'] }> = ({ type }) => {
  const bgColor = 
    type === 'swap' ? 'bg-green-100' :
    type === 'transfer' ? 'bg-green-100' :
    type === 'receive' ? 'bg-blue-100' :
    'bg-orange-100';
  
  const IconComponent = 
    type === 'swap' ? ArrowRightLeft :
    type === 'transfer' ? ArrowRight :
    type === 'receive' ? Download :
    Upload;
  
  const iconColor = 
    type === 'swap' ? 'text-green-600' :
    type === 'transfer' ? 'text-green-600' :
    type === 'receive' ? 'text-blue-600' :
    'text-orange-600';
  
  return (
    <div className={`rounded-md p-2 ${bgColor}`}>
      <IconComponent className={`h-5 w-5 ${iconColor}`} />
    </div>
  );
};

// Empty state component
const EmptyHistory: React.FC = () => (
  <div className="flex flex-col items-center justify-center p-8 text-center">
    <div className="bg-gray-100 rounded-full p-3 mb-3">
      <ArrowRightLeft className="h-6 w-6 text-gray-400" />
    </div>
    <h3 className="text-base font-medium text-gray-800 mb-1">No transactions yet</h3>
    <p className="text-sm text-gray-500">Your transaction history will appear here</p>
  </div>
);

// Loading state component
const LoadingHistory: React.FC = () => (
  <div className="space-y-6">
    <div>
      <Skeleton className="h-6 w-24 mb-3" />
      <Card className="p-3">
        <div className="flex items-center">
          <Skeleton className="h-9 w-9 rounded-md mr-3" />
          <div className="flex-1">
            <Skeleton className="h-5 w-40 mb-2" />
            <div className="flex items-center">
              <Skeleton className="h-4 w-16 mr-2" />
              <Skeleton className="h-4 w-12 rounded-full" />
            </div>
          </div>
          <Skeleton className="h-6 w-16" />
        </div>
      </Card>
    </div>
    <div>
      <Skeleton className="h-6 w-24 mb-3" />
      <Card className="p-3 mb-2">
        <div className="flex items-center">
          <Skeleton className="h-9 w-9 rounded-md mr-3" />
          <div className="flex-1">
            <Skeleton className="h-5 w-36 mb-2" />
            <div className="flex items-center">
              <Skeleton className="h-4 w-16 mr-2" />
              <Skeleton className="h-4 w-12 rounded-full" />
            </div>
          </div>
          <Skeleton className="h-6 w-16" />
        </div>
      </Card>
      <Card className="p-3">
        <div className="flex items-center">
          <Skeleton className="h-9 w-9 rounded-md mr-3" />
          <div className="flex-1">
            <Skeleton className="h-5 w-32 mb-2" />
            <div className="flex items-center">
              <Skeleton className="h-4 w-16 mr-2" />
              <Skeleton className="h-4 w-12 rounded-full" />
            </div>
          </div>
          <Skeleton className="h-6 w-16" />
        </div>
      </Card>
    </div>
  </div>
);

interface HistoryTabProps {
  isLoading?: boolean;
}

const HistoryTab: React.FC<HistoryTabProps> = ({ isLoading = false }) => {
  // In a real app, we would fetch this data from an API
  const transactions = MOCK_TRANSACTIONS;
  const groupedTransactions = groupTransactionsByDate(transactions);
  
  if (isLoading) {
    return <LoadingHistory />;
  }
  
  if (transactions.length === 0) {
    return <EmptyHistory />;
  }

  return (
    <ScrollArea className="h-[400px] pr-3">
      <div className="space-y-6">
        {groupedTransactions.map(group => (
          <div key={group.date.toISOString()}>
            <h3 className="text-sm font-medium text-gray-500 mb-3">
              {format(group.date, 'MMM d, yyyy')}
            </h3>
            <div className="space-y-2">
              {group.transactions.map(transaction => (
                <Card 
                  key={transaction.id}
                  className="p-3 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center">
                    <div className="mr-3">
                      <TransactionIcon type={transaction.type} />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800 mb-1">
                        To: {transaction.recipient.ens || truncateAddress(transaction.recipient.address)}
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="text-gray-500 mr-2">
                          {format(transaction.timestamp, 'h:mm a')}
                        </span>
                        <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200 hover:text-purple-800">
                          {transaction.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-lg text-gray-800">
                        ${transaction.amount.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default HistoryTab;
