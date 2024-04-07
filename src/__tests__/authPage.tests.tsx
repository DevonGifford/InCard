import { screen } from "@testing-library/react";

import { customRenderSignIn } from "./utils/customRenders";

describe("Login Page - Client-Side-Rendering (CSR)", () => {
  test("renders login form with inputs and 'Log in' button", async () => {
    customRenderSignIn();
    expect(screen.getByRole("username-input")).toBeInTheDocument();
    expect(screen.getByRole("password-input")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Log in" })).toBeInTheDocument();
  });

  test("renders 'Back to Home Page' link", async () => {
    customRenderSignIn();
    expect(
      screen.getByRole("link", { name: "Back to Home Page" }),
    ).toBeInTheDocument();
  });

  test("renders login image and 'Don't have an account?' text", async () => {
    customRenderSignIn();
    expect(screen.getByAltText("login-image")).toBeInTheDocument();
    expect(screen.getByText("Dont have an account?")).toBeInTheDocument();
  });
});
