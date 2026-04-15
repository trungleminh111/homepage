import React, { useEffect, useState } from 'react';
import { Phone, Mail, Trash2, MessageSquare, Loader2, Inbox } from 'lucide-react';
import { ContactService } from '../../Services/api'; // Đảm bảo đường dẫn này đúng

const ContactTable = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- HÀM LẤY DATA TỪ MENDIX ---
  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await ContactService.getAll();
      // Mendix trả về mảng, lưu vào state
      setContacts(res.data || []);
    } catch (err) {
      console.error("Lỗi lấy danh sách liên hệ:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // --- HÀM XÓA ---
  const handleDelete = async (id) => {
    if (window.confirm("Xóa yêu cầu liên hệ này?")) {
      try {
        // Khớp với Swagger: DELETE /contacts/{_id}
        await ContactService.delete(id);
        setContacts(contacts.filter(c => (c._id || c.id) !== id));
      } catch (err) {
        alert("Không xóa được rồi mày ơi!");
      }
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200/50 overflow-hidden animate-in fade-in duration-500">
      <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/30">
        <h3 className="text-lg font-black text-slate-900 tracking-tight italic">DANH SÁCH LIÊN HỆ</h3>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
          Tổng cộng: {contacts.length} khách hàng
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest bg-slate-50/50">
              <th className="px-8 py-6">Khách hàng</th>
              <th className="px-8 py-6">Thông tin liên lạc</th>
              <th className="px-8 py-6">Lời nhắn</th>
              <th className="px-8 py-6 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-sm font-medium">
            {loading ? (
              <tr>
                <td colSpan="4" className="px-8 py-12 text-center">
                  <div className="flex flex-col items-center gap-2 text-slate-400 font-bold uppercase text-[10px]">
                    <Loader2 className="animate-spin text-blue-600" size={24} />
                    Đang quét dữ liệu từ Mendix...
                  </div>
                </td>
              </tr>
            ) : contacts.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-8 py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center gap-2 opacity-50">
                    <Inbox size={32} />
                    Hộp thư trống!
                  </div>
                </td>
              </tr>
            ) : (
              contacts.map((contact) => (
                <tr key={contact._id || contact.id} className="hover:bg-slate-50/50 group transition-colors">
                  <td className="px-8 py-6">
                    <span className="font-black text-slate-900 uppercase italic tracking-tight">
                      {contact.name || "Nặc danh"}
                    </span>
                  </td>
                  <td className="px-8 py-6 space-y-1.5">
                    <div className="flex items-center gap-2 text-blue-600 font-bold">
                      <Phone size={12}/> {contact.phone || 'Chưa để lại số'}
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
                      <Mail size={12}/> {contact.email}
                    </div>
                  </td>
                  <td className="px-8 py-6 max-w-xs">
                    <div className="flex items-start gap-2 text-slate-500 italic">
                      <MessageSquare size={14} className="mt-1 flex-shrink-0" />
                      <p className="line-clamp-2 text-xs">{contact.message}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={() => handleDelete(contact._id || contact.id)}
                      className="p-3 text-slate-300 hover:text-red-500 hover:bg-white rounded-xl border border-transparent hover:border-slate-100 transition-all shadow-sm group-hover:shadow-red-100"
                    >
                      <Trash2 size={18}/>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactTable;