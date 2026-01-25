import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserIdFromToken } from '../utils/auth';

const SingleBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = getUserIdFromToken();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/blogs/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setBlog(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    const confirm = window.confirm('Delete this blog?');
    if (!confirm) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      navigate('/blogs');
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p style={styles.center}>Loading...</p>;
  if (error) return <p style={{ ...styles.center, color: 'red' }}>{error}</p>;

  const isOwner = userId === blog.authorId;

  return (
    <div style={styles.page}>
      <button onClick={() => navigate(-1)} style={styles.back}>
        ← Back
      </button>

      <h1 style={styles.title}>{blog.title}</h1>
      <p style={styles.content}>{blog.content}</p>

      {isOwner && (
        <div style={styles.actions}>
          <button
            onClick={() => navigate(`/edit-blog/${id}`)}
            style={styles.edit}
          >
            Edit
          </button>

          <button onClick={handleDelete} style={styles.delete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  page: {
    padding: '40px',
    minHeight: '100vh',
    background: '#0b0f19',
    color: '#fff',
  },
  back: {
    marginBottom: '20px',
    background: 'none',
    color: '#60a5fa',
    border: 'none',
    cursor: 'pointer',
  },
  title: {
    fontSize: '36px',
    marginBottom: '20px',
  },
  content: {
    fontSize: '18px',
    lineHeight: '1.7',
    color: '#d1d5db',
    maxWidth: '800px',
  },
  actions: {
    marginTop: '30px',
    display: 'flex',
    gap: '15px',
  },
  edit: {
    background: '#2563eb',
    color: '#fff',
    padding: '10px 18px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  delete: {
    background: '#ef4444',
    color: '#fff',
    padding: '10px 18px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  center: {
    textAlign: 'center',
    marginTop: '80px',
  },
};

export default SingleBlog;
