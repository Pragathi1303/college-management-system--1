import { render, screen, fireEvent, act } from "@testing-library/react";
import Application from "../../Pages/Application";

test("renders application form", () => {
  render(<Application />);
  expect(screen.getByText(/College Application Form/i)).toBeTruthy();
  expect(screen.getByLabelText(/Full Name/i)).toBeTruthy();
});

test("shows error when submitted empty", () => {
  render(<Application />);
  fireEvent.click(screen.getByText(/Submit Application/i));
  expect(screen.getByText(/Please fill in all required fields/i)).toBeTruthy();
});

test("shows success state after full submission", () => {
  jest.useFakeTimers();
  render(<Application />);
  fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { name: "name", value: "Arjun" } });
  fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { name: "email", value: "a@a.com" } });
  fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { name: "phone", value: "9999999999" } });
  fireEvent.change(screen.getByLabelText(/Date of Birth/i), { target: { name: "dob", value: "2000-01-01" } });
  fireEvent.change(screen.getByLabelText(/Previous College/i), { target: { name: "school", value: "ABC School" } });
  fireEvent.change(screen.getByLabelText(/HSC/i), { target: { name: "percentage", value: "90%" } });
  fireEvent.change(screen.getByLabelText(/City/i), { target: { name: "city", value: "Coimbatore" } });
  fireEvent.change(screen.getByLabelText(/Course Interested/i), { target: { name: "course", value: "B.E Computer Science & Engineering" } });
  fireEvent.click(screen.getByText(/Submit Application/i));
  act(() => { jest.runAllTimers(); });
  expect(screen.getByText(/Application Submitted/i)).toBeTruthy();
  jest.useRealTimers();
});
