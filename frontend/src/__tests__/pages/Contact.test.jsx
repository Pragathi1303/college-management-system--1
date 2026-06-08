import { render, screen, fireEvent, act } from "@testing-library/react";
import Contact from "../../Pages/Contact";

test("renders contact form", () => {
  render(<Contact />);
  expect(screen.getByRole("heading", { name: /Contact Us/i })).toBeTruthy();
  expect(screen.getByLabelText(/Your Name/i)).toBeTruthy();
});

test("shows error when required fields empty", () => {
  render(<Contact />);
  fireEvent.click(screen.getByText(/Send Message/i));
  expect(screen.getByText(/Name, email, and message are required/i)).toBeTruthy();
});

test("shows success after submission", () => {
  jest.useFakeTimers();
  render(<Contact />);
  fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { name: "name", value: "Test" } });
  fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { name: "email", value: "t@t.com" } });
  fireEvent.change(screen.getByLabelText(/Message/i), { target: { name: "message", value: "Hello" } });
  fireEvent.click(screen.getByText(/Send Message/i));
  act(() => { jest.runAllTimers(); });
  expect(screen.getByText(/Message sent/i)).toBeTruthy();
  jest.useRealTimers();
});
