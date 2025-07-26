declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeListener: (event: string, callback: (...args: any[]) => void) => void;
      isMetaMask?: boolean;
    };
    ic?: {
      plug?: {
        requestConnect: () => Promise<any>;
        isConnected: () => Promise<boolean>;
        disconnect: () => Promise<void>;
        agent?: any;
      };
    };
  }
}

export {};