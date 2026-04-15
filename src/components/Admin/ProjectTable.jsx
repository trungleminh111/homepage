import React, { useEffect, useState } from 'react';
import { ProjectService } from '../../Services/api';
import { Edit2, Trash2, RefreshCw, Plus, Image as ImageIcon } from 'lucide-react';

const ProjectTable = ({ onEdit, onAddNew }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await ProjectService.getAll();
      setProjects(res.data || []);
    } catch (err) {
      console.error("Lỗi lấy danh sách:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Xóa dự án này nhé?")) {
      try {
        await ProjectService.delete(id);
        setProjects(projects.filter(p => (p._id || p.id) !== id));
      } catch (err) {
        alert("Lỗi xóa rồi!");
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl lg:rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">

      {/* HEADER */}
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-slate-50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-slate-50/30">
        
        <div>
          <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
            DỰ ÁN CỦA TÔI
          </h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
            Tổng cộng: {projects.length} dự án
          </p>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={fetchProjects} 
            className="p-2.5 text-slate-400 hover:text-blue-600 transition-all"
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          </button>

          <button 
            onClick={onAddNew}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-blue-100 transition-all"
          >
            <Plus size={16} /> THÊM
          </button>
        </div>
      </div>

      {/* MOBILE VIEW (CARD) */}
      <div className="lg:hidden p-4 space-y-4">
        {loading ? (
          <p className="text-center text-slate-400">Đang tải...</p>
        ) : projects.length === 0 ? (
          <p className="text-center text-slate-400">Chưa có dự án nào!</p>
        ) : (
          projects.map((item) => (
            <div key={item._id || item.id} className="border border-slate-100 rounded-xl p-4 shadow-sm">
              
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                  {item.upload_preset ? (
                    <img src={item.upload_preset} className="w-full h-full object-cover" alt="" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <ImageIcon size={18}/>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <p className="font-bold text-slate-900 text-sm">
                    {item.Name}
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                {item.short_description}
              </p>

              <div className="flex justify-end gap-2">
                <button 
                  onClick={() => onEdit(item)}
                  className="p-2 text-slate-400 hover:text-blue-600"
                >
                  <Edit2 size={18} />
                </button>

                <button 
                  onClick={() => handleDelete(item._id || item.id)}
                  className="p-2 text-slate-400 hover:text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </div>

            </div>
          ))
        )}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Dự án</th>
              <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Mô tả</th>
              <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Thao tác</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {loading ? (
              <tr>
                <td colSpan="3" className="px-8 py-10 text-center text-slate-400">
                  Đang tải dữ liệu...
                </td>
              </tr>
            ) : projects.map((item) => (
              <tr key={item._id || item.id} className="hover:bg-slate-50/50 transition-colors">
                
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden">
                      {item.upload_preset ? (
                        <img src={item.upload_preset} className="w-full h-full object-cover" alt="" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                          <ImageIcon size={20}/>
                        </div>
                      )}
                    </div>
                    <span className="font-bold text-slate-900">{item.Name}</span>
                  </div>
                </td>

                <td className="px-8 py-5 text-sm text-slate-500 max-w-xs truncate">
                  {item.short_description}
                </td>

                <td className="px-8 py-5 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => onEdit(item)}
                      className="p-2.5 text-slate-400 hover:text-blue-600"
                    >
                      <Edit2 size={18} />
                    </button>

                    <button 
                      onClick={() => handleDelete(item._id || item.id)}
                      className="p-2.5 text-slate-400 hover:text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default ProjectTable;