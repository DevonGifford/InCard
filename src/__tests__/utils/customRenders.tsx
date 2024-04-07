import LoginPage from "@/src/app/auth/signIn/page";
import DashboardPage from "@/src/app/dashboard/page";

import { render } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  useSession: jest.fn(),
}));

export function customRenderSignIn() {
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

  return render(<LoginPage />);
}

export function customRenderDashboard() {
  useSession.mockReturnValue({});

  return render(<DashboardPage />);
}
