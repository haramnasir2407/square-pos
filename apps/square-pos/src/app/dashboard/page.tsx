import ErrorBoundary from "@/components/composites/common/ErrorBoundary";
import { DashboardContainer } from "@/containers/DashboardContainer";

/**
 * Dashboard page for authenticated users.
 * Fetches products and inventory server-side, and renders the product section.
 * Redirects to home if not authenticated.
 */
export default function DashboardPage() {
  return (
    <ErrorBoundary>
      <DashboardContainer />
    </ErrorBoundary>
  );
}
