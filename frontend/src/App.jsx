import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Blogs from './pages/Blogs';
import SingleBlog from './pages/SingleBlog';
import CreateBlog from './pages/CreateBlog';
import EditBlog from './pages/EditBlog';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<SingleBlog />} />

        {/* 🔒 PROTECTED ROUTES */}
        <Route
          path="/create-blog"
          element={
            <ProtectedRoute>
              <CreateBlog />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-blog/:id"
          element={
            <ProtectedRoute>
              <EditBlog />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/blogs" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
