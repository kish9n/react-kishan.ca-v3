import { useRef, useState, type FormEvent } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import emailjs from "@emailjs/browser";

type Delivery = "idle" | "sending" | "sent" | "failed";

export const Contact = () => {
  const [delivery, setDelivery] = useState<Delivery>("idle");
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
      setDelivery("sent");
    } catch {
      setDelivery("failed");
    } finally {
      inFlight.current = false;
    }
  }

  return (
    <>
      <Container fluid className="App-header">
        <Container className="title title-pad-1">
          <h1>Contact</h1>
          <p>You can reach me here!</p>
        </Container>
        <Container className="title-pad-0">
          <Form onSubmit={submitForm} onChange={(event) => {
            const field = event.target;
            if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
              field.setCustomValidity("");
            }
            setDelivery("idle");
          }}>
            <fieldset disabled={delivery === "sending"}>
              <Row>
                <Col lg={4}>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" autoComplete="name" required />
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control name="email" type="email" autoComplete="email" required />
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <Form.Group className="mb-3" controlId="formReason">
                    <Form.Label>Reason (optional)</Form.Label>
                    <Form.Control name="reason" />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3" controlId="formDetails">
                <Form.Label>Message</Form.Label>
                <Form.Control name="details" as="textarea" rows={3} required />
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
        </Container>
        <Container className="title-pad-0">
          <Row>
            <Col className="p-3 m-2 grey">
              <Row>
                <Col>
                  <h5>Download my contact card (vCard)</h5>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button href="/vcard.vcf">vCard</Button>
                </Col>
              </Row>
            </Col>
            <Col className="p-3 m-2 grey">
              <Row>
                <Col>
                  <h5>You can also reach out to me through</h5>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button href="mailto:kishan@kishanm.ca">Email</Button>
                  <Button href="https://github.com/kish9n">GitHub</Button>
                  <Button href="https://www.linkedin.com/in/kishan-manoharan-333464195/">
                    LinkedIn
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};
