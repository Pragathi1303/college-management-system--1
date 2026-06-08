import { render, screen, fireEvent } from "@testing-library/react";
import Signup from "../../Pages/Signup";

test("renders signup form", () => {
  render(<Signup />);
  expect(screen.getByRole("heading", { name: /Create Account/i })).toBeTruthy();
  expect(screen.getByLabelText(/Full Name/i)).toBeTruthy();
});

test("shows error when submitted empty", () => {
  render(<Signup />);
  fireEvent.click(screen.getByRole("button", { name: /Create Account/i }));
  expect(screen.getByText(/Please fill in all fields/i)).toBeTruthy();
});

test("shows error when passwords do not match", () => {
  render(<Signup />);
  fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { name: "name", value: "Test" } });
  fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { name: "email", value: "t@t.com" } });
  fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { name: "password", value: "123456" } });
  fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { name: "confirm", value: "999999" } });
  fireEvent.click(screen.getByRole("button", { name: /Create Account/i }));
  expect(screen.getByText(/Passwords do not match/i)).toBeTruthy();
});
