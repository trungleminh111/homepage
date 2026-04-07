import { useEffect, useState } from "react";


const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded bg-tw-blue text-primary-foreground flex items-center justify-center shadow-lg hover:bg-tw-blue-dark transition-colors"
    >
      
    </button>
  );
};

export default ScrollToTop;