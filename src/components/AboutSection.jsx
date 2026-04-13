import { Briefcase, Code2, HeadphonesIcon, TrendingUp } from "lucide-react";
import serviceErp from "../assets/about/erp.png";
import serviceLowcode from "../assets/about/lowcode.png";
import serviceCare from "../assets/about/chamsoc.png";

const services = [
  { image: serviceErp, title: "Triển khai ERP", description: "Chúng tôi cung cấp dịch vụ triển khai ERP phù hợp theo nhu cầu doanh nghiệp, giúp tối ưu quy trình vận hành và nâng cao hiệu quả kinh doanh." },
  { image: serviceLowcode, title: "Mendix Low-Code/No-Code", description: "Chúng tôi phát triển ứng dụng doanh nghiệp linh hoạt một cách nhanh chóng với nền tảng low-code/no-code của Mendix – giúp rút ngắn thời gian và tiết kiệm chi phí phát triển." },
  { image: serviceCare, title: "Chăm Sóc Khách Hàng", description: "Chúng tôi cung cấp giải pháp chăm sóc khách hàng chuyên biệt nhằm đảm bảo hỗ trợ nhanh chóng, hiệu quả và nâng cao sự hài lòng của khách hàng." },
];

const consultingServices = [
  { icon: Briefcase, title: "Tư vấn doanh nghiệp", description: "Chúng tôi đánh giá nhu cầu doanh nghiệp của bạn và xây dựng chiến lược phù hợp nhằm nâng cao hiệu quả vận hành và tối ưu lợi tức đầu tư (ROI) thông qua Microsoft Dynamics và các hệ thống ERP." },
  { icon: Code2, title: "Low Code / No Code", description: "Chúng tôi sử dụng Mendix và các công cụ low-code khác để nhanh chóng tạo ra các ứng dụng tùy chỉnh phù hợp với quy trình làm việc của bạn, giúp rút ngắn thời gian phát triển và thúc đẩy đổi mới." },
  { icon: HeadphonesIcon, title: "Chăm Sóc Khách Hàng", description: "Chúng tôi đặt trải nghiệm khách hàng lên hàng đầu, triển khai các công cụ và quy trình dịch vụ phù hợp nhằm nâng cao khả năng phản hồi và mức độ hài lòng của khách hàng." },
  { icon: TrendingUp, title: "Tư vấn giải pháp tài chính", description: "Chúng tôi cung cấp dịch vụ tư vấn tài chính chuyên sâu và tích hợp hệ thống, nhằm đảm bảo độ chính xác, tuân thủ quy định và nâng cao hiệu quả tài chính cho doanh nghiệp." },
];

const solutionLogos = [
  "https://twi.vn/wp-content/uploads/2025/08/9-150x150.png",
  "https://twi.vn/wp-content/uploads/2025/08/10-150x150.png",
  "https://twi.vn/wp-content/uploads/2025/08/12-150x150.png",
  "https://twi.vn/wp-content/uploads/2025/08/13-1-150x150.png",
  "https://twi.vn/wp-content/uploads/2025/08/8-150x150.png",
  "https://twi.vn/wp-content/uploads/2025/08/7-150x150.png",
  "https://twi.vn/wp-content/uploads/2025/08/11-150x150.png",
  "https://twi.vn/wp-content/uploads/2025/07/3-150x150.png",
  "https://twi.vn/wp-content/uploads/2025/07/1-150x150.png",
  "https://twi.vn/wp-content/uploads/2025/07/2-1-150x150.png",
  "https://twi.vn/wp-content/uploads/2025/09/image_2025-09-29_083330706-150x150.png",
  "https://twi.vn/wp-content/uploads/2025/09/image_2025-09-29_083217727-300x153.png",
];

const AboutSection = () => {
  return (
    <>
      {/* Services */}
      <section id="services" className="py-20 bg-section-light">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.title} className="bg-background rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                <div className="overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={640} height={640} />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-1">
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6 leading-tight">15 Năm Kinh Nghiệm</h2>
              <p className="text-muted-foreground leading-relaxed text-base">
                Đội ngũ tư vấn của chúng tôi sở hữu hơn 25 năm kinh nghiệm trong việc cung cấp các giải pháp chuyển đổi số phù hợp theo nhu cầu doanh nghiệp. Chúng tôi chuyên triển khai hệ thống quản trị doanh nghiệp, tối ưu quy trình kinh doanh và thúc đẩy đổi mới sáng tạo thông qua các công nghệ đã được kiểm chứng.
              </p>
            </div>
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
              {consultingServices.map((service) => (
                <div key={service.title} className="bg-background border rounded-xl p-6 hover:shadow-lg hover:border-tw-blue/30 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-tw-blue/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <service.icon className="w-5 h-5 text-tw-blue" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2 text-lg">{service.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-16 bg-section-light">
        <div className="container mx-auto px-4">
          <p className="text-center text-muted-foreground text-sm uppercase tracking-widest mb-8">
            Giải pháp mới nhất chúng tôi đã triển khai
          </p>
          <div className="grid grid-cols-4 gap-2 max-w-3xl mx-auto">
            {solutionLogos.map((logo, i) => (
              <div key={i} className="aspect-square bg-background rounded-lg border flex items-center justify-center p-3 hover:shadow-md transition-shadow">
                <img src={logo} alt={`Solution ${i + 1}`} className="max-w-full max-h-full object-contain" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
