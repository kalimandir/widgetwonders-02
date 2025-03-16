
import donationConfig from '../config/donation.config.json';

interface YodlCheckoutParams {
  amount: number;
  token?: string;
  chain?: string;
}

/**
 * Generates a Yodl checkout URL for donation
 * @param params Parameters for the checkout URL
 * @returns The complete checkout URL
 */
export const generateYodlCheckoutUrl = (params: YodlCheckoutParams): string => {
  const { amount, token = 'ETH', chain = 'ethereum' } = params;
  
  // Construct query parameters
  const queryParams = new URLSearchParams({
    to: donationConfig.recipient,
    amount: amount.toString(),
    token,
    chain,
    redirectUrl: donationConfig.redirectUrl
  });
  
  // Build the complete URL
  return `${donationConfig.host}/checkout?${queryParams.toString()}`;
};

/**
 * Opens the Yodl checkout in a new tab
 * @param params Parameters for the checkout
 */
export const openYodlCheckout = (params: YodlCheckoutParams): void => {
  const url = generateYodlCheckoutUrl(params);
  window.open(url, '_blank');
};
