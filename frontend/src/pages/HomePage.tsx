import { Link } from 'react-router-dom';

/**
 * HomePage component
 * Renders the main landing page of the application
 */
const HomePage = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">LinkTree Manager</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/#features">Features</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">Sign Up</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Log In</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" style={{ backgroundColor: '#4a90e2', color: 'white', padding: '50px 0', textAlign: 'center' }}>
        <div className="container">
          <h1>Manage Your Link Trees & Email Lists</h1>
          <p>Create and manage your LinkTrees, and organize your email lists easily with our tool.</p>
          <div className="cta-buttons" style={{ marginTop: '20px' }}>
            <Link to="/signup" className="btn btn-primary btn-lg" style={{ margin: '5px' }}>Get Started</Link>
            <Link to="/login" className="btn btn-outline-light btn-lg" style={{ margin: '5px' }}>Log In</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features" style={{ padding: '50px 0', textAlign: 'center' }}>
        <div className="container">
          <h2>Why Choose Us?</h2>
          <div className="row">
            <div className="col-md-4 feature" style={{ padding: '20px' }}>
              <i className="fas fa-link" style={{ fontSize: '3em', marginBottom: '15px' }}></i>
              <h3>Create LinkTrees
                <a href='/linktree/create'> Now</a>
              </h3>
              <p>Easily create and manage collections of links to share with your audience.</p>
            </div>
            <div className="col-md-4 feature" style={{ padding: '20px' }}>
              <i className="fas fa-envelope" style={{ fontSize: '3em', marginBottom: '15px' }}></i>
              <h3>Organize Email Lists</h3>
              <p>Build and manage email lists for your marketing campaigns or outreach.</p>
            </div>
            <div className="col-md-4 feature" style={{ padding: '20px' }}>
              <i className="fas fa-file-csv" style={{ fontSize: '3em', marginBottom: '15px' }}></i>
              <h3>Export Data</h3>
              <p>Export your email lists and other data as CSV files to use in your campaigns.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#333', color: 'white', padding: '20px', textAlign: 'center' }}>
        <div className="container">
          <p>© 2024 LinkTree Manager. All rights reserved. | <Link to="/privacy" style={{ color: '#4a90e2' }}>Privacy Policy</Link> | <Link to="/terms" style={{ color: '#4a90e2' }}>Terms of Service</Link></p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
