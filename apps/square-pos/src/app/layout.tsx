import "./globals.css";
import { QueryProvider } from "@/shared/providers/QueryProvider";
import { SessionProviders } from "@/shared/providers/SessionProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const metadata: Metadata = {
  title: "Square POS App",
  description: "A NextJs app for managing you sqaure point-of-scale."
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProviders>
          <QueryProvider>
            {children} <ReactQueryDevtools initialIsOpen={false} />
          </QueryProvider>
        </SessionProviders>
      </body>
    </html>
  );
}
