import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Home from "@/app/page";
import Button from "@/app/components/ui/button";

import mockRouter from "next-router-mock";
import NextLink from "next/link";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import Navbar from "@/app/components/navbar";
import { signIn } from "next-auth/react";

//👇 Renders the Home Page - Server Side Rendered

//-Mock the router
jest.mock("next/router", () => jest.requireActual("next-router-mock"));

describe("Renders the Home Page correctly - SSR 👀", () => {
  it("renders the home page", async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(await Home());
    });
  });

  it("expects NextLink can be rendered", () => {
    render(<NextLink href="/example">Example Link</NextLink>, {
      wrapper: MemoryRouterProvider,
    });
    fireEvent.click(screen.getByText("Example Link"));
    expect(mockRouter.asPath).toEqual("/example");
  });

  it("expects Heading to be rendered", async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(await Home());
    });

    //- Find the element & content
    const headingdiv = screen.getByRole("heading");
    const headingElem1 = screen.getByText(/Grow your online/i);
    const headingElem2 = screen.getByText(/business/i);
    const headingElem3 = screen.getByText(/with incard/i);

    //- Assert the element & content is present
    expect(screen.getByRole("heading")).toBeInTheDocument(); //🤔🎯 this is harder to read at a glance?  best practice?
    expect(headingElem1).toBeInTheDocument();
    expect(headingElem2).toBeInTheDocument();
    expect(headingElem3).toBeInTheDocument();
  });

  it("expects PageType to be rendered (SSR or CSR)", async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(await Home());
    });

    //-assert the element exists
    expect(screen.getByText(/a Client Side Rendered/i)).toBeInTheDocument();
  });
});

describe("Renders the Images correctly", () => {
  it("expects background image to be rendered", async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(await Home());
    });

    const backgroundImage = screen.getByRole("background-image");

    expect(backgroundImage).toBeInTheDocument();
  });

  it("expects company logo's to be rendered", async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(await Home());
    });

    const companyLogoImages = screen.getAllByRole("company-logo");

    companyLogoImages.forEach((image) => {
      expect(image).toBeInTheDocument();
    });
  });
});

describe("Test Dashboard Link", () => {
  it("should navigate to the dashboard page when clicked", async () => {
    render(
      <NextLink href="/dashboard">
        <Button text="Dashboard" />
      </NextLink>,
      { wrapper: MemoryRouterProvider }
    );

    const link = screen.getByRole("link", { name: "Dashboard" });
    await userEvent.click(link);

    expect(mockRouter.asPath).toEqual("/dashboard");

    // next-auth will handle redirects
  });
});

//- Mock session data - no session
jest.mock("next-auth/react", () => {
    const originalModule = jest.requireActual("next-auth/react");
    return {
      __esModule: true,
      ...originalModule,
      signOut: jest.fn(),
      signIn: jest.fn(),
      useSession: jest.fn(() => {
        return { data: null, status: "unauthenticated" }; // return type is [] in v3 but changed to {} in v4
      }),
    };
  });
  
describe("Test Navbar Login button (no session)", () => {  
test("Sign In Button Renders Correctly", () => {
    const { container } = render(<Navbar />);
    const signInButton = screen.getByText("Sign In");
    expect(signInButton).toBeInTheDocument();
});

test("Sign In Button Click Calls signIn Function", async () => {
    const { container } = render(<Navbar />);
    const signInButton = screen.getByText("Sign In");
    await userEvent.click(signInButton);
    expect(signIn).toHaveBeenCalled();
});
});
