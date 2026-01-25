import { useState, useEffect } from 'react';
import { loginUser } from '../api/auth';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);

  const navigate = useNavigate();

  // 🔥 React lifecycle animation
  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginUser(email, password);
      localStorage.setItem('token', data.token);
      navigate('/blogs');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div
        style={{
          ...styles.card,
          transform: animate ? 'scale(1)' : 'scale(0.9)',
          opacity: animate ? 1 : 0,
        }}
      >
        <h2 style={styles.title}>Welcome Back 👋</h2>
        <p style={styles.subtitle}>Login to your account</p>

        {error && (
          <div style={styles.errorBox}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? (
              <span style={styles.loader}></span>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <p style={styles.footer}>
          Don’t have an account?{' '}
          <Link to="/signup" style={styles.link}>
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background:
      'radial-gradient(circle at top, #4f46e5, #0f172a)',
  },
  card: {
    width: '360px',
    padding: '32px',
    borderRadius: '16px',
    background: 'rgba(255,255,255,0.12)',
    backdropFilter: 'blur(18px)',
    boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
    textAlign: 'center',
    transition: 'all 0.6s ease',
    color: '#fff',
  },
  title: {
    fontSize: '26px',
    marginBottom: '4px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#d1d5db',
    marginBottom: '24px',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '16px',
    borderRadius: '10px',
    border: 'none',
    outline: 'none',
    fontSize: '14px',
  },
  button: {
    width: '100%',
    height: '44px',
    borderRadius: '10px',
    border: 'none',
    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
    color: '#fff',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    marginTop: '18px',
    fontSize: '14px',
  },
  link: {
    color: '#facc15',
    textDecoration: 'none',
    fontWeight: '600',
  },
  errorBox: {
    background: 'rgba(255,0,0,0.15)',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '16px',
    fontSize: '13px',
    animation: 'fadeIn 0.4s ease',
  },
  loader: {
    width: '18px',
    height: '18px',
    border: '3px solid #fff',
    borderTop: '3px solid transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};

export default Login;
