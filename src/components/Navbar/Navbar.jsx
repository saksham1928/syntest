import { Navbar, Container, Nav, Badge } from 'react-bootstrap';

function NavigationBar() {
  return (
    <Navbar bg="black" variant="dark" expand="lg" className="border-bottom border-secondary shadow-sm py-3">
      <Container fluid className="px-4">
        <Navbar.Brand href="#home" className="d-flex align-items-center fw-bold fs-4 text-primary tracking-wide">
          SYNTRIX 
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto fw-semibold">
            <Nav.Link href="#dashboard" className="active px-3 text-white">Dashboard</Nav.Link>
            <Nav.Link href="#courses" className="px-3 text-secondary hover-white">My Courses</Nav.Link>
            <Nav.Link href="#analytics" className="px-3 text-secondary hover-white">Focus Analytics</Nav.Link>
            <Nav.Link href="#profile" className="px-3 text-secondary hover-white">Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;