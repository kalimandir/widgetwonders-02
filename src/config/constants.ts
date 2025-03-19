const IS_DEV = process.env.NODE_ENV === "development";
export const PORT = 8080;

export const CONFIG = {
  // RECIPIENT_ENS: "hardforksailor5.yodl.eth",
  RECIPIENT_ENS: "andy.yodl.eth",
  SENDER_ENS: "andyoee.yodl.eth", // Temp until we can get it from dapp.
  YAPP_URL: "https://yodl.me", // also used as redirectUrl in payments
  YAPP_ENS: "donation-yapp.yodl.eth", // ensName, 0x76121446c9103647F1a987310C8df912e716173E
  HOST: IS_DEV ? "http://localhost:3001" : "https://yodl.me", // origin
  REDIRECT_URL: IS_DEV ? `http://localhost:${PORT}` : "https://widgetwonders.lovable.app",
  CHAINS: ["ethereum", "base", "optimism"],
  TOKENS: [
    {
      symbol: "ETH",
      name: "Ethereum",
      chains: ["ethereum", "base", "optimism"],
    },
  ],
};
