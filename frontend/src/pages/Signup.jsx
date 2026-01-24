import { useState } from 'react';
import { signupUser } from '../api/auth';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signupUser(name, email, password);
      alert('Signup successful. Please login.');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Signup</h2>

        {error && <p style={styles.error}>{error}</p>}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />

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
          {loading ? 'Signing up...' : 'Signup'}
        </button>

        <p style={styles.text}>
          Already have an account? <Link to="/login">Login</Link>
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
    background: '#16a34a',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontSize: '14px',
  },
  text: {
    marginTop: '10px',
    fontSize: '14px',
  },
};

export default Signup;
