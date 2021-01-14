import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, Button, Input, Navbar as RSNavbar, NavbarBrand, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label } from 'reactstrap';

const NavbarComponent = () => (
  <RSNavbar light expand="md" className="navbar sticky-top">
    <Container>
      <NavbarBrand href="/" className="font-weight-bold text-primary" style={{ fontSize: '1.5rem' }}>
        Flyingo
      </NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="/flights">Flights</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/bookings">My Bookings</NavLink>
        </NavItem>
      </Nav>
    </Container>
  </RSNavbar>
);

const Hero = () => (
  <section className="hero-section">
    <Container>
      <h1 className="display-4 font-weight-bold mb-4">Find Your Next Adventure</h1>
      <p className="lead mb-0">Discover the world with Flyingo's seamless flight booking experience.</p>
    </Container>
  </section>
);

const SearchBar = ({ onSearch }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  return (
    <Container className="search-container">
      <Row className="align-items-end">
        <Col md={5} className="mb-3 mb-md-0">
          <label className="text-muted small font-weight-bold">DEPART FROM</label>
          <Input 
            type="text" 
            placeholder="City or Airport" 
            value={from} 
            onChange={(e) => setFrom(e.target.value)}
            className="border-0 bg-light"
            style={{ borderRadius: '0.75rem', height: '3.5rem' }}
          />
        </Col>
        <Col md={5} className="mb-3 mb-md-0">
          <label className="text-muted small font-weight-bold">DESTINATION</label>
          <Input 
            type="text" 
            placeholder="Where to?" 
            value={to} 
            onChange={(e) => setTo(e.target.value)}
            className="border-0 bg-light"
            style={{ borderRadius: '0.75rem', height: '3.5rem' }}
          />
        </Col>
        <Col md={2}>
          <Button color="primary" block className="h-100" style={{ height: '3.5rem', borderRadius: '0.75rem' }} onClick={() => onSearch({ from, to })}>
            Search
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

const FlightCard = ({ flight, onBook }) => (
  <Card className="flight-card mb-4 border-0">
    <CardBody className="p-4">
      <Row className="align-items-center">
        <Col md={3}>
          <h5 className="mb-1 font-weight-bold">{flight.airline}</h5>
          <span className="text-muted small">{flight.flightNumber}</span>
        </Col>
        <Col md={6}>
          <Row className="text-center align-items-center">
            <Col>
              <h4 className="mb-0 font-weight-bold">{new Date(flight.departure.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h4>
              <div className="text-muted small">{flight.departure.city} ({flight.departure.airport})</div>
            </Col>
            <Col xs="auto">
              <div className="text-primary" style={{ fontSize: '1.2rem' }}>✈</div>
              <div style={{ borderTop: '2px dashed #e2e8f0', width: '50px', margin: '0 auto' }}></div>
            </Col>
            <Col>
              <h4 className="mb-0 font-weight-bold">{new Date(flight.arrival.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h4>
              <div className="text-muted small">{flight.arrival.city} ({flight.arrival.airport})</div>
            </Col>
          </Row>
        </Col>
        <Col md={3} className="text-md-right mt-3 mt-md-0">
          <h3 className="text-primary font-weight-bold mb-2">${flight.price}</h3>
          <Button color="primary" outline size="sm" style={{ borderRadius: '0.5rem' }} onClick={() => onBook(flight)}>Book Now</Button>
        </Col>
      </Row>
    </CardBody>
  </Card>
);

const App = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [modal, setModal] = useState(false);
  const [bookingName, setBookingName] = useState('');

  const toggleModal = () => setModal(!modal);

  useEffect(() => {
    fetch('/api/flights')
      .then(res => res.json())
      .then(json => {
        if (json.success) setFlights(json.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleBook = (flight) => {
    setSelectedFlight(flight);
    toggleModal();
  };

  const confirmBooking = () => {
    fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        flightId: selectedFlight._id,
        userId: '600a0a0a0a0a0a0a0a0a0a0a', // Mock User ID
        seatNumber: '12A'
      })
    })
    .then(res => res.json())
    .then(json => {
      if (json.success) {
        alert('Booking confirmed!');
        toggleModal();
      }
    });
  };

  return (
    <div className="pb-5">
      <NavbarComponent />
      <Hero />
      <SearchBar onSearch={(q) => console.log(q)} />
      
      <Container className="mt-5 pt-4">
        <h3 className="mb-4 font-weight-bold">Available Flights</h3>
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <Row>
            <Col lg={10} className="mx-auto">
              {flights.map(flight => <FlightCard key={flight._id} flight={flight} onBook={handleBook} />)}
            </Col>
          </Row>
        )}
      </Container>

      <Modal isOpen={modal} toggle={toggleModal} centered>
        <ModalHeader toggle={toggleModal} className="border-0 pb-0">Confirm Booking</ModalHeader>
        <ModalBody>
          {selectedFlight && (
            <div>
              <p>You are booking <strong>{selectedFlight.airline} {selectedFlight.flightNumber}</strong></p>
              <p className="text-muted small">From {selectedFlight.departure.city} to {selectedFlight.arrival.city}</p>
              <FormGroup>
                <Label for="passengerName">Passenger Name</Label>
                <Input 
                  type="text" 
                  id="passengerName" 
                  value={bookingName} 
                  onChange={(e) => setBookingName(e.target.value)} 
                  placeholder="Enter full name"
                />
              </FormGroup>
            </div>
          )}
        </ModalBody>
        <ModalFooter className="border-0 pt-0">
          <Button color="secondary" outline onClick={toggleModal}>Cancel</Button>
          <Button color="primary" onClick={confirmBooking}>Confirm Booking</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default App;
