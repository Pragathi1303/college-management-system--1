import { render, screen } from "@testing-library/react";
import Footer from "../../Components/footer";

test("renders brand name", () => {
  render(<Footer />);
  expect(screen.getAllByText(/CampusFlow/i).length).toBeGreaterThan(0);
});

test("renders footer columns", () => {
  render(<Footer />);
  expect(screen.getByRole("heading", { name: /^Students$/i })).toBeTruthy();
  expect(screen.getByRole("heading", { name: /^Legal$/i })).toBeTruthy();
});

test("renders copyright", () => {
  render(<Footer />);
  expect(screen.getByText(/2026 CampusFlow/i)).toBeTruthy();
});
