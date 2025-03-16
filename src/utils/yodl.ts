
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
  
  // Construct query parameters
  const queryParams = new URLSearchParams();
  
  // Add the recipient parameter - ensure this is the first parameter
  queryParams.append('recipient', donationConfig.recipient);
  
  // Add other parameters
  queryParams.append('amount', amount.toString());
  queryParams.append('token', token);
  queryParams.append('chain', chain);
  queryParams.append('redirectUrl', donationConfig.redirectUrl);
  
  // Build the complete URL using the /send endpoint
  const url = `${donationConfig.host}/send?${queryParams.toString()}`;
  
  // Enhanced debugging logs
  console.log('Generated Yodl URL:', url);
  console.log(`Redirecting to Yodl checkout for $${amount} donation`);
  console.log('ENS recipient:', donationConfig.recipient);
  
  return url;
};

/**
 * Opens the Yodl checkout in a new tab
 * @param params Parameters for the checkout
 */
export const openYodlCheckout = (params: YodlCheckoutParams): void => {
  const url = generateYodlCheckoutUrl(params);
  window.open(url, '_blank');
};
