
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
  
  // Directly build the URL with query parameters to ensure correct format
  // Note: We're not using URLSearchParams to have more control over the URL structure
  const baseUrl = `${donationConfig.host}/send`;
  
  // Manually construct query string with recipient as first parameter
  let url = `${baseUrl}?to=${encodeURIComponent(recipient)}`;
  url += `&amount=${encodeURIComponent(amount.toString())}`;
  url += `&token=${encodeURIComponent(token)}`;
  url += `&chain=${encodeURIComponent(chain)}`;
  url += `&redirectUrl=${encodeURIComponent(donationConfig.redirectUrl)}`;
  
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
