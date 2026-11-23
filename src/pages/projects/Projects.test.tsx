import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Projects } from "./Projects";
import screenshot from "../../img/peopleplanner.PNG?url";

test("offers a direct source or screenshot for each featured project", () => {
  render(<Projects />);
  for (const [name, href] of [
    ["View source for Ambient Spotify", "https://github.com/kish9n/ambient-spotify-static"],
    ["View source for Simple Stats V2", "https://github.com/kish9n/SimpleStats"],
    ["View screenshot for People Planner", screenshot],
    ["View source for Minimal Mini Spotify", "https://github.com/kish9n/minimal-mini-spotify"],
  ]) {
    expect(screen.getByRole("link", { name })).toHaveAttribute("href", href);
  }
});
