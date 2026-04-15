import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { Lock, User, LogIn, AlertCircle } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // --- LOGIC CHẶN VÀO LẠI LOGIN ---
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/admin', { replace: true }); // Nếu đã login, đẩy thẳng sang admin
    }
  }, [navigate]);
  // --------------------------------

  const ADMIN_USER = "admin";
  const ADMIN_PASSWORD_HASH = "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92";

  const handleLogin = (e) => {
    e.preventDefault();
    const hashedPassword = CryptoJS.SHA256(password).toString();

    if (username === ADMIN_USER && hashedPassword === ADMIN_PASSWORD_HASH) {
      localStorage.setItem('token', 'authenticated_session_' + Date.now());
      navigate('/admin');
    } else {
      setError('Sai tài khoản hoặc mật khẩu!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[2rem] shadow-xl border border-slate-100 p-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl mb-4">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">ADMIN LOGIN</h1>
          <p className="text-slate-500 text-sm mt-2">Vui lòng đăng nhập để quản lý dự án</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium flex items-center gap-2 animate-shake">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Tài khoản</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 pl-12 pr-4 py-3.5 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                placeholder="Tên đăng nhập"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 pl-12 pr-4 py-3.5 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <LogIn size={20} /> Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;