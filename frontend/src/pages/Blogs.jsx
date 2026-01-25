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
        setError(err.message);
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

        {loading && <p>Loading blogs...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {blogs.length === 0 && !loading && (
          <p>No blogs yet. Click “Create Blog” to write one ✍️</p>
        )}

        <div style={styles.grid}>
          {blogs.map((blog) => (
            <div
              key={blog._id}
              style={styles.card}
              onClick={() => navigate(`/blogs/${blog._id}`)}
            >
              <h3>{blog.title}</h3>
              <p>
                {blog.content.length > 100
                  ? blog.content.slice(0, 100) + '...'
                  : blog.content}
              </p>
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
    marginBottom: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  },
  card: {
    padding: '20px',
    borderRadius: '10px',
    background: 'rgba(255,255,255,0.08)',
    cursor: 'pointer',
  },
};

export default Blogs;
