# TaskFlow - Hệ thống Quản lý Task & Đội ngũ (Team Collaboration)

TaskFlow là một ứng dụng web quản lý công việc và cộng tác nhóm, được thiết kế để tối ưu hóa hiệu suất làm việc của các đội ngũ phát triển, doanh nghiệp nhỏ và các tổ chức. Dự án được phát triển dựa trên thiết kế UI từ Readdy.cc.

## 🚀 Tính năng chính

### 👥 Quản lý đội ngũ (Team Management)
- **Danh sách thành viên:** Xem danh sách thành viên trong team với thông tin vai trò.
- **Phân quyền (Roles):** Hỗ trợ Admin, Team Leader, và Member với các quyền hạn khác nhau.
- **Trạng thái online:** Theo dõi ai đang trực tuyến thời gian thực.

### ✅ Quản lý công việc (Task Management)
- **Tạo & Giao việc:** Tạo task mới với tiêu đề, mô tả, deadline và giao cho thành viên cụ thể.
- **Theo dõi tiến độ:** Cập nhật trạng thái task (Pending, In-Progress, Review, Done).
- **Lọc công việc:** Lọc task theo team, trạng thái hoặc độ ưu tiên.

### 🗓️ Chế độ xem đa dạng
- **Task Board:** Giao diện danh sách trực quan.
- **Lịch tương tác:** Theo dõi deadline thông qua Calendar.

### 🔐 Bảo mật & Quản trị
- **Xác thực JWT:** Hệ thống đăng nhập bảo mật với JSON Web Token.
- **Dashboard Admin:** Quản lý toàn diện user và team cho Superadmin.

## 🛠️ Công nghệ sử dụng

| Thành phần | Công nghệ |
| :--- | :--- |
| **Frontend** | React.js, Vite, Tailwind CSS, Lucide Icons, React Router |
| **Backend** | Node.js, Express |
| **Database** | MongoDB (Mongoose) |
| **Authentication** | JWT, bcryptjs |
| **Real-time** | Socket.IO |

## 📂 Cấu trúc thư mục

```text
TaskFlow/
├── frontend/             # Ứng dụng React (Vite)
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Route components (Home, Team, Dashboard...)
│   │   ├── hooks/        # Custom React hooks
│   │   ├── services/     # API calls (Axios/Fetch)
│   │   ├── store/        # State management (Zustand/Redux)
│   │   └── styles/       # Tailwind & Global CSS
├── backend/              # Node.js Express API
│   ├── src/
│   │   ├── controllers/  # Logic xử lý request
│   │   ├── models/       # Mongoose Schemas (User, Team, Task)
│   │   ├── routes/       # API endpoints definitions
│   │   ├── middleware/   # Auth & Error handling
│   │   └── config/       # Database & Env configurations
├── Dockerfile            # Cấu hình Docker
└── README.md             # Tài liệu hướng dẫn
```

## ⚙️ Cài đặt & Chạy dự án

### 1. Clone dự án
```bash
git clone https://github.com/Vinhdev04/TaskFlow.git
cd TaskFlow
```

### 2. Cài đặt Backend
```bash
cd backend
npm install
# Tạo file .env và cấu hình MONGO_URI, JWT_SECRET
npm start
```

### 3. Cài đặt Frontend
```bash
cd ../frontend
npm install
npm run dev
```

---
*Dự án được khởi tạo và cấu trúc bởi AI Assistant.*
