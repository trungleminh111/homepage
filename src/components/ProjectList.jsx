import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectService } from '../Services/api';

const ProjectList = () => {
  const scrollRef = useRef(null);
  const [projects, setProjects] = useState([]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  // 🔥 FETCH DATA
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await ProjectService.getAll();
        console.log("DATA API:", res);

        const dataArray = Array.isArray(res.data)
          ? res.data
          : (res.data.value || []);

        // ✅ FIX: MAP lại ID chuẩn
        const mapped = dataArray.map(p => ({
          id: p._id, // 🔥 QUAN TRỌNG
          Name: p.Name,
          short_description: p.short_description,
          upload_preset: p.upload_preset
        }));

        setProjects(mapped);

      } catch (err) {
        console.error(err);
        setProjects([]);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-24 bg-slate-50/50 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-end mb-12">
          <div>
            <div>
              
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-12">
                Dự Án <span className="text-tw-blue">Tiêu Biểu</span>
              </h2>
            <div className="h-0.5 w-10 sm:w-14 bg-blue-600 rounded-full"></div>
          </div>

          <div className="flex gap-4">
            <button onClick={() => scroll('left')} className="p-3 bg-white border border-slate-200 rounded-full hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-90">
              <ChevronLeft size={24} />
            </button>
            <button onClick={() => scroll('right')} className="p-3 bg-white border border-slate-200 rounded-full hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-90">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-10"
        >
          {projects.map((item) => (
            <div
              key={item.id} // ✅ FIX
              className="min-w-[100%] md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col snap-start hover:shadow-xl hover:border-blue-100 transition-all duration-300 group"
            >
              {/* IMAGE */}
              <div className="bg-slate-100 h-56 flex items-center justify-center p-8 border-b border-slate-50 overflow-hidden">
                {item.upload_preset ? (
                  <img
                    src={item.upload_preset}
                    alt={item.Name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-slate-400 font-bold text-xs">
                    NO IMAGE
                  </span>
                )}
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {item.Name}
                </h3>

                <p className="text-slate-500 text-sm mb-6 line-clamp-2">
                  {item.short_description}
                </p>

                {/* <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                  {(item.tags || ["Mendix", "API"]).map((tag, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-md text-[10px] font-bold uppercase border">
                      {tag}
                    </span>
                  ))}
                </div> */}

                <Link
                  to={`/project/${item.id}`} // ✅ FIX CHUẨN
                  className="bg-slate-900 group-hover:bg-blue-600 text-white text-center py-3.5 rounded-xl font-bold text-sm"
                >
                  Chi tiết dự án
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectList;