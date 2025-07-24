import { render, screen } from "@testing-library/react";
import SignInPageUI from "../src/app/(auth)/signin/SignInPageUI";

// Mock child components for isolation
jest.mock("@/components/composites/home/auth/Authenticated", () => () => (
  <div>Authenticated</div>
));
jest.mock(
  "@/components/composites/home/auth/AuthenticationProcessor",
  () => () => <div>Processing</div>
);
jest.mock("@/components/primitives/derived/HomeLoader", () => () => (
  <div>Loading...</div>
));
jest.mock(
  "@/components/primitives/derived/ErrorComponent",
  () =>
    ({ error }: { error: string }) => <div>Error: {error}</div>
);
jest.mock("@/components/composites/home/signin/SignInButton", () => () => (
  <button type="button">Sign In</button>
));
jest.mock("@/components/composites/home/signin/SignInText", () => () => (
  <div>Sign In Text</div>
));

describe("SignInPageUI", () => {
  const baseProps = {
    session: null,
    status: "unauthenticated",
    isProcessing: false,
    error: null,
    hasOAuthCode: null,
  };

  it("shows loader when status is loading", () => {
    render(<SignInPageUI {...baseProps} status="loading" />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("shows authenticated when session exists and not processing", () => {
    render(
      <SignInPageUI
        {...baseProps}
        session={{ user: {}, expires: "" }}
        hasOAuthCode={null}
        isProcessing={false}
      />
    );
    expect(screen.getByText(/authenticated/i)).toBeInTheDocument();
  });

  it("shows processor when isProcessing is true", () => {
    render(<SignInPageUI {...baseProps} isProcessing={true} />);
    expect(screen.getByText(/processing/i)).toBeInTheDocument();
  });

  it("shows error when error is present", () => {
    render(<SignInPageUI {...baseProps} error="Invalid credentials" />);
    expect(screen.getByText(/error: invalid credentials/i)).toBeInTheDocument();
  });

  it("shows sign in button and text by default", () => {
    render(<SignInPageUI {...baseProps} />);
    expect(screen.getByText(/sign in text/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });
});
