// * react error boundary

import { ErrorBoundary as REB } from "react-error-boundary";

export default function ErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  return <REB fallback={<div>Something went wrong.</div>}>{children}</REB>;
}
