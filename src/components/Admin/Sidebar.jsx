import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderPlus, 
  MessageSquare, 
  LogOut, 
  ExternalLink,
  Settings
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const menu = [
    { id: 'projects', icon: <FolderPlus size={20} />, label: 'Dự án' },
    { id: 'contacts', icon: <MessageSquare size={20} />, label: 'Liên hệ' },
  ];

  const handleLogout = () => {
    // Xóa token khỏi localStorage
    localStorage.removeItem('token');
    // Đẩy về trang login và xóa lịch sử hướng trang (replace)
    navigate('/', { replace: true });
  };

  return (
    <aside className="w-72 bg-slate-950 text-white p-6 flex flex-col h-screen sticky top-0 border-r border-slate-800/50 transition-all">
      {/* LOGO SECTION */}
      <div className="mb-10 px-2 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-2xl flex items-center justify-center font-bold shadow-lg shadow-blue-500/20">
          T
        </div>
        <span className="text-xl font-black tracking-tighter uppercase italic">Techworld admin</span>
      </div>
      
      {/* MAIN NAV */}
      <nav className="space-y-2 flex-1">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4 mb-4">Menu chính</p>
        {menu.map((item) => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-4 w-full p-4 rounded-2xl font-bold transition-all duration-200 group ${
              activeTab === item.id 
                ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30' 
                : 'text-slate-500 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <span className={`${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'} transition-transform`}>
              {item.icon}
            </span> 
            {item.label}
          </button>
        ))}
      </nav>

      {/* FOOTER SECTION (View Site & Logout) */}
      <div className="pt-6 border-t border-slate-800 space-y-2">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4 mb-2">Hệ thống</p>
        
        {/* VIEW SITE BUTTON */}
        <Link 
          to="/" 
          target="_blank"
          className="flex items-center gap-4 w-full p-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-900 hover:text-cyan-400 transition-all group"
        >
          <ExternalLink size={20} className="group-hover:rotate-12 transition-transform" />
          <span>Xem trang chủ</span>
        </Link>

        {/* LOGOUT BUTTON */}
        <button 
          onClick={handleLogout}
          className="flex items-center gap-4 w-full p-4 rounded-2xl font-bold text-slate-500 hover:bg-red-500/10 hover:text-red-500 transition-all group"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;