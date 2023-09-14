import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Button from "@/app/components/ui/button";
import CustomLink from "@/app/components/ui/sidebar-link";
import FormFooter from "@/app/components/ui/form-footer";

import SideBar from "@/app/components/sidebar";
import Navbar from "@/app/components/navbar";
import { signOut } from "next-auth/react";

describe("Testing Evironment Setup & Functionality", () => {
  //✅ working
  test("tests the tester", () => {
    //-testing setup
  });

  //✅ working
  test("tests the tester 2", () => {
    expect(1).toBe(1);
  });
});

describe("Testing the 'Button' component", () => {
  test("Render Setup Check - 'Button'", () => {
    render(<Button text="hello" />);

    const buttonTest = screen.getByText("hello");

    expect(buttonTest).toBeInTheDocument();
  });
});

describe("Testing the 'CustomLink' component", () => {
  test("Render Setup Check - 'CustomLink'", () => {
    render(
      <CustomLink
        source="/this-is-a-link"
        title="temp title"
        secure={false}
        client={false}
      />
    );

    const testTitle = screen.getByText(/temp title/i);
    const unprotectedPage = screen.getByText(/Unprotected page/i);
    const serverSidePage = screen.getByText(/Server Side/i);

    expect(testTitle).toBeInTheDocument();
    expect(unprotectedPage).toBeInTheDocument();
    expect(serverSidePage).toBeInTheDocument();
  });
});

describe("Testing the 'Footer' component", () => {
  test("Render Setup Check - 'Footer'", () => {
    render(<FormFooter />);
    const footerTest = screen.getByText("Dont have an account?");

    expect(footerTest).toBeInTheDocument();
  });
});

describe("Testing the 'SideBar' component", () => {
  test("Render Setup Check - 'SideBar'", async () => {
    //-Arrange
    render(<SideBar />);
    const triggerIcon = screen.getByTestId("SideBar-Trigger");

    //-Act
    await userEvent.click(triggerIcon);

    //-Assert
    await waitFor(() => {
      expect(triggerIcon).toBeInTheDocument();
    });
  });
});

//- MOCK THE SESSION DATA - FOR NAVBAR
jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual("next-auth/react");
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: "incard" },
  };
  return {
    __esModule: true,
    ...originalModule,
    signOut: jest.fn(),
    signIn: jest.fn(),
    useSession: jest.fn(() => {
      return { data: mockSession, status: "authenticated" }; // return type is [] in v3 but changed to {} in v4
    }),
  };
});

describe("Testing the 'NavBar' component", () => {
  test("Render Setup Check - 'NavBar'", () => {
    const { container } = render(<Navbar />);
    expect(container).toBeInTheDocument();
  });

  test("Sign Out Button Renders Correctly", () => {
    //-Mocking authenticated session
    jest.spyOn(require("next-auth/react"), "useSession").mockReturnValueOnce({
      data: {
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
        user: { username: "incard" },
      },
      status: "authenticated",
    });

    const { container } = render(<Navbar />);
    const signOutButton = screen.getByText("Sign Out");
    expect(signOutButton).toBeInTheDocument();
  });

  test("Sign Out Button Click Calls signOut Function", async () => {
    //-Arrange
    const { container } = render(<Navbar />);
    const signOutButton = screen.getByText("Sign Out");

    //-Act
    await userEvent.click(signOutButton);

    //-Assert
    expect(signOut).toHaveBeenCalled();
  });
});
