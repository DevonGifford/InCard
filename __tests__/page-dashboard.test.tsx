import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ClientPage from "@/app/(dashboard-page_protected)/dashboard/page";

//👇 Renders the Dashboard Page - Client Side Rendered

//- MOCK THE SESSION DATA
jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual("next-auth/react");
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: "incard" },
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: "authenticated" }; // return type is [] in v3 but changed to {} in v4
    }),
  };
});

describe("Renders the Dashboard correctly - CSR 👀", () => {
  test("renders the Dashboard component correctly", () => {
    const { container } = render(<ClientPage />);
    expect(container).toBeInTheDocument();
  });

  it("expects Heading to be rendered", async () => {
    const { container } = render(<ClientPage />);
    //- Check heading text renders
    const headingElem1 = screen.getByText(/Welcome to your/i);
    const headingElem2 = screen.getByText(/Dashboard,/i);
    //- Assert content is present
    expect(headingElem1).toBeInTheDocument();
    expect(headingElem2).toBeInTheDocument();
  });

  it("expects PageType element to be rendered (SSR or CSR)", async () => {
    const { container } = render(<ClientPage />);
    //-assert the element exists
    expect(screen.getByText(/a Client Side Rendered/i)).toBeInTheDocument();
  });
});

describe("Test the 'Log-Session' functionality & Notifications", () => {
  test("onClick has the expected toast notification", async () => {
    //-Arrange
    const { container } = render(<ClientPage />);
    const button = screen.getByRole("button", { name: "Log Session" });

    //-Act
    await userEvent.click(button);

    //-Assert
    setTimeout(() => {
      expect(screen.getByTestId("log-session-notif")).toBeInTheDocument();
      expect(screen.getByText("you have")).toBeInTheDocument();
    }, 2000);
  });

  test("expect elements to be rendered", () => {
    //-Arrange
    const { container } = render(<ClientPage />);
    const heading = screen.getByTestId("log-session-heading");  // dynamic text thus testId tags
    const content = screen.getByTestId("log-session-heading");

    //-Assert
    expect(heading).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });
});

describe("Test the 'Update-Session' functionality & Notifications", () => {
  test("onClick has the expected toast notification", async () => {
    //-Arrange
    const { container } = render(<ClientPage />);
    const button = screen.getByRole("button", { name: "Update Session" });

    //-Act
    await userEvent.click(button);

    //-Assert
    setTimeout(() => {
      expect(
        screen.getByText("Session expiration updated")
      ).toBeInTheDocument();
    }, 2000);
  });

  test("expect elements to be rendered", () => {
    //-Arrange
    const { container } = render(<ClientPage />);
    const heading = screen.getByTestId("update-session-heading"); // dynamic text thus testId tags
    const content = screen.getByTestId("update-session-heading");

    //-Assert
    expect(heading).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });
});