

const Footer = () => {
  return (
    <footer className="bg-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-10 text-primary-foreground/70 text-sm">
          <div>
            <h4 className="text-primary-foreground font-bold text-base uppercase mb-4 tracking-wide">
              TECHWORLD SOLUTIONS VIETNAM
            </h4>
            <div className="space-y-1 leading-relaxed">
              <p className="font-semibold text-primary-foreground/90">Trụ sở chính:</p>
              <p>• <strong>Hà Nội:</strong> 28A Trần Hưng Đạo</p>
              <p>• <strong>TP. Hồ Chí Minh:</strong> 33 Lê Duẩn</p>
              <p className="font-semibold text-primary-foreground/90 mt-3">Trung tâm R&D:</p>
              <p>• <strong>Central Vietnam:</strong> 76A Trường Chinh, TP. Huế</p>
              <p className="font-semibold text-primary-foreground/90 mt-3">Thông tin liên hệ:</p>
              <p>• <strong>HCM:</strong> (+84) 28 3554 2545</p>
              <p>• <strong>Huế:</strong> (+84) 23 4355 9999</p>
              <p>• <strong>Email:</strong> <a href="mailto:bdm@techsolutions.vn" className="text-tw-blue-light hover:underline">bdm@techsolutions.vn</a></p>
              <p className="font-semibold text-primary-foreground/90 mt-3">Thời gian hoạt động:</p>
              <p>• Thứ 2 – Thứ 6: 08:00 – 18:00</p>
            </div>
          </div>

          <div>
            <h4 className="text-primary-foreground font-bold text-base uppercase mb-4 tracking-wide">
              BÀI ĐĂNG MỚI NHẤT
            </h4>
            <div className="space-y-4">
              <div>
                <a href="#" className="text-primary-foreground/80 hover:text-tw-gold transition-colors font-medium text-sm uppercase">
                  [TUYỂN DỤNG] MENDIX DEVELOPER
                </a>
                <p className="text-primary-foreground/50 text-xs mt-1">April 3, 2026</p>
              </div>
              <div>
                <a href="#" className="text-primary-foreground/80 hover:text-tw-gold transition-colors font-medium text-sm uppercase">
                  [TUYỂN DỤNG] D365 BUSINESS CENTRAL CONSULTANT (MID-LEVEL)
                </a>
                <p className="text-primary-foreground/50 text-xs mt-1">April 3, 2026</p>
              </div>
              <div>
                <a href="#" className="text-primary-foreground/80 hover:text-tw-gold transition-colors font-medium text-sm uppercase">
                  [TUYỂN DỤNG] DATABASE SPECIALIST (SQL DEVELOPER / DBA)
                </a>
                <p className="text-primary-foreground/50 text-xs mt-1">April 3, 2026</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-primary-foreground font-bold text-base uppercase mb-4 tracking-wide">
              TECHWORLD SOLUTIONS VIETNAM
            </h4>
            <p className="leading-relaxed mb-4">
              <strong className="text-primary-foreground">Techworld Solutions Vietnam</strong> – Thành viên của{" "}
              <strong className="text-primary-foreground">Techworld International</strong>, hoạt động tại Australia từ 2019 – hợp tác cùng các tập đoàn công nghệ hàng đầu thế giới như{" "}
              <strong className="text-primary-foreground">Microsoft, Siemens, Mendix, Epicor, AWS, BytePlus, Insider</strong>{" "}
              để mang đến các giải pháp phần mềm toàn diện
            </p>
            <h5 className="text-tw-gold font-bold text-lg italic mb-3">CƠ HỘI NGHỀ NGHIỆP</h5>
            <p className="text-primary-foreground font-semibold mb-3">Liên Hệ Chúng Tôi</p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-primary-foreground/70 hover:text-tw-blue-light transition-colors">
                
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-tw-blue-light transition-colors">
               
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-tw-blue-light transition-colors">
                
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-primary-foreground/50 text-xs">
          <p>© 2019 All Rights Reserved</p>
          <div className="flex items-center gap-4 mt-3 md:mt-0">
            <a href="#" className="hover:text-primary-foreground transition-colors">TRANG CHỦ</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">TECHWORLD</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">GIẢI PHÁP</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">TIN TỨC & SỰ KIỆN</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">TUYỂN DỤNG</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;