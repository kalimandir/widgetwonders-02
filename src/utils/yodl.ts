
import donationConfig from '../config/donation.config.json';

interface YodlCheckoutParams {
  amount: number;
  token?: string;
  chain?: string;
  organizationName?: string;
}

/**
 * Generates a Yodl checkout URL for donation
 * @param params Parameters for the checkout URL
 * @returns The complete checkout URL
 */
export const generateYodlCheckoutUrl = (params: YodlCheckoutParams): string => {
  const { amount, token = 'ETH', chain = 'ethereum', organizationName } = params;
  
  // Get the recipient address from config
  const recipient = donationConfig.recipient;
  
  // Build the URL using the format: https://yodl.me/{recipient}?amount={amount}
  const baseUrl = `https://yodl.me/${recipient}`;
  
  // Add amount as query parameter
  let url = `${baseUrl}?amount=${encodeURIComponent(amount.toString())}`;
  
  // Add optional parameters if needed
  if (token && token !== 'ETH') {
    url += `&token=${encodeURIComponent(token)}`;
  }
  
  if (chain && chain !== 'ethereum') {
    url += `&chain=${encodeURIComponent(chain)}`;
  }
  
  // Enhanced debugging logs
  console.log('Generated Yodl URL:', url);
  console.log(`Redirecting to Yodl checkout for $${amount} donation`);
  console.log('Using ENS recipient:', recipient);
  
  return url;
};

/**
 * Opens the Yodl checkout in a new tab
 * @param params Parameters for the checkout
 */
export const openYodlCheckout = (params: YodlCheckoutParams): void => {
  const url = generateYodlCheckoutUrl(params);
  console.log('Opening URL:', url);
  window.open(url, '_blank');
};
