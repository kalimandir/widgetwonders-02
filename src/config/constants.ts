export type Hex = `0x${string}`;

const IS_DEV = process.env.NODE_ENV === "development";
export const PORT = 8080;

export const CONFIG = {
  RECIPIENT_ENS: "hardforksailor5.yodl.eth",
  RECIPIENT_ADDRESS: "0xB34021082BDcD7D774E87e2ABD731f3D37fa75D3" as Hex,
  YAPP_URL: IS_DEV ? `http://localhost:${PORT}` : "https://donation-yapp.vercel.app",
  YAPP_ENS: "donation-yapp.yodl.eth",
  HOST: IS_DEV ? "http://localhost:3000" : "https://dapp-git-sb-add-user-context-request-yodl.vercel.app/go",
  REDIRECT_URL: IS_DEV ? `http://localhost:${PORT}` : "https://donation-yapp.vercel.app",
};
