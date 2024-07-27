import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "./App";

test("renders Where to next? button", () => {
  render(<App />);

  expect(
    screen.getByRole("button", { name: "Where to next?" })
  ).toBeInTheDocument();
});

test("renders postcode when user clicks Where to next? button", async () => {
  render(<App />);

  await userEvent.click(screen.getByRole("button", { name: "Where to next?" }));

  expect(screen.getByText(/3\d{3}/)).toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: "Where to next?" })
  ).not.toBeInTheDocument();
});
