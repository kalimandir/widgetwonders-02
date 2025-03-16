
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
  
  // First explicitly get the ENS address from config
  const ensRecipient = donationConfig.recipient;
  
  // Build the complete URL for Yodl checkout
  // Using URLSearchParams to ensure proper encoding
  const queryParams = new URLSearchParams();
  
  // Always add the recipient first and ensure it's properly encoded
  queryParams.set('to', ensRecipient); // Changed from 'recipient' to 'to'
  
  // Add other parameters
  queryParams.set('amount', amount.toString());
  queryParams.set('token', token);
  queryParams.set('chain', chain);
  queryParams.set('redirectUrl', donationConfig.redirectUrl);
  
  // Build the URL with the /send endpoint
  const url = `${donationConfig.host}/send?${queryParams.toString()}`;
  
  // Enhanced debugging logs
  console.log('Generated Yodl URL:', url);
  console.log(`Redirecting to Yodl checkout for $${amount} donation`);
  console.log('Using ENS recipient:', ensRecipient);
  
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
