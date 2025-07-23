import "./globals.css";

import { CartContextProvider } from "../shared/context/CartContext";
import { SessionProviders } from "@/shared/providers/SessionProvider";
import { QueryProvider } from "@/shared/providers/QueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartContextProvider>
          <SessionProviders>
            <QueryProvider>
              {children} <ReactQueryDevtools initialIsOpen={true} />
            </QueryProvider>
          </SessionProviders>
        </CartContextProvider>
      </body>
    </html>
  );
}
