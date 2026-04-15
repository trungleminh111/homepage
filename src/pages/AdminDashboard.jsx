import React, { useState,useEffect } from 'react';
import Sidebar from '../Components/Admin/Sidebar';
import ProjectTable from '../Components/Admin/ProjectTable';
import ContactTable from '../Components/Admin/ContactTable';
import ProjectModal from '../Components/Admin/ProjectModal';
import { Bell, Settings } from 'lucide-react';

import { useNavigate } from 'react-router-dom';     // Và đảm bảo có useNavigate

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // Để force load lại bảng

  // Hàm mở để Thêm mới
  const handleAddNew = () => {
    setSelectedProject(null); // Xóa trắng dữ liệu cũ để Form trống
    setShowModal(true);
  };

  // Hàm mở để Chỉnh sửa
  const handleEdit = (project) => {
    setSelectedProject(project); // Đổ dữ liệu project vào state
    setShowModal(true);
  };

  // Hàm load lại dữ liệu sau khi Save thành công
  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Nếu không có vé, đuổi thẳng cổ về trang login
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  // Nếu chưa có token thì trả về null (trang trắng tạm thời) 
  // để tránh hiện giao diện Admin lên rồi mới chuyển hướng (trông bị giật)
  if (!localStorage.getItem('token')) return null;
  return (
    <div className="flex min-h-screen bg-[#f1f5f9]">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
        {/* TOP BAR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight capitalize">
            {activeTab === 'projects' ? 'Project Hub' : 'Leads Inbox'}
          </h1>
          <div className="flex items-center gap-4">
            <button className="p-3 bg-white rounded-2xl shadow-sm text-slate-400 hover:text-blue-600 transition-all"><Bell size={20}/></button>
            <button className="p-3 bg-white rounded-2xl shadow-sm text-slate-400 hover:text-blue-600 transition-all"><Settings size={20}/></button>
          </div>
        </div>

        {/* NỘI DUNG THAY ĐỔI THEO TAB */}
        {activeTab === 'projects' ? (
          <ProjectTable 
            key={refreshKey} // Khi refreshKey thay đổi, bảng tự load lại API
            onAddNew={handleAddNew} 
            onEdit={handleEdit} 
          />
        ) : (
          <ContactTable />
        )}
      </main>

      {/* MODAL: Truyền đầy đủ 4 props quan trọng */}
      <ProjectModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        project={selectedProject}
        onRefresh={handleRefresh}
      />
    </div>
  );
};

export default AdminDashboard;