import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react"; // Thêm icon Globe cho đẹp

// Component nút chuyển đổi ngôn ngữ tích hợp
const LangSwitcher = () => {
  const [isEnglish, setIsEnglish] = useState(false);

  const toggleLanguage = () => {
    const newLang = !isEnglish ? "en" : "vi";
    setIsEnglish(!isEnglish);
    const googleCombo = document.querySelector(".goog-te-combo");
    if (googleCombo) {
      googleCombo.value = newLang;
      googleCombo.dispatchEvent(new Event("change"));
    }
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-white hover:border-[#2563eb] transition-all duration-300 group"
    >
      <Globe size={14} className={isEnglish ? "text-blue-600" : "text-slate-400"} />
      <span className="text-[11px] font-bold text-slate-700 uppercase tracking-tight">
        {isEnglish ? "English" : "Tiếng Việt"}
      </span>
    </button>
  );
};

const navItems = [
  { label: "TRANG CHỦ", href: "#" },
  { label: "TECHWORLD", href: "#about" },
  { label: "GIẢI PHÁP", href: "#services" },
  { label: "TIN TỨC & SỰ KIỆN", href: "#news" },
  { label: "TUYỂN DỤNG", href: "#" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-white/95 backdrop-blur-md py-4"
      }`}
      style={{ 
        zIndex: 9999,
        WebkitBackdropFilter: "blur(12px)" 
      }}
    >
      <div className="container mx-auto flex items-center justify-between h-[60px] px-4">
        <a href="#" className="flex items-center">
          {/* Thêm class notranslate để giữ tên thương hiệu */}
          <span className="text-2xl font-extrabold tracking-wider text-[#2563eb] notranslate" style={{ letterSpacing: "0.1em" }}>
            TECHWORLD
          </span>
        </a>

        {/* Desktop Nav + Lang Switcher */}
        <div className="hidden lg:flex items-center gap-4">
          <nav className="flex items-center">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-[13px] font-bold text-slate-800 hover:text-[#2563eb] transition-colors uppercase"
              >
                {item.label}
              </a>
            ))}
          </nav>
          
          <div className="h-6 w-[1px] bg-slate-200 mx-2"></div>
          <LangSwitcher />
        </div>

        {/* Mobile Toggle & Lang Switcher */}
        <div className="flex lg:hidden items-center gap-3">
          <LangSwitcher />
          <button className="p-2 text-slate-900" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t absolute top-full left-0 w-full shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-6 py-5 text-sm font-bold text-slate-800 border-b border-gray-50 active:bg-slate-50 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;