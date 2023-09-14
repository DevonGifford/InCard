import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import LoginPage from "@/app/(custom-login-page)/auth/signIn/page";

//👇 Renders the Login Page - Client Side Rendered

//- Mock useRouter, useSearchParams, next-auth, react-hot,toast
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(),
  })),
}));

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

jest.mock("react-hot-toast", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("Renders the Login Page correctly - CSR 👀", () => {
  it("renders the login page", () => {
    const { container } = render(<LoginPage />);
    expect(container).toBeInTheDocument();
  });

  it("renders the header component correctly", () => {
    const { container } = render(<LoginPage />);

    expect(screen.getByText("Hello !")).toBeInTheDocument();
  });

  it("renders the footer correctly", () => {
    const { container } = render(<LoginPage />);

    expect(screen.getByText("Dont have an account?")).toBeInTheDocument();
    expect(
      screen.getByText("Note this is part of a FE Technical Test")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /For successfull authentication, you can use the following for both the/
      )
    ).toBeInTheDocument();
  });
});

describe("Test Form-validation errors", () => {
  test("password & username cannot be empty error message", async () => {
    //-Arrange
    const { container } = render(<LoginPage />);
    const usernameTextBox = screen.getByRole("username-input");
    const passwordTextBox = screen.getByRole("password-input");
    const submitButton = screen.getByRole("button", { name: "Log in" });

    //-Act
    await userEvent.click(usernameTextBox);
    await userEvent.click(passwordTextBox);
    await userEvent.click(submitButton);

    //-Assert
    await waitFor(() => {
      const emptyPasswordError = screen.getByText(/Password cannot be empty/);
      expect(emptyPasswordError).toBeInTheDocument();
    });
    await waitFor(() => {
      const emptyUsernameError = screen.getByText(/Username cannot be empty/);
      expect(emptyUsernameError).toBeInTheDocument();
    });
  });

  test("password & username cannot be too long error message", async () => {
    //-Arrange
    const { container } = render(<LoginPage />);
    const usernameTextBox = screen.getByRole("username-input");
    const passwordTextBox = screen.getByRole("password-input");
    const submitButton = screen.getByRole("button", { name: "Log in" });

    //-Act
    await userEvent.click(usernameTextBox);
    await userEvent.keyboard("a".repeat(15));
    await userEvent.click(passwordTextBox);
    await userEvent.keyboard("a".repeat(15));
    await userEvent.click(submitButton);

    //-Assert
    await waitFor(() => {
      const longPasswordError = screen.getByText(/Password is too long/);
      expect(longPasswordError).toBeInTheDocument();
    });
    await waitFor(() => {
      const longUsernameError = screen.getByText(/Username is too long/);
      expect(longUsernameError).toBeInTheDocument();
    });
  });
});

describe("Test Login success/failure", () => {
  it("successfull form submit should have notif", async () => {
    //-Arrange
    const { container } = render(<LoginPage />);
    const usernameTextBox = screen.getByRole("username-input");
    const passwordTextBox = screen.getByRole("password-input");
    const submitButton = screen.getByRole("button", { name: "Log in" });

    //-Act , enter correct authentication details
    await userEvent.type(usernameTextBox, "incard");
    await userEvent.type(passwordTextBox, "incard");
    await userEvent.click(submitButton);

    //-Assert
    setTimeout(() => {
      expect(screen.getByText("Successfully signed in")).toBeInTheDocument();
    }, 2000);
  });

  it("unsuccessfull form submit should have notif and error message", async () => {
    //-Arrange
    const { container } = render(<LoginPage />);
    const usernameTextBox = screen.getByRole("username-input");
    const passwordTextBox = screen.getByRole("password-input");
    const submitButton = screen.getByRole("button", { name: "Log in" });

    //-Act, enter incorrect authentication details
    await userEvent.type(usernameTextBox, "incardx");
    await userEvent.type(passwordTextBox, "incardx");
    await userEvent.click(submitButton);

    //-Assert
    setTimeout(() => {
      expect(
        screen.getByText(
          "⚠ Login failed. Please check your credentials and try again."
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "Login failed, please check your credentials and try again."
        )
      ).toBeInTheDocument();
    }, 2000);
  });
});

describe("Test Toggle Password Visability function", () => {
  it("should toggle password visibility", async () => {
    const { container } = render(<LoginPage />);
    const passwordInput = screen.getByRole("password-input");
    const toggleButton = screen.getByTestId("toggle-password-vis");

    //-Initial state check
    expect(passwordInput).toHaveAttribute("type", "password");

    //-Simulate a click event on the toggle button
    await userEvent.click(toggleButton);

    //-Check if the password field is now of type text (visible)
    expect(passwordInput).toHaveAttribute("type", "text");

    //-Click the button again
    await userEvent.click(toggleButton);

    //-Check if the password field is now of type password (hidden)
    expect(passwordInput).toHaveAttribute("type", "password");
  });
});

describe("Test Quick-Copy functionality", () => {
  /// TEAR UP -  Mock the clipboard API
  beforeAll(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: jest.fn(() => Promise.resolve()),
      },
    });
  });

  it("onClick has the expected toast notification", async () => {
    const { container } = render(<LoginPage />);

    //- Locate and click the copy button
    const copyButton = screen.getByText("incard");
    await userEvent.click(copyButton);

    //- Verify if the toast message is displayed
    setTimeout(() => {
      expect(screen.getByText("Copied to clipboard")).toBeInTheDocument();
    }, 2000);
  });

  it("onClick copies text to clip-board", async () => {
    const { container } = render(<LoginPage />);

    //- Locate and click the copy button
    const copyButton = screen.getByText("incard");
    await userEvent.click(copyButton);

    //- Verify if the copyText function was called
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("incard");
  });

  /// TEAR DOWN -  Restore the clipboard API after the tests
  afterAll(() => {
    jest.restoreAllMocks();
  });
});

//- test callbacks...
