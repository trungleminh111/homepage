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
    <section id="contact" className="relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1552664730-d307ca884978')",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-10 items-center">
          
          {/* FORM */}
          <div className="w-full max-w-lg mx-auto bg-blue-900/90 p-6 md:p-10 rounded-xl shadow-xl text-white">
            <h3 className="text-xl md:text-2xl font-bold mb-6 text-center md:text-left">
              Bạn cần hỏi nhanh điều gì?
            </h3>

            <div className="space-y-4">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Tên Của Bạn"
                className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-2.5 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              />

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="E-Mail"
                className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-2.5 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              />

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Số Điện Thoại"
                className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-2.5 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              />

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Lời Nhắn Của Bạn"
                rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-2.5 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500 transition resize-none"
              />

              <button className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-md transition-all active:scale-95 shadow-lg">
                GỬI NGAY
              </button>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="text-center text-white w-full">
            <div className="mb-6 flex justify-center">
              <div className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl backdrop-blur-md inline-block">
                <span className="text-lg sm:text-xl md:text-2xl font-black tracking-tight uppercase block">
                  Techworld Solutions
                  <span className="block sm:inline ml-0 sm:ml-2 text-orange-400">Vietnam</span>
                </span>
              </div>
            </div>

            <p className="text-base md:text-lg opacity-90 max-w-md mx-auto">
              Đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;