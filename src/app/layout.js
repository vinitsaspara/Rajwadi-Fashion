import "./globals.css";
import { Toaster } from "sonner";

import ReduxProvider from "@/store/provider";
import Script from "next/script";

export const metadata = {
  title: "Rajwadi Fashion",
  description: "Fashion E-commerce Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}

          <Toaster richColors position="bottom-right" />
        </ReduxProvider>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
