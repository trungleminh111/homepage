import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Search } from "lucide-react";

const navItems = [
  { label: "TRANG CHỦ", href: "#" },
  { label: "TECHWORLD", href: "#about", hasDropdown: true },
  { label: "GIẢI PHÁP", href: "#services", hasDropdown: true },
  { label: "TIN TỨC & SỰ KIỆN", href: "#news" },
  { label: "TUYỂN DỤNG", href: "#" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background shadow-md" : "bg-background/95 backdrop-blur-sm shadow-sm"}`}>
      <div className="container mx-auto flex items-center justify-between h-[70px] px-4">
        <a href="#" className="flex items-center">
          <span className="text-2xl font-extrabold tracking-wider text-tw-blue" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "0.15em" }}>
            TECHWORLD
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-0">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-1 px-5 py-2 text-[13px] font-bold text-foreground hover:text-tw-blue transition-colors uppercase tracking-wide"
            >
              {item.label}
              
            </a>
          ))}
          
        </nav>

        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-background border-t">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block px-6 py-3 text-sm font-semibold text-foreground hover:bg-accent transition-colors"
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