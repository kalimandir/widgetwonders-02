import { useState, useEffect, useMemo } from "react";
import { useReceiverPayments } from "./usePayments";
import { useLocalStorage } from "./useLocalStorage";
import { PaymentSimple } from "@/lib/indexerApi";

type DonationCache = {
  total: number;
  lastUpdated: number;
  latestTxTimestamp: string;
};

// Cache duration: 1 week
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000;

export function useDonationTotal(receiverEns: string | undefined) {
  const [isSyncing, setIsSyncing] = useState(false);

  // Cache key based on receiver
  const cacheKey = receiverEns ? `donation-total-${receiverEns}` : "";

  // Initialize local storage
  const [cachedData, setCachedData] = useLocalStorage<DonationCache | null>(cacheKey, null);

  // Get payment data
  const { data, isLoading, error, hasNextPage, fetchNextPage } = useReceiverPayments(receiverEns);

  // Check if cache is valid
  const isCacheValid = useMemo(() => {
    if (!cachedData) return false;
    return Date.now() - cachedData.lastUpdated < CACHE_DURATION;
  }, [cachedData]);

  // Process data and update cache
  useEffect(() => {
    if (!receiverEns || isLoading || !data?.pages?.length) return;

    const processData = async () => {
      // If no cache, fetch all pages and store the total
      if (!isCacheValid) {
        setIsSyncing(true);

        // Load all pages
        while (hasNextPage) {
          await fetchNextPage();
        }

        // Calculate total from all loaded payments
        const allPayments = data.pages.flatMap(page => page.payments);
        const total = allPayments.reduce((sum, payment) => sum + (parseFloat(payment.invoiceAmount) || 0), 0);

        // Store in cache
        if (allPayments.length > 0) {
          setCachedData({
            total,
            lastUpdated: Date.now(),
            latestTxTimestamp: allPayments[0].blockTimestamp,
          });
        }

        setIsSyncing(false);
        return;
      }

      // We have valid cache - check for new transactions
      setIsSyncing(true);
      let allPayments: PaymentSimple[] = data.pages.flatMap(page => page.payments);
      const cachedDate = new Date(cachedData.latestTxTimestamp);

      // Load more pages if needed
      // (Keep loading until we find transactions older than our cached latest)
      while (hasNextPage && allPayments.length > 0 && new Date(allPayments[allPayments.length - 1].blockTimestamp) > cachedDate) {
        await fetchNextPage();
        allPayments = data.pages.flatMap(page => page.payments);
      }

      // Filter new transactions and calculate their total
      const newTransactions = allPayments.filter(payment => new Date(payment.blockTimestamp) > cachedDate);

      if (newTransactions.length > 0) {
        const newTxTotal = newTransactions.reduce((sum, payment) => sum + (parseFloat(payment.invoiceAmount) || 0), 0);

        // Update cache with new total and latest timestamp
        setCachedData({
          total: cachedData.total + newTxTotal,
          lastUpdated: Date.now(),
          latestTxTimestamp: newTransactions[0].blockTimestamp,
        });
      }

      setIsSyncing(false);
    };

    processData();
  }, [receiverEns, data, isLoading, isCacheValid]);

  // Calculate displayed total
  const total = useMemo(() => {
    if (isCacheValid) return cachedData!.total;

    // Fallback to currently loaded data when no valid cache
    const currentPayments = data?.pages?.flatMap(page => page.payments) || [];
    return currentPayments.reduce((sum, payment) => sum + (parseFloat(payment.invoiceAmount) || 0), 0);
  }, [isCacheValid, cachedData, data]);

  return {
    total,
    isLoading: isLoading && !isCacheValid,
    isSyncing,
    error,
  };
}
