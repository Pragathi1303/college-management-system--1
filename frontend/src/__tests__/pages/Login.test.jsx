import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../../Pages/Login";

test("renders login form", () => {
  render(<Login />);
  expect(screen.getByRole("heading", { name: /Student Login/i })).toBeTruthy();
  expect(screen.getByLabelText(/Email Address/i)).toBeTruthy();
  expect(screen.getByLabelText(/^Password$/i)).toBeTruthy();
});

test("shows error when submitted empty", () => {
  render(<Login />);
  fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));
  expect(screen.getByText(/Please fill in all fields/i)).toBeTruthy();
});

test("renders forgot password link", () => {
  render(<Login />);
  expect(screen.getByText(/Forgot password/i)).toBeTruthy();
});
