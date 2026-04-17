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
    <section id="contact" className="relative">
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
      <div className="relative container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* FORM */}
          <div className="bg-tw-blue p-8 md:p-10 rounded-xl shadow-xl text-white max-w-lg">
            <h3 className="text-2xl font-bold mb-6">
              Bạn cần hỏi nhanh điều gì?
            </h3>

            <div className="space-y-5">

              {/* INPUT */}
              <input
                name="name"
                placeholder="Tên Của Bạn"
                className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/20 transition resize-none"
              />

              <input
                name="email"
                placeholder="E-Mail"
                className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/20 transition resize-none"
              />

              <input
                name="phone"
                placeholder="Số Điện Thoại"
                className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/20 transition resize-none"
              />

              <textarea
                name="message"
                placeholder="Lời Nhắn Của Bạn"
                rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/20 transition resize-none"
              />

              {/* BUTTON */}
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 mt-4 rounded-md transition-all hover:scale-105">
                Gửi Ngay
              </button>

            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="text-center text-white px-6">
            <div className="mb-6">
              <div className="mx-auto px-6 py-3 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md flex items-center justify-center w-fit">
                <span
                  className="text-xl md:text-2xl font-extrabold whitespace-nowrap"

                >
                  TECHWORLD SOLUTIONS VIETNAM
                </span>


              </div>
            </div>

            <p className="text-lg mb-4">
              Đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ bạn —
            </p>

          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;