import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { Projects } from "./Projects";
import screenshot from "../../img/peopleplanner.PNG?url";

// jsdom does not dispatch the CSS transition events that release Swiper's loop lock.
vi.mock("../../useReducedMotion", () => ({ useReducedMotion: () => true }));

test("offers each project's link and wraps in both directions", async () => {
  // Swiper needs a measured viewport to compute slide positions in jsdom.
  const width = vi.spyOn(Element.prototype, "clientWidth", "get").mockReturnValue(640);
  try {
    render(<Projects />);
    for (const [name, action, href] of [
      ["Ambient Spotify", "View source", "https://github.com/kish9n/ambient-spotify-static"],
      ["Simple Stats V2", "View source", "https://github.com/kish9n/SimpleStats"],
      ["People Planner", "View screenshot", screenshot],
      ["Minimal Mini Spotify", "View source", "https://github.com/kish9n/minimal-mini-spotify"],
    ]) {
      const dot = screen.getByRole("button", { name: `Show ${name}` });
      fireEvent.click(dot);
      await waitFor(() => expect(dot).toHaveAttribute("aria-current", "true"));
      expect(screen.getByRole("heading", { name })).toBeVisible();
      expect(screen.getByRole("link", { name: `${action} for ${name}` })).toHaveAttribute("href", href);
    }

    fireEvent.click(screen.getByRole("button", { name: "Next project" }));
    expect(screen.getByRole("button", { name: "Show Ambient Spotify" })).toHaveAttribute("aria-current", "true");
    fireEvent.click(screen.getByRole("button", { name: "Previous project" }));
    expect(screen.getByRole("button", { name: "Show Minimal Mini Spotify" })).toHaveAttribute("aria-current", "true");
  } finally {
    width.mockRestore();
  }
});
