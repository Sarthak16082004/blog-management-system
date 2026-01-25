import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo} onClick={() => navigate('/blogs')}>
        Blogify
      </h2>

      <div style={styles.actions}>
        <Link to="/blogs" style={styles.link}>
          Blogs
        </Link>

        {token && (
          <Link to="/create-blog" style={styles.create}>
            + Create Blog
          </Link>
        )}

        {token ? (
          <button onClick={handleLogout} style={styles.logout}>
            Logout
          </button>
        ) : (
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 40px',
    background: '#0f172a',
    color: '#fff',
    boxSizing: 'border-box',
  },
  logo: {
    cursor: 'pointer',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
  },
  link: {
    color: '#e5e7eb',
    textDecoration: 'none',
    fontSize: '14px',
  },
  create: {
    padding: '8px 14px',
    background: '#22c55e',
    color: '#000',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '600',
  },
  logout: {
    background: '#ef4444',
    color: '#fff',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default Navbar;
