declare global {
  interface Window {
    ethereum: any;
  }

  namespace JSX {
    interface IntrisicElements {
      "w3m-connect-button": Pick<
        W3mConnectButton,
        "size" | "label" | "loadingLabel"
      >;
      "w3m-account-button": Pick<W3mAccountButton, "disabled" | "balance">;
      "w3m-button": Pick<
        W3mButton,
        "size" | "label" | "loadingLabel" | "disabled" | "balance"
      >;
      "w3m-network-button": Pick<W3mNetworkButton, "disabled">;
      "w3m-onramp-widget": Pick<W3mOnrampWidget, "disabled">;
    }
  }
}

export {};
