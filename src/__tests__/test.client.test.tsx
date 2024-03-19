import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";

import Home from "../app/page";
import ClientPage from "../app/(routes)/dashboard/page";
import LoginPage from "../app/(routes)/auth/signIn/page";
import { useRouter, useSearchParams } from "next/navigation";

test("Testing the test environment", () => {
  render(<div>Hello</div>);
  expect(screen.getByText("Hello")).toBeInTheDocument();
});

jest.mock("next-auth/react");

test("should render the dashboard page - client side", () => {
  // Assemble
  jest.mock("next-auth/react", () => ({
    ...jest.requireActual("next-auth/react"),
    useSession: jest.fn(),
  }));

  useSession.mockReturnValue({});

  render(<ClientPage />);

  // Assert
  expect(screen.getByText("a Client Side Rendered")).toBeInTheDocument();
});

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

test("should render the login page", () => {
  const useRouterMock = useRouter as jest.Mock;
  useRouterMock.mockReturnValue({
    query: {},
    push: jest.fn(),
    replace: jest.fn(),
  });

  const useSearchParamsMock = useSearchParams as jest.Mock;
  useSearchParamsMock.mockReturnValue({
    get: jest.fn(),
  });

  render(<LoginPage />);

  // Assert that the component renders without errors
  expect(screen.getByText("Hello !")).toBeInTheDocument();
});

test("should render the landing page", async () => {
  //Assemble
  const ui = await Home();
  render(ui);

  //Assert
  expect(screen.getByText(/Grow your online/i)).toBeInTheDocument();
});

