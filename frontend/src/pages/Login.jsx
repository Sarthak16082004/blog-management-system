import { Link } from 'react-router-dom';
import { useState } from 'react';
import { loginUser } from '../api/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginUser(email, password);
      localStorage.setItem('token', data.token);
      alert('Login successful');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Login</h2>

        {error && <p style={styles.error}>{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p style={{ marginTop: '10px', fontSize: '14px' }}>
  Don’t have an account? <Link to="/signup">Signup</Link>
</p>

      </form>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f4f6f8',
  },
  form: {
    background: '#fff',
    padding: '30px',
    borderRadius: '8px',
    width: '300px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
  },
  button: {
    width: '100%',
    padding: '10px',
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontSize: '14px',
  },
};

export default Login;
