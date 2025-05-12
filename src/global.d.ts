// src/global.d.ts
export {};

declare global {
  interface Window {
    freighterApi?: {
      connect: () => Promise<void>;
      isConnected: () => Promise<boolean>;
      getPublicKey: () => Promise<string>;
      signTransaction: (xdr: string, options: any) => Promise<string>;
    };
  }
}
