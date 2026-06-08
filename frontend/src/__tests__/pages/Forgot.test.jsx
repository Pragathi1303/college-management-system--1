import { render, screen, fireEvent, act } from "@testing-library/react";
import Forgot from "../../Pages/Forgot";

test("renders reset password form", () => {
  render(<Forgot />);
  expect(screen.getByRole("heading", { name: /Reset Password/i })).toBeTruthy();
  expect(screen.getByLabelText(/Email Address/i)).toBeTruthy();
});

test("shows error when submitted empty", () => {
  render(<Forgot />);
  fireEvent.click(screen.getByText(/Send Reset Link/i));
  expect(screen.getByText(/Please enter your email address/i)).toBeTruthy();
});

test("shows success state after submit", () => {
  jest.useFakeTimers();
  render(<Forgot />);
  fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: "test@sece.ac.in" } });
  fireEvent.click(screen.getByText(/Send Reset Link/i));
  act(() => { jest.runAllTimers(); });
  expect(screen.getByText(/Reset link sent/i)).toBeTruthy();
  jest.useRealTimers();
});
