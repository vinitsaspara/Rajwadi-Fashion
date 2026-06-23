import "./globals.css";
import ReduxProvider from "@/store/provider";

export const metadata = {
  title: {
    default: "Rajwadi Fashion",
    template: "%s | Rajwadi Fashion",
  },
  description:
    "Timeless Indian silhouettes, crafted for celebrations and everyday elegance.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
