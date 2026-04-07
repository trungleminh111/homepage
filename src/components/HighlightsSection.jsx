import { useEffect, useRef, useState } from "react";
import { Award, Clock, ShieldCheck, MessageCircle } from "lucide-react";
import ContactSection from "./ContactSection";
import WhyUsSection from "./WhyUsSection";


const reasons = [
  { icon: ShieldCheck, title: "Lĩnh vực chuyên môn", description: "Chúng tôi có nhiều kinh nghiệm chuyên sâu trong lĩnh vực ERP và giải pháp low-code, đảm bảo mang lại thành công cho doanh nghiệp." },
  { icon: Award, title: "Hỗ trợ kỹ thuật uy tín", description: "Đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ nhanh chóng và hiệu quả bất cứ khi nào bạn cần." },
  { icon: Clock, title: "Đảm bảo thời gian triển khai", description: "Mỗi dự án đều được thực hiện theo tiến trình rõ ràng, đảm bảo hoàn thành đúng cam kết." },
];

const stats = [
  { value: 20, label: "Đối tác hài lòng" },
  { value: 15, label: "Dự Án Đã Hoàn Thành" },
  { value: 3, label: "Danh hiệu & giải thưởng" },
  { value: 15, label: "Năm Kinh Nghiệm" },
];

const AnimatedNumber = ({ target }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1500;
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
  }, [target]);

  return <div ref={ref} className="text-4xl md:text-5xl font-extrabold text-primary-foreground">{count}+</div>;
};

const newsItems = [
  { title: "Tăng Cường Hợp Tác Giữa Epicor Software Corporation Và TECHWORLD", date: "30 Mar 2026", excerpt: "TP.HCM – Trong khuôn khổ thúc đẩy hợp tác chiến lược tại khu vực Đông Nam Á...", image: "https://twi.vn/wp-content/uploads/2026/03/image-3.png" },
  { title: "TECHWORLD CHÍNH THỨC KHAI TRƯƠNG TECHWORLD ACADEMY", date: "12 Mar 2026", excerpt: "Ngày 11/03/2026 đánh dấu một cột mốc quan trọng trong hành trình phát triển của TECHWORLD...", image: "https://twi.vn/wp-content/uploads/2026/03/Image-2.jpg" },
  { title: "Hải Anh JSC triển khai hệ thống ERP với Techworld Solutions Vietnam", date: "13 Oct 2025", excerpt: "Hải Anh JSC triển khai hệ thống ERP với Techworld Solutions Vietnam trên nền tảng Microsoft Dynamics 365...", image: "https://twi.vn/wp-content/uploads/2025/10/image_2025-10-13_144643280.png" },
];

const HighlightsSection = () => {
  return (
    <>
    

      {/* Stats */}
      <section className="py-16 bg-hero-gradient">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <AnimatedNumber target={stat.value} />
                <p className="text-primary-foreground/80 mt-2 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

  

      {/* News */}
      <section id="news" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl md:text-4xl font-extrabold text-foreground mb-12">
            Tin Tức <span className="text-tw-blue">Mới Nhất</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {newsItems.map((item) => (
              <article key={item.title} className="bg-background rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group border">
                <div className="overflow-hidden h-48">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <span className="font-semibold text-tw-blue">TECHWORLD</span>
                    <span>•</span>
                    <span>{item.date}</span>
                  </div>
                  <h3 className="font-bold text-foreground mb-2 leading-snug line-clamp-2 group-hover:text-tw-blue transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">{item.excerpt}</p>
                  <a href="#" className="inline-block mt-3 text-sm font-semibold text-tw-blue hover:underline">Đọc Thêm →</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HighlightsSection;