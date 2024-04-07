import { screen, render } from "@testing-library/react";
import Home from "../app/page";

describe("Home Page - Server-Side-Rendering (SSR)", () => {
  test("renders expected elements on custom render", async () => {
    render(await Home());
    const button = screen.getByRole("button", { name: "Getting Started" });
    expect(button).toBeInTheDocument();
    expect(screen.getByText(/Grow your online/i)).toBeInTheDocument();
    expect(screen.queryByText(/Negative Test/i)).not.toBeInTheDocument();
  });

  test("renders all client company logo's", async () => {
    render(await Home());
    const logoImages = screen.getAllByAltText("company logo");
    expect(logoImages.length).toBe(14); // Ensure there are 7 logo images
    logoImages.forEach((img) => {
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src");
    });
  });
});
