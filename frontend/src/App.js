import React from 'react';

const Navbar = () => (
  <nav>
    <h1>Flyingo</h1>
    <ul>
      <li>Flights</li>
      <li>My Bookings</li>
    </ul>
  </nav>
);

const Hero = () => (
  <section>
    <h2>Find Your Next Adventure</h2>
    <p>Search flights to destinations around the world.</p>
  </section>
);

const SearchBar = () => (
  <div>
    <input type="text" placeholder="From" />
    <input type="text" placeholder="To" />
    <button>Search</button>
  </div>
);

const FlightList = () => (
  <div>
    <h3>Available Flights</h3>
    <p>Loading flights...</p>
  </div>
);

const App = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <SearchBar />
      <FlightList />
    </div>
  );
};

export default App;
