import { render, screen } from "@testing-library/react";
import Admin from "../../Pages/Admin";

test("renders admin dashboard heading", () => {
  render(<Admin />);
  expect(screen.getByText(/Admin Dashboard/i)).toBeTruthy();
});

test("renders metric cards", () => {
  render(<Admin />);
  expect(screen.getByText(/Total Students/i)).toBeTruthy();
  expect(screen.getByText(/Faculty Members/i)).toBeTruthy();
  expect(screen.getByText(/Pending Applications/i)).toBeTruthy();
});

test("renders recent applications table", () => {
  render(<Admin />);
  expect(screen.getByText(/Recent Applications/i)).toBeTruthy();
  expect(screen.getByText(/Arun Kumar/i)).toBeTruthy();
});
