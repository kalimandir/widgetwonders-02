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

// {
//     "page": 1,
//     "perPage": 100,
//     "total": 2,
//     "payments": [
//         {
//             "chainId": 8453,
//             "txHash": "0xfe342836af2c47cce8e6ac49674dcbdf132fcd2beaf68c6387fde754fe3588b4",
//             "paymentIndex": 0,
//             "destinationChainId": null,
//             "destinationTxHash": null,
//             "blockTimestamp": "2025-03-13T11:45:47.000Z",
//             "tokenOutSymbol": "USDM",
//             "tokenOutAddress": "0x59D9356E565Ab3A36dD77763Fc0d87fEaf85508C",
//             "tokenOutAmountGross": "0.1",
//             "receiverAddress": "0xCB0A6Bf7f9843133c19A10DB0e25415F8c53463F",
//             "receiverEnsPrimaryName": "andyoee.eth",
//             "receiverYodlConfig": {
//                 "webhooks": [
//                     "https://webhook.site/1268cd47-50e3-40cc-a630-f4dcc724ce37"
//                 ]
//             },
//             "invoiceCurrency": "USD",
//             "invoiceAmount": "0.1",
//             "senderAddress": "0x250189C0Af7c0f4CD7871c9a20826eAee4c0a50c",
//             "senderEnsPrimaryName": "andy.yodl.eth"
//         },
