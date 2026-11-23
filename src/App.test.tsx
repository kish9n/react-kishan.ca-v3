import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, test, vi } from "vitest";
import App from "./App";

vi.mock("react-particles", () => ({
  default: () => <div data-testid="particles" />,
}));

test("reveals the home page when the final signature stroke finishes", () => {
  const { container } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const app = container.querySelector(".App");
  const strokes = container.querySelectorAll(".home-signature path");
  fireEvent.animationEnd(strokes[0]);
  expect(app).toHaveClass("intro-drawing");
  fireEvent.animationEnd(strokes[1]);
  expect(app).not.toHaveClass("intro-drawing");
  expect(
    screen.getByRole("heading", { name: "Kishan Manoharan" })
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "My work" })).toHaveAttribute(
    "href",
    "/projects"
  );
});
