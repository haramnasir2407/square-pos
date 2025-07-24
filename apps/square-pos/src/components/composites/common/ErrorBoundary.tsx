"use client";
import React, { useState, useCallback } from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  const [error, setError] = useState<Error | null>(null);

  const ErrorFallback = useCallback(
    () => (
      <div style={{ padding: 24, color: "red" }}>
        <h2>Something went wrong.</h2>
        <pre>{error?.message}</pre>
      </div>
    ),
    [error]
  );

  if (error) {
    return fallback || <ErrorFallback />;
  }

  return (
    <React.Suspense fallback={fallback || <ErrorFallback />}>
      {children}
    </React.Suspense>
  );
}

export default ErrorBoundary;
