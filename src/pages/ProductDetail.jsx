import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2, Globe } from 'lucide-react';
import { Helmet } from 'react-helmet-async'; // Thêm dòng này
import { ProjectService } from '../Services/api';

const ProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchProjectDetail();
    }, [id]);

    const fetchProjectDetail = async () => {
        setLoading(true);
        try {
            const res = await ProjectService.getAll();
            const projects = Array.isArray(res.data) ? res.data : (res.data?.data || []);
            const found = projects.find(p => String(p._id) === String(id));
            if (found) setProject(found);
        } catch (err) {
            console.error("Lỗi:", err);
        } finally {
            setLoading(false);
        }
    };

    const cleanHTML = (html) => {
        if (!html) return "";
        return html
            .replace(/\n/g, " ")
            .replace(/>\s+</g, "><")
            .replace(/\s+/g, " ")
            .replace(/&nbsp;/g, " ")
            .replace(/(<br\s*\/?>\s*){2,}/gi, "<br/>");
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <Loader2 className="animate-spin text-blue-600" size={32} />
        </div>
    );

    if (!project) return null;
    

    const projectImage = project.upload_preset || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026";

    return (
        <div className="bg-slate-50/30 min-h-screen w-full">
            {/* Cấu hình Meta Tags để link preview ngon */}
            <Helmet>
                <title>{project.Name} | Techworld</title>
                <meta property="og:title" content={project.Name} />
                <meta property="og:description" content={project.short_description} />
                <meta property="og:image" content={projectImage} />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:type" content="article" />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-8 sm:pb-12 md:pb-20 bg-white shadow-sm border-x border-slate-50 min-h-screen">
                {/* NÚT BACK */}
                <div className="mb-6 sm:mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-xs sm:text-sm transition-all">
                        <ArrowLeft size={16} /> Quay lại
                    </Link>
                </div>

                {/* HEADER */}
                <header className="mb-8 sm:mb-12">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-6 sm:mb-8 tracking-tight text-center md:text-left">
                        {project.Name}
                    </h1>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8 py-4 sm:py-6 border-y border-slate-100 mb-8 sm:mb-12">
                        <div className="flex-1">
                            <p className="text-base sm:text-lg text-slate-500 leading-relaxed italic border-l-4 border-blue-600 pl-4 sm:pl-6">
                                {project.short_description}
                            </p>
                        </div>

                        {project.view_link && (
                            <div className="flex flex-col items-center gap-2 sm:gap-3 w-full md:w-auto">
                                <a
                                    href={project.view_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-black text-[10px] sm:text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg flex items-center gap-2 sm:gap-3 w-full justify-center"
                                >
                                    <Globe size={16} /> Xem dự án
                                </a>
                                <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">
                                    ● System Live
                                </span>
                            </div>
                        )}
                    </div>
                </header>

                {/* IMAGE */}
                <div className="mb-10 sm:mb-16 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-slate-100 bg-slate-50">
                    <img
                        src={projectImage}
                        alt={project.Name}
                        className="w-full h-auto max-h-[400px] sm:max-h-[600px] object-cover"
                    />
                </div>

                {/* CONTENT */}
                <div className="prose prose-slate max-w-none px-1 sm:px-2">
                    <div
                        className="blog-content text-slate-700"
                        dangerouslySetInnerHTML={{ __html: cleanHTML(project.description) }}
                    />
                </div>

                {/* FOOTER */}
                <footer className="mt-20 sm:mt-40 pt-12 sm:pt-16 border-t border-slate-100 text-center space-y-6 sm:space-y-8">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter uppercase italic">
                        TECHWORLD
                    </h3>
                    <div className="flex flex-col items-center gap-4 sm:gap-6">
                        <p className="text-slate-500 max-w-md mx-auto text-sm leading-relaxed">
                            Bạn có dự án tương tự? Liên hệ với chúng tôi để hiện thực hóa ý tưởng của bạn.
                        </p>
                        <Link 
                            to="/#contact" 
                            className="inline-block border-2 border-slate-900 text-slate-900 px-6 sm:px-10 py-3 sm:py-4 rounded-full font-black text-[10px] sm:text-xs uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all"
                        >
                            Bắt đầu tư vấn
                        </Link>
                    </div>
                </footer>
            </main>

            <style>{`
                .blog-content { width: 100%; word-break: break-word; }
                .blog-content h2 { font-size: 1.5rem; font-weight: 800; margin: 2rem 0 1rem; }
                .blog-content p { font-size: 1rem; line-height: 1.7; margin-bottom: 1.2rem; }
                @media (min-width: 768px) {
                    .blog-content p { font-size: 1.1rem; }
                    .blog-content h2 { font-size: 2rem; }
                }
                .blog-content img { max-width: 100% !important; height: auto !important; border-radius: 1rem; }
            `}</style>
        </div>
    );
};

export default ProjectDetail;