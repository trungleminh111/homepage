import { MessageCircle } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-16 bg-tw-navy">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-white/70 text-sm uppercase tracking-widest mb-2">
          Bạn cần hỏi nhanh điều gì?
        </h3>
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-tw-blue flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
        </div>
        <p className="text-white/80 mb-2">
          Đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ bạn —{" "}
          <strong className="text-white">Techworld Solutions</strong>
        </p>
        <a
          href="#"
          className="inline-block mt-4 bg-tw-blue text-white font-semibold px-8 py-3 rounded-full hover:bg-tw-blue-light transition-colors text-sm"
        >
          Liên hệ ngay
        </a>
      </div>
    </section>
  );
};

export default ContactSection;