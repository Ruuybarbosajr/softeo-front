import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


export default function Header() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/edit">Configuração</Nav.Link>
            <Button
              onClick={logout}
              variant="light"
            >
              Sair
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}