import { useState, useEffect } from "react";
import heroBg from "../assets/hero-new.jpg";
import heroBg2 from "../assets/hero-new.jpg";

const slides = [
  {
    bg: heroBg,
    label: "Chào mừng đến với",
    title: "Techworld Solutions",
    highlight: "Solutions",
    sub: "Hành trình đổi mới tương lai",
  },
  {
    bg: heroBg2,
    label: "Giải pháp dành cho doanh nghiệp",
    title: "Chuyển Đổi, Phát Triển Và Thành Công",
    highlight: "Thành Công",
    sub: "Chúng tôi xây dựng chiến lược để thúc đẩy sự phát triển doanh nghiệp của bạn",
  },
];

const renderTitle = (title, highlight) => {
  if (!highlight) return <span>{title}</span>;
  const parts = title.split(highlight);
  return (
    <>
      {parts[0]}
      <span className="text-tw-gold">{highlight}</span>
      {parts[1]}
    </>
  );
};

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
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-16 bg-[#0f172a]">
      {/* Background Image & Overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-700 safari-gpu-fix"
        style={{ opacity: animating ? 0 : 1, zIndex: 1 }}
      >
        <img
          src={slide.bg}
          alt=""
          className="w-full h-full object-cover"
          style={{ 
            animation: "subtle-zoom 8s ease-out forwards",
          }}
        />
        
        {/* Lớp phủ bóng mờ - Đã sửa lỗi cho Safari Mobile */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: "linear-gradient(to right, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.6) 50%, rgba(15, 23, 42, 0) 100%)",
            WebkitBackdropFilter: "blur(0px)" 
          }}
        />
        {/* Thêm một lớp phủ tối bổ sung cho Mobile nếu gradient vẫn chưa đủ rõ */}
        <div className="absolute inset-0 bg-black/20 md:hidden" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div
          className="max-w-xl"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating ? "translate3d(-20px, 0, 0)" : "translate3d(0, 0, 0)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
          }}
        >
          <p className="text-white/70 text-base md:text-lg mb-3 font-normal tracking-wide">
            {slide.label}
          </p>

          <h1 className="text-white text-4xl md:text-6xl font-extrabold mb-5 leading-tight">
            {renderTitle(slide.title, slide.highlight)}
          </h1>

          <div className="h-1 bg-tw-gold mb-5 rounded-full w-16" />

          <p className="text-white/70 text-sm md:text-base mb-10 max-w-sm leading-relaxed">
            {slide.sub}
          </p>

          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="inline-block bg-blue-600 text-white font-bold px-10 py-3 rounded-full hover:bg-yellow-500 transition-all duration-300 text-sm uppercase tracking-widest shadow-lg animate-pulse-glow"
            >
              Liên Hệ
            </a>
          </div>
        </div>
      </div>

      {/* Điều hướng dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "bg-tw-gold w-8 h-2"
                : "bg-white/40 w-2 h-2"
            }`}
          />
        ))}
      </div>

      {/* Progress Bar ở đáy */}
      <div
        className="absolute bottom-0 left-0 h-1 bg-yellow-500/60 z-30"
        style={{ 
          animation: "progress-bar 5s linear infinite",
          WebkitAnimation: "progress-bar 5s linear infinite" 
        }}
      />
    </section>
  );
};

export default HeroSection;