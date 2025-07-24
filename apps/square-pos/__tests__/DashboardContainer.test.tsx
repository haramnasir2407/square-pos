import { render, screen, waitFor } from "@testing-library/react";
import DashboardContainer from "../src/containers/DashboardContainer/DashboardContainer";

// Mock next/navigation redirect
jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

// Mock auth
jest.mock("~/auth", () => ({
  auth: jest.fn(),
}));

// Mock useDashboardData
jest.mock("../src/containers/DashboardContainer/useDashboardData", () => ({
  useDashboardData: jest.fn(),
}));

// Mock child components
jest.mock(
  "@/components/composites/dashboard/header/DashboardHeader",
  () => () => <div>Header</div>
);
jest.mock(
  "@/components/composites/dashboard/products/ProductSection",
  () => () => <div>ProductSection</div>
);
jest.mock(
  "@/components/composites/dashboard/products/ProductSectionSkeleton",
  () => () => <div>Skeleton</div>
);

describe("DashboardContainer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("redirects to /signin if not authenticated", async () => {
    const { auth } = require("~/auth");
    const { redirect } = require("next/navigation");
    auth.mockResolvedValue(null);

    // Render and wait for redirect
    await DashboardContainer();
    expect(redirect).toHaveBeenCalledWith("/signin");
  });

  it("renders dashboard for authenticated user", async () => {
    const { auth } = require("~/auth");
    const {
      useDashboardData,
    } = require("../src/containers/DashboardContainer/useDashboardData");
    auth.mockResolvedValue({ user: { name: "Alice" }, accessToken: "token" });
    useDashboardData.mockResolvedValue({
      products: [],
      inventoryData: [],
    });

    // Render the component
    const result = await DashboardContainer();

    // Render the returned JSX to test output
    render(result);

    expect(screen.getByText(/welcome back, alice/i)).toBeInTheDocument();
    expect(screen.getByText(/header/i)).toBeInTheDocument();
    expect(screen.getByText(/productsection/i)).toBeInTheDocument();
  });
});
