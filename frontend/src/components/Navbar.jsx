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
      <h2 style={styles.logo}>Blogify</h2>

      <div>
        <Link to="/blogs" style={styles.link}>Blogs</Link>

        {token ? (
          <button onClick={handleLogout} style={styles.logout}>
            Logout
          </button>
        ) : (
          <Link to="/login" style={styles.link}>Login</Link>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    width: '100%',              // ✅ THIS FIXES IT
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 40px',
    background: '#0f172a',
    color: '#fff',
    boxSizing: 'border-box',    // ✅ VERY IMPORTANT
  },
  logo: {
    margin: 0,
  },
  link: {
    color: '#fff',
    marginRight: '20px',
    textDecoration: 'none',
  },
  logout: {
    background: '#ef4444',
    border: 'none',
    padding: '8px 14px',
    color: '#fff',
    cursor: 'pointer',
    borderRadius: '6px',
  },
};


export default Navbar;
