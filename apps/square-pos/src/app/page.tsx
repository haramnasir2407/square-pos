// import HomeContainer from "@/containers/HomeContainer/HomeContainer";

// export default function HomePage() {
//   return <HomeContainer />;
// }

import ErrorBoundary from "@/components/composites/common/ErrorBoundary";
import FaultyComponent from "@/components/composites/faulty-component/FaultyComponent";

// * this is for testing the error boundary
export default function Home() {
  return (
    <div>
      <h1>Welcome to Next.js Error Boundaries Demo</h1>
      <ErrorBoundary>
        <FaultyComponent />
      </ErrorBoundary>
    </div>
  );
}
