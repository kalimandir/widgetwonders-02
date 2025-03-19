import { useInfiniteQuery } from "@tanstack/react-query";
import { getReceiverPayments, getSenderPaymentsToReceiver, PaymentsResponse } from "@/lib/indexerApi";

// Constants for query keys
export const PAYMENT_KEYS = {
  all: ["payments"] as const,
  receiverPayments: (receiverEns: string) => [...PAYMENT_KEYS.all, "receiver", receiverEns] as const,
  senderToReceiverPayments: (senderEns: string, receiverEns: string) => [...PAYMENT_KEYS.all, "sender", senderEns, "receiver", receiverEns] as const,
};

// Infinite query hook for receiver payments
export function useReceiverPayments(receiverEns: string | undefined) {
  return useInfiniteQuery<PaymentsResponse, Error>({
    queryKey: PAYMENT_KEYS.receiverPayments(receiverEns || ""),
    queryFn: ({ pageParam = 1 }) => getReceiverPayments(receiverEns!, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.reduce((acc, page) => acc + page.payments.length, 0);
      return totalFetched < lastPage.total ? lastPage.page + 1 : undefined;
    },
    enabled: !!receiverEns,
  });
}

// Infinite query hook for sender-to-receiver payments
export function useSenderToReceiverPayments(senderEns: string | undefined, receiverEns: string | undefined) {
  return useInfiniteQuery<PaymentsResponse, Error>({
    queryKey: PAYMENT_KEYS.senderToReceiverPayments(senderEns || "", receiverEns || ""),
    queryFn: ({ pageParam = 1 }) => getSenderPaymentsToReceiver(senderEns!, receiverEns!, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.reduce((acc, page) => acc + page.payments.length, 0);
      return totalFetched < lastPage.total ? lastPage.page + 1 : undefined;
    },
    enabled: !!senderEns && !!receiverEns,
  });
}
