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
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <div
      ref={ref}
      className="text-4xl md:text-5xl font-extrabold text-primary-foreground"
    >
      {count}+
    </div>
  );
};

const StatsSection = () => {
  const stats = [
    { value: 20, label: "Đối tác hài lòng" },
    { value: 15, label: "Dự Án Đã Hoàn Thành" },
    { value: 3, label: "Danh hiệu & giải thưởng" },
    { value: 15, label: "Năm Kinh Nghiệm" },
  ];

  return (
    <section className="py-16 bg-hero-gradient">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <AnimatedNumber target={stat.value} />
              <p className="text-primary-foreground/80 mt-2 text-sm font-medium">
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