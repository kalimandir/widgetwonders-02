import { CONFIG } from "@/config/constants";
import YappSDK from "@yodlpay/yapp-sdk";

export const sdk = new YappSDK({
  ensName: CONFIG.YAPP_ENS,
  origin: CONFIG.HOST,
});
