const API_URL = 'http://localhost:5000/api/blogs';

export const fetchBlogs = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch blogs');
  }

  return data.blogs;
};
