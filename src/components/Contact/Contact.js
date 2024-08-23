import React, { useRef, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TrackVisibility from 'react-on-screen';
import 'animate.css';
import emailjs from '@emailjs/browser';
import './Contact.css'; // Asegúrate de crear este archivo CSS

export const Contact = () => {
  const form = useRef();
  const [isEmailSent, setIsEmailSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_t8zrsoa', 'template_xifg0be', form.current, 'FcG5sp76sUwUcbNMs')
      .then((result) => {
        if (result.text === 'OK') {
          setIsEmailSent(true);
        }
      })
      .catch((error) => {
        console.log(error.text);
      });
  };

  return (
    <div className="containercon">
      <div className="blob-c">
        <div className="shape-blob"></div>
        <div className="shape-blob one"></div>
        <div className="shape-blob two"></div>
        <div className="shape-blob three"></div>
        <div className="shape-blob four"></div>
        <div className="shape-blob five"></div>
        <div className="shape-blob six"></div>
      </div>
      <section className="contact" id="connect">
        <Container>
          <Row className="align-items-center">
            <div className="shape-blob three"></div>
            <div className="shape-blob four"></div>
            <Col size={12} md={6}>
              <TrackVisibility>
                {({ isVisible }) =>
                  <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                    <h2>Get In Touch</h2>
                    <form ref={form} onSubmit={sendEmail}>
                      <Row>
                        <Col size={12} sm={6} className="px-1">
                          <input type="text" name="user_name" placeholder="Name" required />
                        </Col>
                        <Col size={12} sm={6} className="px-1">
                          <input type="email" name="user_email" placeholder="Email" required />
                        </Col>
                        <div className="shape-blob one"></div>
                        <div className="shape-blob two"></div>
                        <Col size={12} className="px-1">
                          <textarea name="message" placeholder="Message" required />
                          <button type="submit"><span>Send</span></button>
                          {isEmailSent && <div className="success-message">Message Sent Successfully!</div>}
                        </Col>
                      </Row>
                    </form>
                  </div>}
              </TrackVisibility>
            </Col>
            <Col size={12} md={6}>
        
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}
