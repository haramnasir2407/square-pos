// "use client";
// import React, { useState, useCallback } from "react";

// interface ErrorBoundaryProps {
//   children: React.ReactNode;
//   fallback?: React.ReactNode;
// }

// function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
//   const [error, setError] = useState<Error | null>(null);

//   const ErrorFallback = useCallback(
//     () => (
//       <div style={{ padding: 24, color: "red" }}>
//         <h2>Something went wrong.</h2>
//         <pre>{error?.message}</pre>
//       </div>
//     ),
//     [error]
//   );

//   if (error) {
//     return fallback || <ErrorFallback />;
//   }

//   return (
//     <React.Suspense fallback={fallback || <ErrorFallback />}>
//       {children}
//     </React.Suspense>
//   );
// }

// export default ErrorBoundary;

// * class method
// "use client";
// import React from "react";

// type ErrorBoundaryProps = {
//   children: React.ReactNode;
// };

// type ErrorBoundaryState = {
//   hasError: boolean;
// };

// class ErrorBoundary extends React.Component<
//   ErrorBoundaryProps,
//   ErrorBoundaryState
// > {
//   constructor(props: ErrorBoundaryProps) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error: Error) {
//     // Update state to render fallback UI
//     return { hasError: true };
//   }

//   componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
//     // Log the error to an external service
//     console.error("Error occurred:", error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       // Render fallback UI
//       return <h1>Something went wrong</h1>;
//     }

//     return this.props.children;
//   }
// }

// export default ErrorBoundary;

// * react error boundary

import { ErrorBoundary as REB } from "react-error-boundary";

export default function ErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  return <REB fallback={<div>Something went wrong.</div>}>{children}</REB>;
}
