import { render, screen } from "@testing-library/react";
import FAQ from "../../Pages/FAQ";

test("renders FAQ heading", () => {
  render(<FAQ />);
  expect(screen.getByText(/Frequently Asked Questions/i)).toBeTruthy();
});

test("renders all 6 FAQ items", () => {
  render(<FAQ />);
  expect(screen.getByText(/How do I apply for admission/i)).toBeTruthy();
  expect(screen.getByText(/How do I log into the student portal/i)).toBeTruthy();
  expect(screen.getByText(/How do I reset my password/i)).toBeTruthy();
  expect(screen.getByText(/What courses are available/i)).toBeTruthy();
  expect(screen.getByText(/How can I check my application status/i)).toBeTruthy();
  expect(screen.getByText(/Who do I contact for technical support/i)).toBeTruthy();
});
