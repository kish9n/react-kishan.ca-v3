import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

Object.defineProperty(window, "matchMedia", {
  configurable: true,
  value: (media: string) => ({
    media, matches: false,
    addEventListener() {}, removeEventListener() {},
    addListener() {}, removeListener() {},
  }),
});

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
});
