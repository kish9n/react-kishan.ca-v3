import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import emailjs from "@emailjs/browser";
import { beforeEach, expect, test, vi } from "vitest";
import { Contact } from "./Contact";

vi.mock("@emailjs/browser", () => ({ default: { send: vi.fn() } }));
const send = vi.mocked(emailjs.send);

beforeEach(() => {
  send.mockReset();
  vi.stubEnv("VITE_EMAIL_SERVICE_ID", "test-service");
  vi.stubEnv("VITE_EMAIL_TEMPLATE_ID", "test-template");
  vi.stubEnv("VITE_EMAIL_PUBLIC_KEY", "test-key");
});

function fillForm() {
  fireEvent.change(screen.getByLabelText("Name"), { target: { value: " Visitor " } });
  fireEvent.change(screen.getByLabelText("Email"), { target: { value: "visitor@example.org" } });
  fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Hello!" } });
}

test("requires a name, valid email and a nonblank message", async () => {
  const user = userEvent.setup();
  render(<Contact />);
  const submit = screen.getByRole("button", { name: "Send message" });
  await user.click(submit);
  expect(screen.getByLabelText("Name")).toBeInvalid();
  fillForm();
  fireEvent.change(screen.getByLabelText("Email"), { target: { value: "invalid" } });
  await user.click(submit);
  expect(screen.getByLabelText("Email")).toBeInvalid();
  fireEvent.change(screen.getByLabelText("Email"), { target: { value: "v@example.org" } });
  fireEvent.change(screen.getByLabelText("Message"), { target: { value: "   " } });
  await user.click(submit);
  expect(screen.getByLabelText("Message")).toBeInvalid();
  expect(send).not.toHaveBeenCalled();
});

test("sends once, disables repeat submissions, and clears the form on success", async () => {
  const user = userEvent.setup();
  let finish!: () => void;
  send.mockImplementation(() => new Promise(resolve => {
    finish = () => resolve({ status: 200, text: "OK" });
  }));
  render(<Contact />);
  fillForm();
  await user.click(screen.getByLabelText("Name"));
  await user.keyboard("{Enter}");
  const busy = screen.getByRole("button", { name: "Sending…" });
  expect(busy).toBeDisabled();
  fireEvent.submit(busy.closest("form")!);
  expect(send).toHaveBeenCalledTimes(1);
  expect(send).toHaveBeenCalledWith("test-service", "test-template", {
    name: "Visitor", email: "visitor@example.org", reason: "", details: "Hello!",
  }, "test-key");
  await act(async () => finish());
  expect(screen.getByRole("status")).toHaveTextContent("Message sent!");
  expect(screen.getByLabelText("Message")).toHaveValue("");
});

test("preserves the draft after a failure and allows a retry", async () => {
  const user = userEvent.setup();
  send.mockRejectedValueOnce(new Error("Unavailable")).mockResolvedValueOnce({ status: 200, text: "OK" });
  render(<Contact />);
  fillForm();
  const submit = screen.getByRole("button", { name: "Send message" });
  await user.click(submit);
  expect(screen.getByRole("alert")).toHaveTextContent("Try again");
  expect(screen.getByRole("link", { name: "email me directly" })).toHaveAttribute("href", "mailto:kishan@kishanm.ca");
  expect(screen.getByLabelText("Message")).toHaveValue("Hello!");
  await user.click(submit);
  expect(send).toHaveBeenCalledTimes(2);
  expect(screen.getByRole("status")).toHaveTextContent("Message sent!");
});
