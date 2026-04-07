import { useState, useEffect } from "react";

const LangSwitcher = () => {
  const [isEnglish, setIsEnglish] = useState(() => {
    return localStorage.getItem("lang") === "en";
  });

  const applyTranslate = (lang) => {
    // 1. Ghi đè Cookie - Đây là cách Safari chấp nhận dễ nhất
    // Cấu trúc: /ngôn ngữ gốc/ngôn ngữ đích
    const langValue = `/vi/${lang}`;
    document.cookie = `googtrans=${langValue}; path=/`;
    document.cookie = `googtrans=${langValue}; path=/; domain=.twi.vn`; // Thay bằng domain của anh nếu chạy thật

    // 2. Kích hoạt Select box của Google (Cho Chrome/Android)
    const googleCombo = document.querySelector(".goog-te-combo");
    if (googleCombo) {
      googleCombo.value = lang;
      googleCombo.dispatchEvent(new Event("change"));
    } else {
      // Nếu Safari cứng đầu không thấy combo, mình ép nó load lại 1 lần (optional)
      // window.location.reload(); 
    }
  };

  useEffect(() => {
    const lang = isEnglish ? "en" : "vi";
    localStorage.setItem("lang", lang);
    
    // Đợi script Google nạp xong rồi mới ép cookie
    const timer = setTimeout(() => {
      applyTranslate(lang);
    }, 500);

    return () => clearTimeout(timer);
  }, [isEnglish]);

  return (
    <button
      onClick={() => setIsEnglish(!isEnglish)}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-white shadow-sm hover:border-blue-400 transition-all duration-300"
    >
      <div className="relative w-8 h-4 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`absolute top-0.5 left-0.5 w-3 h-3 bg-blue-600 rounded-full transition-transform duration-300 ${isEnglish ? 'translate-x-4' : 'translate-x-0'}`}
        />
      </div>
      <span className="text-[11px] font-bold text-gray-700 uppercase">
        {isEnglish ? "English" : "Tiếng Việt"}
      </span>
    </button>
  );
};

export default LangSwitcher;