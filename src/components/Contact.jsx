import { useForm, ValidationError } from '@formspree/react';
import { useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function ContactForm() {
  const [state, handleSubmit] = useForm("xnnveoel");
  const formRef = useRef();

  useEffect(() => {
    if (state.succeeded) {
      Swal.fire({
        title: '¡Enviado!',
        text: '¡Gracias por tu consulta! Nos pondremos en contacto contigo en breve.',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      formRef.current.reset();
    }
  }, 
  [state.succeeded]);
  
  return (
    <Container className="my-5" style={{ maxWidth: '600px' }}>
      <h2>Contacto</h2>
      <p>¿Tienes alguna consulta? Envíanos un mensaje.</p>
      
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="contact-name">
          <Form.Label>Nombre Completo</Form.Label>
          <Form.Control
            type="text" 
            name="name"
            placeholder="Escribe tu nombre"
            required 
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="contact-email">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control
            type="email" 
            name="email"
            placeholder="tu@email.com"
            required
          />
          <ValidationError 
            prefix="Email" 
            field="email"
            errors={state.errors}
            className="text-danger"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="contact-message">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="message"
            placeholder="Escribe tu mensaje aquí"
            required
          />
          <ValidationError 
            prefix="Message" 
            field="message"
            errors={state.errors}
            className="text-danger"
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={state.submitting}>
          {state.submitting ? 'Enviando...' : 'Enviar Mensaje'}
        </Button>
      </Form>
    </Container>
  );
}

export default ContactForm;