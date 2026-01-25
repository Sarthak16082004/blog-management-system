import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllBlogs } from '../api/blogs';
import Navbar from '../components/Navbar';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getAllBlogs();
        setBlogs(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <Navbar />

      <div style={styles.page}>
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
          {blogs.map((blog, index) => (
            <div
              key={blog._id}
              onClick={() => navigate(`/blogs/${blog._id}`)}
              style={{
                ...styles.card,
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <h3 style={styles.title}>{blog.title}</h3>
              <p style={styles.content}>
                {blog.content.length > 120
                  ? blog.content.slice(0, 120) + '...'
                  : blog.content}
              </p>
              <span style={styles.read}>Read more →</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const styles = {
  page: {
    padding: '40px',
    minHeight: '100vh',
    background: '#0b0f19',
    color: '#fff',
  },
  heading: {
    fontSize: '32px',
    marginBottom: '30px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  },
  card: {
    padding: '20px',
    borderRadius: '14px',
    background: 'rgba(255,255,255,0.08)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
    cursor: 'pointer',
    animation: 'fadeUp 0.6s ease forwards',
    opacity: 0,
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  title: {
    fontSize: '18px',
    marginBottom: '10px',
  },
  content: {
    fontSize: '14px',
    color: '#d1d5db',
    marginBottom: '12px',
  },
  read: {
    fontSize: '13px',
    color: '#60a5fa',
    fontWeight: 'bold',
  },
  center: {
    textAlign: 'center',
    marginTop: '40px',
  },
  empty: {
    textAlign: 'center',
    marginTop: '60px',
    color: '#9ca3af',
  },
};

export default Blogs;
