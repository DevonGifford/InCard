import { screen } from "@testing-library/react";

import { customRenderDashboard } from "./utils/customRenders";
import { customRenderSignIn } from "./utils/customRenders";
import { customRenderHome } from "./utils/customRenders";

describe("Home Page - Server-Side-Rendering (SSR)", () => {
  beforeEach(async () => {
    await customRenderHome();
  });

  test("renders expected elements on custom render", async () => {
    const button = screen.getByRole("button", { name: "Getting Started" });
    expect(button).toBeInTheDocument();
    expect(screen.getByText(/Grow your online/i)).toBeInTheDocument();
    expect(screen.queryByText(/Negative Test/i)).not.toBeInTheDocument();
  });

  test("renders premium-visa-card splash image", async () => {
    const img = screen.getByAltText("premium visa card");
    expect(img).toBeInTheDocument();
  });

  test("renders all client company logo's", async () => {
    const logoImages = screen.getAllByAltText("company logo");
    expect(logoImages.length).toBe(7); // Ensure there are 7 logo images
    logoImages.forEach((img) => {
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src");
    });
  });
});

describe("Login Page - Client-Side-Rendering (CSR)", () => {
  beforeEach(async () => {
    customRenderSignIn();
  });

  test("renders login form with inputs and 'Log in' button", async () => {
    expect(screen.getByRole("username-input")).toBeInTheDocument();
    expect(screen.getByRole("password-input")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Log in" })).toBeInTheDocument();
  });

  test("renders 'Back to Home Page' link", async () => {
    expect(
      screen.getByRole("link", { name: "Back to Home Page" })
    ).toBeInTheDocument();
  });

  test("renders login image and 'Don't have an account?' text", async () => {
    expect(screen.getByAltText("login-image")).toBeInTheDocument();
    expect(screen.getByText("Dont have an account?")).toBeInTheDocument();
  });
});

describe("Dashboard Page - Client-Side-Rendering (CSR)", () => {
  beforeEach(async () => {
    customRenderDashboard();
  });

  test("should render with expected elements  dashboard page - CSR page", () => {
    expect(screen.getByText("Time until expiration")).toBeInTheDocument();
    expect(screen.queryByText(/Negative Test/i)).not.toBeInTheDocument();
  });

  test("renders 'Time until expiration' section with expected elements", async () => {
    expect(screen.getByText("Time until expiration")).toBeInTheDocument();
    expect(screen.getByText(/remaining session time/i)).toBeInTheDocument();
    expect( screen.getByRole("button", { name: "Log Session" })).toBeInTheDocument();
  });

  test("renders 'Update session expiration' section with expected elements", async () => {
    expect(screen.getByText("Update session expiration")).toBeInTheDocument();
    expect(screen.getByText(/and update your session/i)).toBeInTheDocument();
    expect( screen.getByRole("button", { name: "Update Session" })).toBeInTheDocument();
  });
});
