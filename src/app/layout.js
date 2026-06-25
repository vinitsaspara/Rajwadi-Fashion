import "./globals.css";
import { Toaster } from "sonner";

import ReduxProvider from "@/store/provider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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
          <Navbar />

          {children}
          <Footer />

          <Toaster richColors position="top-right" />
        </ReduxProvider>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
