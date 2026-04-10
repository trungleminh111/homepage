const partnerLogos = [
  { src: "https://twi.vn/wp-content/uploads/2025/08/1.png", alt: "Microsoft" },
  { src: "https://twi.vn/wp-content/uploads/2025/08/4-1.png", alt: "Epicor" },
  { src: "https://twi.vn/wp-content/uploads/2025/08/3.png", alt: "Siemens" },
  { src: "https://twi.vn/wp-content/uploads/2025/08/6-1.png", alt: "BytePlus" },
  { src: "https://twi.vn/wp-content/uploads/2025/08/5-2.png", alt: "Mendix" },
  { src: "https://twi.vn/wp-content/uploads/2025/08/8-2.png", alt: "AWS" },
  { src: "https://twi.vn/wp-content/uploads/2025/08/7_3.png", alt: "Insider" },
];

const PartnersSection = () => {
  return (
    <section className="py-10 md:py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-4 mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Đối tác chiến lược</h2>
        <p className="text-muted-foreground mt-2">Hợp tác cùng các tập đoàn công nghệ hàng đầu thế giới</p>
      </div>
      <div className="block md:hidden px-4">
        <div className="grid grid-cols-4 gap-3">
          {partnerLogos.map((logo, i) => (
            <div key={i} className="flex items-center justify-center p-3 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow bg-card">
              <img src={logo.src} alt={logo.alt} className="h-8 w-auto object-contain" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
      <div className="hidden md:block relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...partnerLogos, ...partnerLogos, ...partnerLogos].map((logo, i) => (
            <div key={i} className="flex-shrink-0 mx-10 flex items-center justify-center h-20">
              <img src={logo.src} alt={logo.alt} className="h-16 w-auto object-contain" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;