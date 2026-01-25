import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllBlogs } from '../api/blogs';
import Navbar from '../components/Navbar';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getAllBlogs();
        setBlogs(data);
      } catch (err) {
        console.error(err);
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
        {/* 🔥 HERO SECTION */}
        <div style={styles.hero}>
          <h1 style={styles.heroTitle} className="gradient-text">
            Discover Stories
          </h1>
          <p style={styles.heroSub}>
            Read thoughts, ideas and experiences shared by creators.
          </p>
        </div>

        {/* ⏳ LOADING */}
        {loading && (
          <p style={{ textAlign: 'center', opacity: 0.6 }}>
            Loading amazing content...
          </p>
        )}

        {/* ✍️ EMPTY STATE */}
        {!loading && blogs.length === 0 && (
          <div style={styles.empty}>
            <h2>No blogs yet ✍️</h2>
            <p>Be the first one to write something memorable.</p>
          </div>
        )}

        {/* ✨ BLOG CARDS */}
        <div style={styles.grid}>
          {blogs.map((blog, index) => (
            <div
              key={blog._id}
              style={{
                ...styles.card,
                animationDelay: `${index * 0.1}s`,
              }}
              onClick={() => navigate(`/blogs/${blog._id}`)}
            >
              <div style={styles.cardGlow}></div>

              <h3 style={styles.title}>{blog.title}</h3>
              <p style={styles.content}>
                {blog.content.length > 140
                  ? blog.content.slice(0, 140) + '...'
                  : blog.content}
              </p>

              <span style={styles.read}>Read full story →</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    padding: '50px',
    background:
      'radial-gradient(circle at top, #0f172a, #020617)',
    color: '#fff',
  },

  /* HERO */
  hero: {
    textAlign: 'center',
    marginBottom: '60px',
  },
  heroTitle: {
    fontSize: '48px',
    marginBottom: '12px',
    letterSpacing: '1px',
  },
  heroSub: {
    fontSize: '16px',
    color: '#94a3b8',
  },

  /* GRID */
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '28px',
  },

  /* CARD */
  card: {
    position: 'relative',
    padding: '26px',
    borderRadius: '18px',
    background: 'rgba(255,255,255,0.06)',
    backdropFilter: 'blur(12px)',
    cursor: 'pointer',
    overflow: 'hidden',
    animation: 'floatUp 0.8s ease forwards',
    opacity: 0,
    transition: 'transform 0.4s ease',
  },
  cardGlow: {
    position: 'absolute',
    inset: 0,
    borderRadius: '18px',
    background:
      'linear-gradient(120deg, transparent, rgba(96,165,250,0.15), transparent)',
    opacity: 0,
    transition: 'opacity 0.4s ease',
  },

  title: {
    fontSize: '20px',
    marginBottom: '12px',
  },
  content: {
    fontSize: '14px',
    color: '#cbd5f5',
    lineHeight: '1.6',
    marginBottom: '18px',
  },
  read: {
    fontSize: '13px',
    color: '#60a5fa',
    fontWeight: '600',
  },

  empty: {
    textAlign: 'center',
    color: '#94a3b8',
  },
};

export default Blogs;
