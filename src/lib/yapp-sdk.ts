import { CONFIG } from "@/config/constants";
import YappSDK from "@yodlpay/yapp-sdk";

export const sdk = new YappSDK({
  ensName: CONFIG.YAPP_ENS,
  origin: CONFIG.HOST,
  publicKey: import.meta.env.VITE_YODL_PUBLIC_KEY || "", // Not set, not used. For jwt but it's not implemented on dapp side )and likely will be replaced by siwe).
});
