import { useState, useEffect } from "react";
import heroBg from "../assets/hero-new.jpg";

const slides = [
  {
    bg: heroBg,
    label: "Chào mừng đến với",
    title: "TECHWORLD SOLUTIONS VIETNAM",
    highlight: "VIETNAM",
    sub: "Hành trình đổi mới tương lai",
  },
  {
    bg: heroBg, // Thay bằng ảnh khác nếu có
    label: "Giải pháp dành cho doanh nghiệp",
    title: "Chuyển Đổi, Phát Triển Và Thành Công",
    highlight: "Thành Công",
    sub: "Chúng tôi xây dựng chiến lược để thúc đẩy sự phát triển doanh nghiệp của bạn",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [current]);

  const goTo = (idx) => {
    if (animating || idx === current) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 400);
  };

  const slide = slides[current];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-[80px] bg-[#0f172a]">
      {/* Background & Overlay Layer */}
      <div
        className="absolute inset-0 transition-opacity duration-700 safari-gpu-fix"
        style={{ opacity: animating ? 0 : 1, zIndex: 0 }}
      >
        <img
          src={slide.bg}
          alt=""
          className="w-full h-full object-cover"
          style={{ animation: "subtle-zoom 10s ease-out forwards" }}
        />
        
        {/* Lớp bóng mờ (Overlay) - Dùng RGBA để Safari không lỗi */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: "linear-gradient(to right, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.7) 40%, rgba(15, 23, 42, 0) 100%)",
          }}
        />
        {/* Lớp phủ bổ sung cho Mobile */}
        <div className="absolute inset-0 bg-black/30 md:hidden" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 container mx-auto px-4">
        <div
          className="max-w-2xl"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating ? "translate3d(-20px, 0, 0)" : "translate3d(0, 0, 0)",
            transition: "all 0.5s ease-out",
          }}
        >
          <p className="text-white/80 text-base md:text-lg mb-4 tracking-wide">
            {slide.label}
          </p>

          <h1 className="text-white text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            {slide.title.split(slide.highlight)[0]}
            <span className="text-[#eab308]">{slide.highlight}</span>
            {slide.title.split(slide.highlight)[1]}
          </h1>

          <div className="h-1.5 bg-[#eab308] mb-8 rounded-full w-20" />

          <p className="text-white/70 text-sm md:text-lg mb-10 max-w-md leading-relaxed">
            {slide.sub}
          </p>

          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="bg-[#2563eb] text-white font-bold px-10 py-4 rounded-full shadow-2xl animate-pulse-glow text-sm uppercase tracking-widest hover:scale-105 transition-transform"
            >
              Liên Hệ Ngay
            </a>
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current ? "bg-[#eab308] w-10 h-2.5" : "bg-white/30 w-2.5 h-2.5"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;