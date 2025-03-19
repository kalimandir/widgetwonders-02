import React, { useState, useEffect } from "react";
import { ArrowRightLeft, ArrowUp, HandHeart, Wallet, CreditCard, ArrowDownRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { useSenderToReceiverPayments } from "@/hooks/usePayments";
import { PaymentSimple } from "@/lib/indexerApi";
import { CONFIG } from "@/config/constants";

type TransactionType = "swap" | "transfer" | "donation" | "deposit" | "withdraw";

interface Transaction {
  id: string;
  type: TransactionType;
  to: string;
  amount: number;
  timestamp: Date;
  isEns: boolean;
  expanded?: boolean;
}

// Helper function to truncate wallet addresses
const truncateAddress = (address: string): string => {
  if (address.length <= 10) return address;
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

// Convert API payments to our Transaction format
const convertPaymentToTransaction = (payment: PaymentSimple): Transaction => {
  return {
    id: `${payment.txHash}-${payment.paymentIndex}`,
    type: "donation", // Default to donation type for now
    to: payment.receiverEnsPrimaryName || payment.receiverAddress,
    amount: parseFloat(payment.invoiceAmount),
    timestamp: new Date(payment.blockTimestamp),
    isEns: !!payment.receiverEnsPrimaryName,
    expanded: false,
  };
};

const getTransactionIcon = (type: TransactionType) => {
  switch (type) {
    case "swap":
      return <ArrowRightLeft className='h-5 w-5 text-emerald-500 dark:text-emerald-400' />;
    case "transfer":
      return <ArrowUp className='h-5 w-5 text-emerald-500 dark:text-emerald-400' />;
    case "donation":
      return <HandHeart className='h-5 w-5 text-purple-500 dark:text-purple-400' />;
    case "deposit":
      return <Wallet className='h-5 w-5 text-blue-500 dark:text-blue-400' />;
    case "withdraw":
      return <ArrowDownRight className='h-5 w-5 text-orange-500 dark:text-orange-400' />;
    default:
      return <CreditCard className='h-5 w-5 text-gray-500 dark:text-gray-400' />;
  }
};

const formatTime = (date: Date): string => {
  return format(date, "h:mm a");
};

const HistoryTab: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const receiverEns = CONFIG.RECIPIENT_ENS;
  const senderEns = CONFIG.SENDER_ENS;

  const { data, isLoading, error, hasNextPage, fetchNextPage, isFetchingNextPage } = useSenderToReceiverPayments(senderEns, receiverEns);

  useEffect(() => {
    if (data && !isLoading) {
      const apiTransactions = data.pages.flatMap(page => page.payments).map(convertPaymentToTransaction);
      setTransactions(apiTransactions);
      setLoading(false);
    }
  }, [data, isLoading]);

  const groupTransactionsByDate = (transactions: Transaction[]) => {
    const grouped: Record<string, Transaction[]> = {};
    transactions.forEach(transaction => {
      const dateKey = format(transaction.timestamp, "MMM d, yyyy");
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(transaction);
    });
    return grouped;
  };

  const groupedTransactions = groupTransactionsByDate(transactions);

  // Toggle expanded state of a transaction
  const toggleExpanded = (id: string) => {
    setTransactions(prevTransactions => prevTransactions.map(tx => (tx.id === id ? { ...tx, expanded: !tx.expanded } : tx)));
  };

  // Load more function for infinite scroll
  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <div className='space-y-4'>
      <div className='mb-2'>
        <h2 className='text-lg font-semibold text-gray-900 dark:text-donation-dark-text'>Activity</h2>
        <p className='text-sm text-gray-500 dark:text-donation-dark-text-secondary'>Your donation history and transactions</p>
      </div>

      {loading || isLoading ? (
        // Loading state with skeletons
        <div className='space-y-4'>
          {[1, 2, 3].map((_, index) => (
            <div key={index} className='space-y-2'>
              <Skeleton className='h-5 w-1/3 dark:bg-donation-dark-gray' />
              <Skeleton className='h-24 w-full dark:bg-donation-dark-gray' />
            </div>
          ))}
        </div>
      ) : transactions.length === 0 ? (
        // Empty state
        <div className='text-center py-8 px-4'>
          <div className='mx-auto h-12 w-12 rounded-full bg-purple-100 dark:bg-donation-dark-selected/60 flex items-center justify-center mb-4'>
            <HandHeart className='h-6 w-6 text-purple-600 dark:text-purple-300' />
          </div>
          <h3 className='text-lg font-medium text-gray-900 dark:text-donation-dark-text'>No transactions yet</h3>
          <p className='mt-2 text-sm text-gray-500 dark:text-donation-dark-text-secondary'>Make your first donation to see your activity here.</p>
        </div>
      ) : (
        // Transaction list with date grouping
        <ScrollArea className='h-[400px] pr-4'>
          <div className='space-y-6'>
            {Object.entries(groupedTransactions).map(([dateGroup, txs]) => (
              <div key={dateGroup} className='space-y-2'>
                <h3 className='text-sm font-medium text-gray-500 dark:text-donation-dark-text-secondary mb-3'>{dateGroup}</h3>
                <div className='space-y-3'>
                  {txs.map(transaction => (
                    <div
                      key={transaction.id}
                      className={cn(
                        "p-3 border rounded-xl shadow-sm",
                        "transition-all duration-200 hover:shadow-md cursor-pointer",
                        transaction.expanded
                          ? "bg-purple-50 dark:bg-donation-dark-selected/30 border-purple-100 dark:border-donation-dark-selected"
                          : ""
                      )}
                      onClick={() => toggleExpanded(transaction.id)}>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-3'>
                          <div className='h-10 w-10 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center'>
                            {getTransactionIcon(transaction.type)}
                          </div>
                          <div>
                            <div className='font-medium text-gray-800 dark:text-donation-dark-text'>
                              To: {transaction.isEns ? transaction.to : truncateAddress(transaction.to)}
                            </div>
                            <div className='flex items-center space-x-2 mt-1'>
                              <span className='text-sm text-gray-500 dark:text-donation-dark-text-secondary'>
                                {formatTime(transaction.timestamp)}
                              </span>
                              <Badge
                                variant='secondary'
                                className={cn(
                                  "text-xs font-medium text-purple-700 bg-purple-100",
                                  "dark:text-purple-300 dark:bg-purple-900/30",
                                  "hover:bg-purple-100 dark:hover:bg-purple-900/40"
                                )}>
                                {transaction.type}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className='text-right'>
                          <div className='font-semibold text-gray-900 dark:text-donation-dark-text'>${transaction.amount.toFixed(2)}</div>
                        </div>
                      </div>

                      {transaction.expanded && (
                        <div className='mt-3 pt-3 border-t border-gray-100 dark:border-donation-dark-border'>
                          <div className='grid grid-cols-2 gap-2 text-sm'>
                            <div className='text-gray-500 dark:text-donation-dark-text-secondary'>Transaction ID:</div>
                            <div className='text-gray-800 dark:text-donation-dark-text font-mono text-xs overflow-hidden truncate'>
                              {transaction.id}
                            </div>
                            <div className='text-gray-500 dark:text-donation-dark-text-secondary'>Full Address:</div>
                            <div className='text-gray-800 dark:text-donation-dark-text font-mono text-xs overflow-hidden truncate'>
                              {transaction.isEns ? "ENS: " + transaction.to : transaction.to}
                            </div>
                            <div className='text-gray-500 dark:text-donation-dark-text-secondary'>Date & Time:</div>
                            <div className='text-gray-800 dark:text-donation-dark-text'>{format(transaction.timestamp, "PPpp")}</div>
                            <div className='text-gray-500 dark:text-donation-dark-text-secondary'>Status:</div>
                            <div className='text-green-600 dark:text-green-400 font-medium'>Completed</div>
                            <div className='text-gray-500 dark:text-donation-dark-text-secondary'>Source:</div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {hasNextPage && (
              <div className='py-2 text-center'>
                <button
                  onClick={handleLoadMore}
                  disabled={isFetchingNextPage}
                  className='px-4 py-2 text-sm bg-purple-100 dark:bg-donation-dark-selected/50 
                    text-purple-700 dark:text-purple-300 rounded-md font-medium 
                    hover:bg-purple-200 dark:hover:bg-donation-dark-selected/70
                    disabled:opacity-50'>
                  {isFetchingNextPage ? "Loading more..." : "Load more"}
                </button>
              </div>
            )}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default HistoryTab;
