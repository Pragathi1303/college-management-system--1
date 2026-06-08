import { render, screen } from "@testing-library/react";
import Navbar from "../../Components/navbar";

test("renders brand name", () => {
  render(<Navbar />);
  expect(screen.getByText(/CampusFlow/i)).toBeTruthy();
});

test("renders nav links", () => {
  render(<Navbar />);
  expect(screen.getByText(/Home/i)).toBeTruthy();
  expect(screen.getByText(/About/i)).toBeTruthy();
  expect(screen.getByText(/Login/i)).toBeTruthy();
  expect(screen.getByText(/Signup/i)).toBeTruthy();
});
