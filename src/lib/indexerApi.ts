// From indexer api
export type PaymentSimple = {
  chainId: number;
  txHash: string;
  paymentIndex: number;
  blockTimestamp: string;

  tokenOutSymbol: string;
  tokenOutAddress: string;
  tokenOutAmountGross: string;

  receiverAddress: string;
  receiverEnsPrimaryName: string;
  receiverYodlConfig: any;

  invoiceCurrency: string;
  invoiceAmount: string;

  senderAddress: string;
  senderEnsPrimaryName: string;
};

export type PaymentsResponse = {
  page: number;
  perPage: number;
  total: number;
  payments: PaymentSimple[];
};

const INDEXER_URL = "https://tx.yodl.me/api/v1";

export const getPayment = async (txHash: string): Promise<PaymentSimple> => {
  const response = await fetch(`${INDEXER_URL}/payments/${txHash}`);
  const data = await response.json();
  return data.payment;
};

export const getReceiverPayments = async (receiverEns: string, page: number = 1): Promise<PaymentsResponse> => {
  const response = await fetch(`${INDEXER_URL}/payments?receiverEnsPrimaryName=${receiverEns}&page=${page}`);
  return await response.json();
};

export const getSenderPaymentsToReceiver = async (senderEns: string, receiverEns: string, page: number = 1): Promise<PaymentsResponse> => {
  const response = await fetch(`${INDEXER_URL}/payments?senderEnsPrimaryName=${senderEns}&receiverEnsPrimaryName=${receiverEns}&page=${page}`);
  return await response.json();
};
