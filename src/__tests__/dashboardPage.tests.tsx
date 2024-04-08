import { screen } from "@testing-library/react";

import { customRenderDashboard } from "./utils/customRenders";

describe("Dashboard Page - Client-Side-Rendering (CSR)", () => {
  test("should render with expected elements  dashboard page - CSR page", () => {
    customRenderDashboard();
    expect(screen.getByText("Time until expiration")).toBeInTheDocument();
    expect(screen.queryByText(/Negative Test/i)).not.toBeInTheDocument();
  });

  test("renders 'Time until expiration' section with expected elements", async () => {
    customRenderDashboard();
    expect(screen.getByText("Time until expiration")).toBeInTheDocument();
    expect(screen.getByText(/remaining session time/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Log Session" }),
    ).toBeInTheDocument();
  });

  test("renders 'Update session expiration' section with expected elements", async () => {
    customRenderDashboard();
    expect(screen.getByText("Update session expiration")).toBeInTheDocument();
    expect(screen.getByText(/and update your session/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Update Session" }),
    ).toBeInTheDocument();
  });
});
