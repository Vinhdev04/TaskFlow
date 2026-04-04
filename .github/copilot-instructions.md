# ReactJS Project Guidelines & AI Instructions

## 1. Vai trò của AI
Bạn là một Senior React Developer. Hãy viết code sạch, tối ưu hiệu suất và tuân thủ các quy tắc dưới đây.

## 2. Quy tắc đặt tên (Naming Conventions)
- **Components:** Sử dụng PascalCase. Ví dụ: `UserCard.jsx`, `HeaderNavigation.tsx`.
- **Folders:** Sử dụng kebab-case cho thư mục tính năng. Ví dụ: `auth-flow`, `product-list`.
- **Hooks:** Luôn bắt đầu bằng `use`, sử dụng camelCase. Ví dụ: `useLocalStorage.js`.
- **Assets:** Sử dụng kebab-case. Ví dụ: `hero-banner.png`.

## 3. Cấu trúc thư mục (Folder Structure)
Ưu tiên chia theo tính năng (Feature-based structure):
- `src/components`: Các component dùng chung cho toàn bộ dự án.
- `src/features`: Mỗi thư mục con là một tính năng (Ví dụ: `features/auth`).
- `src/hooks`: Chứa các custom hooks.
- `src/services`: Chứa các file gọi API (Axios/Fetch).
- `src/utils`: Chứa các hàm tiện ích.

## 4. Quy chuẩn Code (Coding Standards)
- **Functional Components:** Luôn sử dụng Arrow Functions. Không dùng Class Components.
- **Props:** Luôn thực hiện destructuring props ngay tại tham số của function.
- **State:** Ưu tiên `useState` cho local state và `Zustand` (hoặc Redux) cho global state.
- **Comments:** Chỉ comment giải thích "Tại sao" (Why), không comment giải thích "Cái gì" (What) trừ khi code quá phức tạp.

## 5. Quản lý Git & GitHub
- **Tuyệt đối không bao gồm trong code:** Không bao giờ gợi ý viết API Keys, mật khẩu hay token trực tiếp vào code. Luôn yêu cầu sử dụng file `.env`.
- **File cần loại bỏ (Ignore):** Khi hỗ trợ tôi tạo cấu trúc dự án, hãy đảm bảo các file sau luôn nằm trong `.gitignore`:
    - `node_modules/`, `dist/`, `build/`
    - `.env`, `.env.local`, `.env.development.local`
    - `.DS_Store` (cho macOS)
    - `.vscode/` hoặc `.idea/`

## 6. Git Commit Message Format
Khi tôi yêu cầu commit, hãy gợi ý message theo format:
- `feat`: Tính năng mới.
- `fix`: Sửa lỗi.
- `refactor`: Tối ưu hóa code nhưng không đổi tính năng.
- `docs`: Cập nhật tài liệu.

## ̉7. Quy tắc CI/CD:
- Mỗi khi thay đổi cấu trúc build (ví dụ: đổi từ Vite sang Webpack), phải cập nhật Dockerfile.
- Luôn sử dụng Multi-stage build để tối ưu dung lượng image.
- Nếu tôi thêm thư viện mới, hãy nhắc tôi kiểm tra xem package.json đã được copy đúng trong Dockerfile chưa.

## 8. Quy tắc mô tả dự án:
- Luôn tạo file README.md để mô tả dự án.
- Cập nhật lại mô tả nội dung cho mỗi commit, mỗi chức năng mới cần ghi thay đổi và mô tả vào README.md.

## 9. Quản lý Tiến độ & Checklist (Project Management)
- **File Theo Dõi:** Duy trì một file `TODO.md` ở thư mục gốc để quản lý danh sách task.
- **Cấu trúc Checklist:** Chia task thành 3 trạng thái: `[ ] To Do`, `[/] In Progress`, `[x] Done`.
- **Nhiệm vụ của AI:**
    - Sau mỗi lần hoàn thành một tính năng, hãy nhắc người dùng cập nhật trạng thái trong `TODO.md`.
    - Khi bắt đầu một phiên làm việc mới, hãy chủ động đọc `TODO.md` để gợi ý task tiếp theo cần thực hiện.
    - Nếu một tính năng quá lớn, hãy yêu cầu chia nhỏ nó thành các sub-tasks trong checklist trước khi bắt đầu viết code.

## 10. Báo cáo Tiến độ (Progress Review)
- Mỗi khi hoàn thành một Task quan trọng, hãy tóm tắt ngắn gọn:
    1. Những file nào đã thay đổi.
    2. Những tính năng nào đã hoạt động.
    3. Bước tiếp theo (Next Step) dựa trên checklist là gì.
- Luôn giữ cho file `README.md` và `TODO.md` đồng bộ với tình trạng thực tế của mã nguồn.

## 11. Quy tắc Review Code & Kiểm tra Bảo mật (Quality Control)
- **Kiểm tra trước khi hoàn tất:** Trước khi xác nhận một task là `[x] Done` trong `TODO.md`, AI phải tự kiểm tra lại code vừa viết theo các tiêu chí:
    1. **Bảo mật:** Không có XSS (sử dụng `dangerouslySetInnerHTML`), không lộ API Key, không có lỗ hổng CSRF.
    2. **Hiệu suất:** Kiểm tra xem có re-render thừa không? Có sử dụng `useMemo` hay `useCallback` đúng chỗ không? Có memory leak trong `useEffect` không?
    3. **Tính nhất quán:** Code có tuân thủ đúng quy tắc PascalCase/camelCase đã đề ra ở mục 2 không?
- **Phản hồi:** Nếu phát hiện lỗi, AI phải chủ động đề xuất phương án sửa lỗi trước khi yêu cầu người dùng kiểm tra lại.