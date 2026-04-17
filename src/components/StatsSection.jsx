import { useEffect, useRef, useState } from "react";

const AnimatedNumber = ({ target, duration = 1500 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 } // Giảm threshold để dễ kích hoạt trên mobile
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <div
      ref={ref}
      // Ép màu trắng (text-white) và font-bold
      className="text-4xl md:text-6xl font-black text-white drop-shadow-md"
    >
      {count}+
    </div>
  );
};

const StatsSection = () => {
  const stats = [
    { value: 68, label: "Đối tác hài lòng" },
    { value: 34, label: "Dự Án Hoàn Thành" },
    { value: 9, label: "Giải thưởng" },
    { value: 25, label: "Năm Kinh Nghiệm" },
  ];

  return (
    <section className="py-20 bg-hero-gradient relative overflow-hidden">
      {/* Thêm một lớp phủ nhẹ để bảo vệ màu chữ nếu gradient bị lỗi */}
      <div className="absolute inset-0 bg-blue-900/20 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <AnimatedNumber target={stat.value} />
              <p className="text-white/80 mt-3 text-xs md:text-sm font-medium uppercase tracking-[0.15em]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
