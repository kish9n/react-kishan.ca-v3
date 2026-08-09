import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, test, vi } from "vitest";
import App from "./App";

vi.mock("react-particles", () => ({
  default: () => <div data-testid="particles" />,
}));

test("renders the home page", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("heading", { name: "Kishan Manoharan" })
  ).toBeInTheDocument();
});
