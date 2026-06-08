import { render, screen } from "@testing-library/react";
import Home from "./Pages/Home";

test("renders home page", () => {
  render(<Home />);
  expect(screen.getByText(/Welcome to/i)).toBeTruthy();
});




