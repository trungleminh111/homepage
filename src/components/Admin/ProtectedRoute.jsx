import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // 1. Lấy token từ localStorage (hoặc Cookies/Redux)
  const token = localStorage.getItem('token');

  // 2. Kiểm tra: Nếu không có token -> Chuyển hướng về trang Login
  if (!token) {
    // replace: true giúp người dùng không thể nhấn "Back" quay lại trang Admin sau khi bị đuổi ra
    return <Navigate to="/login" replace />;
  }

  // 3. Nếu có token -> Cho phép hiển thị các component con (children)
  return children;
};

export default ProtectedRoute;