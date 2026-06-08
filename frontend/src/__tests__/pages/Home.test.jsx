import { render, screen } from "@testing-library/react";
import Home from "../../Pages/Home";

test("renders hero heading", () => {
  render(<Home />);
  expect(screen.getByText(/Welcome to/i)).toBeTruthy();
});

test("renders Apply Now button", () => {
  render(<Home />);
  expect(screen.getAllByText(/Apply Now/i).length).toBeGreaterThan(0);
});

test("renders stats bar", () => {
  render(<Home />);
  expect(screen.getByText(/Students Enrolled/i)).toBeTruthy();
});
