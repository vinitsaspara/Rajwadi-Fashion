import "./globals.css";
import { Toaster } from "sonner";

import ReduxProvider from "@/store/provider";

export const metadata = {
  title: "Rajwadi Fashion",
  description: "Fashion E-commerce Store",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
           <Toaster richColors position="top-right" />
        </ReduxProvider>
      </body>
    </html>
  );
}