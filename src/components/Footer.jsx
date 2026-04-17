import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getPosts } from "../api/api";

const Footer = () => {
  const {
    data: posts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts", 3],
    queryFn: () => getPosts(3),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return (
    // Ép nền tối bằng mã màu hex để tránh lỗi biến CSS
    <footer className="bg-[#0f172a] py-12 text-gray-300">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-10 text-sm">

          {/* LEFT: Thông tin liên hệ */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base uppercase tracking-wide">
              TECHWORLD SOLUTIONS VIETNAM
            </h4>
            <div className="space-y-2 leading-relaxed">
              <div>
                <p className="font-bold text-white mb-1">Trụ sở chính:</p>
                <p>• <span className="text-white">Hà Nội:</span> 28A Trần Hưng Đạo</p>
                <p>• <span className="text-white">TP. Hồ Chí Minh:</span> 33 Lê Duẩn</p>
              </div>
              
              <div>
                <p className="font-bold text-white mb-1 mt-3">Trung tâm R&D:</p>
                <p>• <span className="text-white">Central Vietnam:</span> 76A Trường Chinh, TP. Huế</p>
              </div>

              <div>
                <p className="font-bold text-white mb-1 mt-3">Thông tin liên hệ:</p>
                {/* Dùng tel: để kiểm soát link, tránh trình duyệt tự đổi màu */}
                <p>• <span className="text-white">HCM:</span> <a href="tel:02835542545" className="hover:text-blue-400 transition-colors">(+84) 28 3554 2545</a></p>
                <p>• <span className="text-white">Huế:</span> <a href="tel:02343559999" className="hover:text-blue-400 transition-colors">(+84) 23 4355 9999</a></p>
                <p>• <span className="text-white">Email:</span> <a href="mailto:bdm@techsolutions.vn" className="text-blue-400 hover:underline">bdm@techsolutions.vn</a></p>
              </div>
            </div>
          </div>

          {/* MIDDLE: Bài đăng mới nhất */}
          <div>
            <h4 className="text-white font-bold text-base uppercase mb-6 tracking-wide">
              BÀI ĐĂNG MỚI NHẤT
            </h4>
            <div className="space-y-5">
              {isLoading && <div className="h-20 bg-white/5 animate-pulse rounded-lg" />}
              {isError && <p className="text-red-400">Không tải được bài viết</p>}
              
              {!isLoading && !isError &&
                posts.map((post) => {
                  const date = new Date(post.date).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  });

                  return (
                    <div key={post.id} className="group">
                      <Link
                        to={`/tin-tuc/${post.slug}`}
                        className="text-gray-200 group-hover:text-[#eab308] transition-colors font-medium text-sm block leading-snug"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                      />
                      <span className="text-gray-500 text-xs mt-1 block italic">{date}</span>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* RIGHT: Giới thiệu ngắn */}
          <div className="flex flex-col">
            <h4 className="text-white font-bold text-base uppercase mb-4 tracking-wide">
              VỀ CHÚNG TÔI
            </h4>
            <p className="leading-relaxed mb-6 text-gray-400">
              <strong className="text-white">TECHWORLD SOLUTIONS VIETNAM</strong> – Thành viên của{" "}
              <strong className="text-white">Techworld International</strong> (Australia). 
              Chúng tôi hợp tác cùng các tập đoàn công nghệ hàng đầu thế giới: {" "}
              <span className="text-blue-400">Microsoft, AWS, Epicor, Siemens</span> để cung cấp giải pháp chuyển đổi số toàn diện.
            </p>
            <div className="mt-auto pt-6 border-t border-white/10">
              <h5 className="text-[#eab308] font-bold text-lg italic mb-2">CƠ HỘI NGHỀ NGHIỆP</h5>
              <p className="text-white font-semibold">Gia nhập đội ngũ TECHWORLD SOLUTIONS VIETNAM ngay hôm nay!</p>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;