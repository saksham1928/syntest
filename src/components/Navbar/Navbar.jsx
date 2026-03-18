import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1>SYNTRIX</h1>
        </div>
        <ul className="navbar-menu">
          <li>
            <a href="#dashboard" className="navbar-link">Dashboard</a>
          </li>
          <li>
            <a href="#mycourses" className="navbar-link">My Courses</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
