import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { 
  X, Send, Link as LinkIcon, ImageIcon, 
  AlertCircle, Loader2, FileText, AlignLeft 
} from 'lucide-react';
import { uploadImage, ProjectService } from '../../Services/api';

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'clean']
  ],
};

const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'link'];

const cleanHTML = (html) => {
  if (!html) return '';
  return html.replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
};

const ProjectModal = ({ isOpen, onClose, project, onRefresh }) => {
  const [formData, setFormData] = useState({
    title: '',
    shortDesc: '',
    content: '',
    externalLink: '',
    image: null,
    imageUrl: ''
  });

  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false); // 🔥 Chốt chặn cho ReactQuill

  useEffect(() => {
    if (!isOpen) {
      setIsDataLoaded(false);
      return;
    }

    if (project) {
      setFormData({
        title: project.Name || '',
        shortDesc: project.short_description || '',
        content: cleanHTML(project.description || ''),
        externalLink: project.view_link || '',
        imageUrl: project.upload_preset || '',
        image: null
      });
      setPreview(project.upload_preset || null);
    } else {
      setFormData({ title: '', shortDesc: '', content: '', externalLink: '', image: null, imageUrl: '' });
      setPreview(null);
    }

    // 🔥 Tạo độ trễ siêu nhỏ để React render xong formData rồi mới vẽ Quill
    const timer = setTimeout(() => setIsDataLoaded(true), 50);
    return () => clearTimeout(timer);
  }, [project, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleEditorChange = (content) => {
    setFormData(prev => ({ ...prev, content }));
    if (error) setError('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Ảnh không được vượt quá 5MB');
        return;
      }
      setFormData(prev => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isContentEmpty = !formData.content || formData.content.replace(/<(.|\n)*?>/g, '').trim().length === 0;
    
    if (!formData.title || !formData.shortDesc || isContentEmpty) {
      setError('Vui lòng điền đầy đủ các thông tin chính.');
      return;
    }

    setLoading(true);
    try {
      let finalImageUrl = formData.imageUrl;
      if (formData.image) {
        const cloudUrl = await uploadImage(formData.image);
        if (!cloudUrl) throw new Error("Upload ảnh lỗi");
        finalImageUrl = cloudUrl;
      }
      const payload = {
        title: formData.title,
        shortDesc: formData.shortDesc,
        content: formData.content,
        imageUrl: finalImageUrl,
        externalLink: formData.externalLink
      };
      if (project) await ProjectService.update(project._id, payload);
      else await ProjectService.create(payload);
      
      onRefresh();
      onClose();
    } catch (err) {
      setError("Có lỗi xảy ra khi gửi dữ liệu.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md animate-in fade-in duration-300" 
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-5xl rounded-[2.5rem] shadow-2xl flex flex-col max-h-[92vh] border border-slate-200 overflow-hidden" 
        onClick={e => e.stopPropagation()}
      >
        
        {/* HEADER */}
        <div className="px-10 py-6 border-b border-slate-100 flex justify-between items-center bg-white shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
              <FileText size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase italic">
                {project ? 'Chỉnh sửa dự án' : 'Tạo dự án mới'}
              </h2>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Tech Core CMS</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-3 hover:bg-slate-100 text-slate-400 hover:text-red-500 rounded-full transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar bg-white">
          {error && (
            <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-bold animate-shake">
              <AlertCircle size={20} /> {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tên dự án */}
            <div className="space-y-3 col-span-2">
              <label className="text-sm font-black text-slate-700 uppercase tracking-wider ml-1">Tên dự án</label>
              <input 
                name="title" 
                value={formData.title} 
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 px-6 py-4 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all text-lg font-bold text-slate-800"
                placeholder="Nhập tên dự án..."
              />
            </div>

            {/* Link & Short Desc */}
            <div className="space-y-3">
              <label className="text-sm font-black text-slate-700 uppercase tracking-wider ml-1 italic text-indigo-600">Liên kết Demo</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <LinkIcon size={20} />
                </div>
                <input 
                  name="externalLink" 
                  value={formData.externalLink} 
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 pl-12 pr-6 py-4 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all font-medium"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-black text-slate-700 uppercase tracking-wider ml-1">Mô tả ngắn gọn</label>
              <input 
                name="shortDesc" 
                value={formData.shortDesc} 
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 px-6 py-4 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all font-medium"
                placeholder="Ví dụ: Landing page cho doanh nghiệp..."
              />
            </div>

            {/* Upload Image */}
            <div className="col-span-2 space-y-3">
              <label className="text-sm font-black text-slate-700 uppercase tracking-wider ml-1">Ảnh dự án (Thumbnail)</label>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <label className="flex flex-col items-center justify-center w-full md:w-64 h-48 border-4 border-dashed border-slate-100 rounded-[2rem] cursor-pointer hover:bg-slate-50 hover:border-indigo-200 transition-all group overflow-hidden relative bg-slate-50">
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <ImageIcon className="w-10 h-10 mb-2 text-slate-300 group-hover:text-indigo-500 group-hover:scale-110 transition-all" />
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Tải ảnh lên</p>
                    </div>
                  )}
                  <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                </label>
                <div className="flex-1 space-y-2 text-center md:text-left">
                  <h4 className="font-bold text-slate-700">Lưu ý về hình ảnh</h4>
                  <ul className="text-xs text-slate-400 space-y-1 font-medium italic">
                    <li>• Kích thước khuyến nghị: 1200 x 800px</li>
                    <li>• Định dạng: JPG, PNG, WEBP</li>
                    <li>• Dung lượng: Tối đa 5MB</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Nội dung chi tiết */}
            <div className="col-span-2 space-y-3">
              <label className="text-sm font-black text-slate-700 uppercase tracking-wider ml-1 flex items-center gap-2 italic">
                <AlignLeft size={18} /> Nội dung bài viết chi tiết
              </label>
              <div className="quill-wrapper rounded-[2rem] border-2 border-slate-100 overflow-hidden bg-white shadow-inner">
                {isDataLoaded ? (
                  <ReactQuill
                    key={project?._id ? `edit-${project._id}` : 'new-project'}
                    theme="snow"
                    value={formData.content}
                    onChange={handleEditorChange}
                    modules={modules}
                    formats={formats}
                    className="h-80 mb-14"
                    placeholder="Viết nội dung giới thiệu dự án tại đây..."
                  />
                ) : (
                  <div className="h-80 flex flex-col items-center justify-center text-slate-400 gap-4 bg-slate-50 italic">
                    <Loader2 className="animate-spin" size={32} />
                    <p className="font-bold uppercase tracking-widest text-xs">Đang chuẩn bị trình soạn thảo...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-10 py-6 border-t border-slate-100 flex justify-end gap-4 bg-white shrink-0">
          <button 
            onClick={onClose}
            className="px-8 py-4 text-sm font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
          >
            Hủy bỏ
          </button>
          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 shadow-2xl shadow-indigo-200 transition-all active:scale-95 group"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
            {project ? 'Cập nhật dự án' : 'Đăng dự án'}
          </button>
        </div>
      </div>

      <style jsx>{`
        .quill-wrapper .ql-toolbar {
          border: none !important;
          border-bottom: 2px solid #f8fafc !important;
          padding: 1rem 1.5rem !important;
          background: #fdfdff;
        }
        .quill-wrapper .ql-container {
          border: none !important;
          font-family: 'Inter', sans-serif;
          font-size: 1.1rem;
          padding: 0.5rem 1rem;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #f1f5f9;
          border-radius: 20px;
          border: 4px solid white;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: white;
        }
      `}</style>
    </div>
  );
};

export default ProjectModal;