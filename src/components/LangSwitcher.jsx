import { useState, useEffect } from "react";

const LangSwitcher = () => {
  // 1. Đọc trạng thái từ localStorage để giữ ngôn ngữ khi load lại trang
  const [isEnglish, setIsEnglish] = useState(() => {
    return localStorage.getItem("lang") === "en";
  });

  // 2. Hàm điều khiển Google Translate (Viết riêng ra cho sạch)
  const applyGoogleTranslate = (lang) => {
    const googleCombo = document.querySelector(".goog-te-combo");
    if (googleCombo) {
      googleCombo.value = lang;
      googleCombo.dispatchEvent(new Event("change"));
    }
  };

  // 3. Theo dõi biến isEnglish, thay đổi là ra lệnh cho Google ngay
  useEffect(() => {
    const lang = isEnglish ? "en" : "vi";
    localStorage.setItem("lang", lang);

    // Đợi 1 chút để Google Script sẵn sàng nếu là lần đầu load
    const timer = setTimeout(() => {
      applyGoogleTranslate(lang);
    }, 300); // 300ms là khoảng nghỉ vừa đủ để không bị khựng layout

    return () => clearTimeout(timer);
  }, [isEnglish]);

  const toggleLanguage = (e) => {
    e.preventDefault(); // Chống nhảy trang nếu nút nằm trong thẻ <a>
    setIsEnglish(!isEnglish);
  };

  return (
    <button
      onClick={toggleLanguage}
      type="button"
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white shadow-sm hover:border-blue-400 transition-all duration-300 group"
    >
      <div className="relative w-8 h-4 bg-slate-200 rounded-full overflow-hidden">
        <div 
          className={`absolute top-0.5 left-0.5 w-3 h-3 bg-blue-600 rounded-full transition-transform duration-300 ease-in-out ${
            isEnglish ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </div>
      <span className="text-[11px] font-bold text-slate-700 uppercase tracking-tight w-16 text-left">
        {isEnglish ? "English" : "Tiếng Việt"}
      </span>
    </button>
  );
};

export default LangSwitcher;