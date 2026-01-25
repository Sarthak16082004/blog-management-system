import { useEffect, useState } from 'react';
import { fetchBlogs } from '../api/blogs';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await fetchBlogs();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h1 style={styles.heading}>All Blogs</h1>

        {loading && <p style={styles.center}>Loading blogs...</p>}
        {error && <p style={{ ...styles.center, color: 'red' }}>{error}</p>}

        {!loading && blogs.length === 0 && (
          <div style={styles.empty}>
            <h3>No blogs yet ✍️</h3>
            <p>Be the first one to write a blog.</p>
          </div>
        )}

        <div style={styles.grid}>
          {blogs.map((blog) => (
            <div key={blog._id} style={styles.card}>
              <h3>{blog.title}</h3>
              <p>{blog.content.slice(0, 120)}...</p>

              <Link to={`/blogs/${blog._id}`} style={styles.readMore}>
                Read more →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    maxWidth: '1100px',
    margin: '40px auto',
    padding: '0 20px',
  },
  heading: {
    marginBottom: '30px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  card: {
    background: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
  },
  readMore: {
    display: 'inline-block',
    marginTop: '10px',
    textDecoration: 'none',
    color: '#2563eb',
    fontWeight: '500',
  },
  center: {
    textAlign: 'center',
    marginTop: '40px',
  },
  empty: {
    textAlign: 'center',
    marginTop: '60px',
    color: '#555',
  },
};

export default Blogs;
