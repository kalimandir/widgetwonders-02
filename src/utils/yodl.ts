
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
    recipient: donationConfig.recipient, // Primary parameter name
    amount: amount.toString(),
    token,
    chain,
    redirectUrl: donationConfig.redirectUrl
  });
  
  // Build the complete URL using the /send endpoint
  const url = `${donationConfig.host}/send?${queryParams.toString()}`;
  
  // Debug logs
  console.log('Generated Yodl URL:', url);
  console.log(`Redirecting to Yodl checkout for $${amount} donation`);
  
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
