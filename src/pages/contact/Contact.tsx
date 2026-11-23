import { GlassLink } from "../../components/GlassLink";
import { useRef, useState, type FormEvent } from "react";
import { Alert, Container, Form } from "react-bootstrap";
import { Download, Envelope, Github, Linkedin } from "react-bootstrap-icons";
import { Button, Glass, Input } from "glisse";
import emailjs from "@emailjs/browser";

type Delivery = "idle" | "sending" | "sent" | "failed";

export const Contact = () => {
  const [delivery, setDelivery] = useState<Delivery>("idle");
  // Glisse inputs keep their own draft values. Remount them after a successful send.
  const [draftId, setDraftId] = useState(0);
  const inFlight = useRef(false);

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (inFlight.current || !form.reportValidity()) return;

    const data = new FormData(form);
    const message = Object.fromEntries(
      Array.from(data, ([key, value]) => [key, String(value).trim()])
    );
    if (!message.name || !message.details) {
      const field = form.elements.namedItem(!message.name ? "name" : "details") as HTMLInputElement | HTMLTextAreaElement;
      field.setCustomValidity("Please enter more than spaces.");
      field.reportValidity();
      return;
    }

    inFlight.current = true;
    setDelivery("sending");
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAIL_SERVICE_ID,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        message,
        import.meta.env.VITE_EMAIL_PUBLIC_KEY
      );
      form.reset();
      setDraftId(id => id + 1);
      setDelivery("sent");
    } catch {
      setDelivery("failed");
    } finally {
      inFlight.current = false;
    }
  }

  return (
    <Container className="App-header portfolio-page contact-page">
      <header className="page-heading">
        <h1>Contact</h1>
      </header>
      <div className="portfolio-columns">
        <section className="glass-panel section-enter" aria-labelledby="contact-message">
          <h2 id="contact-message">Send a message</h2>
          <Form onSubmit={submitForm} onChange={(event) => {
            const field = event.target;
            if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
              field.setCustomValidity("");
            }
            setDelivery("idle");
          }}>
            <fieldset key={draftId} disabled={delivery === "sending"}>
              <div className="contact-fields">
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Input id="formName" name="name" autoComplete="name" required />
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Input id="formEmail" name="email" type="email" autoComplete="email" required />
                </Form.Group>
              </div>
              <Form.Group controlId="formReason">
                <Form.Label>Reason (optional)</Form.Label>
                <Input id="formReason" name="reason" />
              </Form.Group>
              <Form.Group controlId="formDetails">
                <Form.Label>Message</Form.Label>
                <Glass className="glass-message">
                  <textarea id="formDetails" name="details" rows={4} required />
                </Glass>
              </Form.Group>
              <Button type="submit" disabled={delivery === "sending"}>
                {delivery === "sending" ? "Sending…" : "Send message"}
              </Button>
            </fieldset>
          </Form>
          <div role="status" aria-live="polite">
            {delivery === "sending" && <span className="visually-hidden">Sending your message</span>}
            {delivery === "sent" && <p>Message sent!</p>}
          </div>
          {delivery === "failed" && (
            <Alert variant="danger">
              Your message couldn’t be sent. Try again or{" "}
              <a className="alert-link" href="mailto:kishan@kishanm.ca">email me directly</a>.
            </Alert>
          )}
        </section>
        <section className="glass-panel contact-links section-enter section-later" aria-labelledby="contact-links">
          <h2 id="contact-links">Contact details</h2>
          <ul>
            <li><a href="mailto:kishan@kishanm.ca"><Envelope aria-hidden="true" />kishan@kishanm.ca</a></li>
            <li><a href="https://github.com/kish9n"><Github aria-hidden="true" />GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/kishan-manoharan-333464195/"><Linkedin aria-hidden="true" />LinkedIn</a></li>
          </ul>
          <GlassLink href="/vcard.vcf" download><Download aria-hidden="true" />Save contact card</GlassLink>
        </section>
      </div>
    </Container>
  );
};
