import { useState } from "react";

const ContactSection = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="relative min-h-screen">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1552664730-d307ca884978')",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative w-full px-4 py-10 sm:py-20 sm:container sm:mx-auto">
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-10 items-center">

          {/* FORM */}
          <div className="w-full sm:max-w-lg bg-blue-900/80 p-6 sm:p-10 rounded-xl border border-white/10 text-white">
            <h3 className="text-xl sm:text-2xl font-bold mb-5">
              Bạn cần hỏi nhanh điều gì?
            </h3>

            <div className="space-y-4">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Tên của bạn"
                className="w-full box-border bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-base text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/20 transition"
              />

              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="E-Mail"
                className="w-full box-border bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-base text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/20 transition"
              />

              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="Số điện thoại"
                className="w-full box-border bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-base text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/20 transition"
              />

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Lời nhắn của bạn"
                rows={4}
                className="w-full box-border bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-base text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/20 transition resize-none"
              />

              <button className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-semibold px-8 py-3 rounded-lg transition-all">
                Gửi ngay
              </button>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="text-center sm:text-left text-white px-2 sm:px-6">
            <div className="mb-5">
              <div className="inline-flex items-center px-5 py-3 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md">
                <span className="text-base sm:text-2xl font-extrabold leading-snug">
                  TECHWORLD SOLUTIONS VIETNAM
                </span>
              </div>
            </div>

            <p className="text-base sm:text-lg mb-4 text-white/85 leading-relaxed">
              Đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ bạn mọi lúc, mọi nơi.
            </p>

            <ul className="flex flex-col gap-2 items-center sm:items-start text-sm text-white/75">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                Phản hồi trong vòng 24 giờ
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                Hỗ trợ kỹ thuật chuyên nghiệp
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                Tư vấn miễn phí
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;