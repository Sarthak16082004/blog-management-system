import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await fetch(`http://localhost:5000/api/blogs/${id}`);
      const data = await res.json();
      setTitle(data.title);
      setContent(data.content);
    };
    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content }),
    });

    const data = await res.json();
    if (!res.ok) return alert(data.message);

    navigate(`/blogs/${id}`);
  };

  return (
    <div style={styles.page}>
      <h1>Edit Blog</h1>

      <form onSubmit={handleUpdate} style={styles.form}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={styles.textarea}
        />

        <button style={styles.button}>Update</button>
      </form>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    padding: '40px',
    background: '#0b0f19',
    color: '#fff',
  },
  form: {
    maxWidth: '600px',
    marginTop: '30px',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '16px',
  },
  textarea: {
    width: '100%',
    height: '200px',
    padding: '12px',
    marginBottom: '16px',
  },
  button: {
    padding: '10px 18px',
    background: '#22c55e',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default EditBlog;
