import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import Navbar from "../app/components/navbar";

//🎯 FAILING - NAVBAR
jest.mock("next-auth/react");
test("tests the tester 3", () => {
  render(
    <SessionProvider>
      <Navbar />
    </SessionProvider>
  );

  const test = screen.getByText("shall not");

  expect(test).toBeInTheDocument();
});


// TODO: Add basic client side tests