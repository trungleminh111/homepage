import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";



const navItems = [
  { label: "TRANG CHỦ", href: "/" },
  { label: "TECHWORLD", href: "/#about" },
  { label: "GIẢI PHÁP", href: "/#services" },
  { label: "TIN TỨC & SỰ KIỆN", href: "/#news" },
  { label: "TUYỂN DỤNG", href: "/#" },
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
      className={`fixed top-0 left-0 right-0 transition-all duration-300 ${scrolled ? "bg-white shadow-md py-2" : "bg-white/95 backdrop-blur-md py-4"
        }`}
      style={{
        zIndex: 9999, // Luôn nằm trên Banner
        WebkitBackdropFilter: "blur(12px)" // Hỗ trợ blur cho Safari
      }}
    >
      <div className="container mx-auto flex items-center justify-between h-[60px] px-4">
        <a href="/" className="flex items-center gap-3 md:gap-4">
          <img
            src="/logo.png"
            alt="Techworld logo"
            className="h-8 md:h-10 w-auto object-contain"
          />

          <span className="text-sm md:text-xl font-bold tracking-wide text-blue-600 whitespace-nowrap hidden sm:block">
            TECHWORLD SOLUTIONS VIETNAM
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-2">
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

        <button className="lg:hidden p-2 text-slate-900" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t absolute top-full left-0 w-full shadow-xl">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block px-6 py-4 text-sm font-bold text-slate-800 border-b border-gray-50"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;