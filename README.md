# 🚀 TaskFlow — Phân Tích Nghiệp Vụ & Kế Hoạch Phát Triển

> **Mục tiêu**: Xây dựng ứng dụng quản lý công việc cá nhân & nhóm theo đúng thiết kế TaskFlow.  
> **Phương châm**: Chắc từng bước — hiểu rõ trước khi code, code xong phải test, test xong phải document.

---

## 📋 MỤC LỤC

1. [Phân Tích Màn Hình & Nghiệp Vụ](#1-phân-tích-màn-hình--nghiệp-vụ)
2. [Kiến Trúc Hệ Thống](#2-kiến-trúc-hệ-thống)
3. [Công Nghệ Sử Dụng](#3-công-nghệ-sử-dụng)
4. [Logic Nghiệp Vụ Quan Trọng](#4-logic-nghiệp-vụ-quan-trọng)
5. [Cấu Trúc Database](#5-cấu-trúc-database)
6. [API Endpoints](#6-api-endpoints)
7. [Kỹ Năng & Kiến Thức Cần Học](#7-kỹ-năng--kiến-thức-cần-học)
8. [Kế Hoạch Học & Làm Theo Ngày](#8-kế-hoạch-học--làm-theo-ngày)
9. [Checklist Tiến Độ](#9-checklist-tiến-độ)

---

## 1. PHÂN TÍCH MÀN HÌNH & NGHIỆP VỤ

### 📌 Màn hình 1 — Đăng Ký (Sign Up)

**Chức năng:**
- Form tạo tài khoản với: Full name, Email, Password
- Checkbox đồng ý Terms of Service & Privacy Policy (bắt buộc tick mới cho tạo)
- Nút "Create Account" với icon mũi tên
- Đăng ký nhanh qua GitHub / Twitter (OAuth)
- Link "Sign in" cho người đã có tài khoản

**Nghiệp vụ cần xử lý:**
- Validate email format (regex)
- Validate password: tối thiểu 8 ký tự, có chữ hoa/thường/số
- Kiểm tra email đã tồn tại chưa (realtime debounce check)
- Hash password phía server (bcrypt, không bao giờ lưu raw)
- Sau khi tạo: gửi email xác nhận (email verification flow)
- OAuth flow: nhận token từ GitHub/Twitter → tạo/link account

**Validation Rules:**
```
Full name: required, min 2 chars, max 100 chars
Email: required, valid email format, unique
Password: required, min 8 chars, regex /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/
Terms checkbox: must be checked
```

---

### 📌 Màn hình 2 — Đăng Nhập (Sign In)

**Chức năng:**
- Email + Password login
- Remember me checkbox (kéo dài session)
- Forgot password link
- OAuth: GitHub / Twitter
- Link "Sign up" cho người chưa có tài khoản

**Nghiệp vụ cần xử lý:**
- Xác thực credentials → trả về JWT access token + refresh token
- "Remember me": nếu tick → refresh token TTL = 30 ngày, không tick → 1 ngày
- Forgot password: gửi email reset link (có TTL 15 phút)
- Giới hạn login attempt: sau 5 lần sai → lock 15 phút (rate limiting)
- Lưu access token vào memory (không localStorage), refresh token vào httpOnly cookie

---

### 📌 Màn hình 3 & 6 — Hồ Sơ Cá Nhân (User Profile)

**Chức năng:**
- Banner ảnh bìa + Avatar (có thể upload)
- Thông tin: Tên, Chức danh, Trạng thái online, Bio
- Contact: Email, Location, Joined date, Team
- Social links: GitHub, Twitter, LinkedIn
- Tabs: Overview / Tasks / Activity
- Stats cards: Total Tasks, Completed, In Progress, Completion %
- Charts: Overall Completion Rate (progress bar), This Week's Activity (bar chart), Monthly Completed Tasks (line chart)
- Active Projects list với progress bar
- Skills tags
- Achievements badges

**Nghiệp vụ cần xử lý:**
- Upload avatar/banner: resize ảnh về chuẩn (avatar 200x200, banner 1200x300), lưu cloud storage (S3/Cloudinary)
- Online status: real-time (WebSocket hoặc polling mỗi 30s), auto offline sau 5 phút không hoạt động
- Stats được tính realtime từ DB khi mở profile
- Activity chart: tổng hợp số task completed theo ngày trong 7 ngày gần nhất
- Monthly chart: group by month, count tasks completed
- Completion rate = (completed tasks / total tasks) * 100

---

### 📌 Màn hình 4 & 5 — Danh Sách Task (My Tasks)

**Chức năng:**
- Header: tiêu đề "My Tasks", số lượng "10 of 10 tasks", nút "+ New Task"
- Search bar tìm kiếm task
- Filter button (lọc theo status, priority, due date)
- Table columns: Task name + Project tag, Status, Priority, Due Date
- Checkbox để check done
- Task có thể click để xem chi tiết
- Strikethrough cho task đã Done

**Status values:**
- `Done` (màu xanh lá)
- `In Progress` (màu xanh dương)
- `To Do` (màu xám)

**Priority values:**
- `High` (màu đỏ)
- `Medium` (màu cam)
- `Low` (màu xanh lá)

**Due Date display:**
- Quá hạn: "X days ago" (màu đỏ)
- Hôm nay: "Today" (màu vàng/cam)
- Ngày mai: "Tomorrow" (màu vàng)
- Tương lai: "In X days" (màu xanh)

**Nghiệp vụ cần xử lý:**
- Khi tick checkbox → status chuyển sang Done, text strikethrough, lưu completed_at
- Search: debounce 300ms, tìm kiếm theo tên task
- Filter: có thể kết hợp nhiều filter cùng lúc (AND logic)
- Sort: mặc định theo due date tăng dần
- Pagination hoặc infinite scroll
- Tính "X days ago" / "In X days" từ due_date và current date
- Khi task overdue: highlight màu đỏ

---

### 📌 Màn hình 7 — Dashboard Chính

**Chức năng:**
- Greeting: "Good evening, Alex 👋" + ngày hiện tại
- Sprint badge: "Q2 Sprint · Week 14" + "View Report"
- 4 stat cards: Total Tasks, In Progress, Completed, Overdue
- Overall Project Progress: danh sách project + % + progress bar màu sắc khác nhau
- Tasks Completed chart (bar chart - 7 ngày)
- Kanban Board với 3 cột: To Do / In Progress / Done
- Kanban cards: có priority badge, title, description
- Nút "+ New Task"

**Nghiệp vụ cần xử lý:**
- Greeting logic: Good morning (5-12h), Good afternoon (12-17h), Good evening (17-21h), Good night (21-5h)
- Stat cards: query aggregation từ DB, cache 5 phút
- Kanban: drag & drop để chuyển status task (thay đổi status + thứ tự trong cột)
- Kanban column count: số task trong mỗi cột (To Do 4, In Progress 4, Done 4)
- Nút "+" trên mỗi cột: tạo task mới với status mặc định của cột đó
- Overall completion = trung bình % của tất cả projects

---

### 📌 Màn hình 8 — Dự Án (Projects)

**Chức năng:**
- Header: "Projects", subtitle, nút "+ New Project"
- 3 summary cards: Avg Progress %, Active Projects count, Completed count
- Filter tabs: All / Active / Completed
- Search projects
- Project cards dạng grid (3 cột):
  - Icon màu + chữ cái đầu
  - Tên, mô tả
  - Progress bar + %
  - Task count + Due date
  - Member avatars
  - Status badge: Active / Completed / On Hold

**Nghiệp vụ cần xử lý:**
- Project color/icon được assign khi tạo (random từ bộ màu định sẵn)
- Progress = (completed tasks / total tasks) * 100
- Member avatars: hiện tối đa 3-4 avatar, số còn lại hiện "+N"
- Filter tab: query với where status = 'active' / 'completed'
- Avg Progress = trung bình progress của tất cả active projects

---

### 📌 Màn hình 9 — Nhóm (Team)

**Chức năng:**
- Header: "Team", subtitle, nút "+ Invite Member"
- 3 summary cards: Total Members, Online Now, Avg Completion Rate
- Filter tabs theo department: All / Engineering / Product / Design / Analytics / Quality
- Search members
- Grid/List view toggle
- Member cards:
  - Avatar + online indicator
  - Tên, chức danh
  - Department badge (màu theo department)
  - Workload progress bar + %
  - Số task done + active
  - Skills tags
  - Joined since date

**Nghiệp vụ cần xử lý:**
- Workload % = số active tasks / capacity mỗi người (config được)
- Online indicator: realtime qua WebSocket
- Invite member: gửi email với link join (có TTL 24h)
- Filter theo department: query với where department = X
- Completion rate per member = completed / total

---

### 📌 Màn hình 10 — Báo Cáo (Reports)

**Chức năng:**
- Header: "Reports", time filter: This Week / This Month / Last 3 Months
- 4 stat cards: Tasks Completed, In Progress, Overdue Tasks, Team Velocity (story points)
- Weekly Activity chart (grouped bar: Completed vs Created)
- Priority Breakdown (gauge/donut chart: High/Medium/Low với số lượng)
- Monthly Trend chart (line chart: Completed vs Created)
- Team Velocity chart (bar chart theo sprint weeks)

**Nghiệp vụ cần xử lý:**
- Tất cả charts thay đổi dữ liệu theo time filter (This Week/Month/3 Months)
- Team Velocity: dùng story points (mỗi task có story point, tổng theo sprint)
- Priority Breakdown: count tasks theo priority level
- Export report (PDF hoặc CSV) - tính năng nâng cao

---

## 2. KIẾN TRÚC HỆ THỐNG

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENT (Browser)                     │
│              React + TypeScript + Vite                   │
└─────────────────────┬───────────────────────────────────┘
                      │ HTTPS / WebSocket
┌─────────────────────▼───────────────────────────────────┐
│                  API GATEWAY / BFF                       │
│                   (Nginx / Kong)                         │
└─────────────────────┬───────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
┌───────▼──────┐ ┌────▼────┐ ┌─────▼──────┐
│  REST API    │ │ WebSocket│ │  Auth API  │
│  (Express/   │ │ Server   │ │ (JWT/OAuth)│
│   Fastify)   │ │ (Socket.io│ └─────┬──────┘
└───────┬──────┘ └────┬────┘       │
        │             │             │
┌───────▼─────────────▼─────────────▼──────┐
│              PostgreSQL (Primary)          │
│         Redis (Cache + Sessions)           │
│    S3/Cloudinary (File Storage)            │
└───────────────────────────────────────────┘
```

---

## 3. CÔNG NGHỆ SỬ DỤNG

### 🎨 Frontend

| Công nghệ | Phiên bản | Mục đích |
|-----------|-----------|----------|
| **React** | 18.x | UI framework, component-based |
| **TypeScript** | 5.x | Type safety, giảm lỗi runtime |
| **Vite** | 5.x | Build tool, HMR nhanh |
| **React Router v6** | 6.x | Client-side routing, nested routes |
| **Zustand** | 4.x | State management (nhẹ hơn Redux) |
| **TanStack Query** | 5.x | Server state, caching, refetch |
| **Tailwind CSS** | 3.x | Utility-first CSS |
| **Shadcn/UI** | latest | Component library (Radix-based) |
| **Recharts** | 2.x | Charts (bar, line, pie) |
| **dnd-kit** | 6.x | Drag & drop (Kanban board) |
| **React Hook Form** | 7.x | Form management |
| **Zod** | 3.x | Schema validation (FE + BE share) |
| **Axios** | 1.x | HTTP client |
| **Socket.io-client** | 4.x | Real-time WebSocket |
| **date-fns** | 3.x | Xử lý date/time |
| **Lucide React** | latest | Icon library |

### ⚙️ Backend

| Công nghệ | Phiên bản | Mục đích |
|-----------|-----------|----------|
| **Node.js** | 20.x LTS | Runtime |
| **Fastify** | 4.x | HTTP framework (nhanh hơn Express) |
| **TypeScript** | 5.x | Type safety |
| **Prisma** | 5.x | ORM, type-safe DB access |
| **JWT (jsonwebtoken)** | 9.x | Access token |
| **bcrypt** | 5.x | Hash password |
| **Passport.js** | 0.7.x | OAuth strategies |
| **Socket.io** | 4.x | WebSocket server |
| **Nodemailer** | 6.x | Gửi email |
| **Zod** | 3.x | Validation server-side |
| **Winston** | 3.x | Logging |
| **rate-limiter-flexible** | latest | Rate limiting |
| **Multer + Sharp** | latest | File upload + image resize |

### 🗄️ Database & Infrastructure

| Công nghệ | Mục đích |
|-----------|----------|
| **PostgreSQL 16** | Primary database (relational) |
| **Redis 7** | Cache, session, rate limit, pub/sub |
| **AWS S3 / Cloudinary** | File/image storage |
| **Docker + Docker Compose** | Local dev environment |
| **Nginx** | Reverse proxy, SSL termination |

### 🧪 Testing

| Công nghệ | Mục đích |
|-----------|----------|
| **Vitest** | Unit test (FE + BE) |
| **React Testing Library** | Component testing |
| **Playwright** | E2E testing |
| **Supertest** | API integration test |
| **MSW (Mock Service Worker)** | Mock API trong test |

---

## 4. LOGIC NGHIỆP VỤ QUAN TRỌNG

### 🔐 Authentication Flow

```
[Đăng nhập]
  → POST /auth/login (email + password)
  → Server verify password (bcrypt.compare)
  → Tạo access_token (JWT, TTL: 15 phút)
  → Tạo refresh_token (JWT, TTL: 7 ngày hoặc 30 ngày nếu remember_me)
  → Lưu refresh_token vào Redis (key: refresh:{userId}:{tokenId})
  → Set refresh_token vào httpOnly cookie
  → Trả về access_token trong response body

[Mỗi request]
  → Client gửi access_token trong Authorization header
  → Server verify JWT
  → Nếu hết hạn → client gọi POST /auth/refresh
  → Server verify refresh_token từ cookie + Redis
  → Tạo access_token mới

[Đăng xuất]
  → Xóa refresh_token khỏi Redis
  → Clear cookie
```

### 📊 Task Status Logic

```
Tạo task → status: 'todo'
Kéo sang In Progress (Kanban) → status: 'in_progress', started_at = now()
Tick checkbox / kéo sang Done → status: 'done', completed_at = now()
Quá due_date mà chưa done → overdue = true (computed field)

Due date display:
  diff = due_date - today
  if diff < 0  → "X days ago" (màu đỏ)
  if diff == 0 → "Today" (màu cam)
  if diff == 1 → "Tomorrow" (màu vàng)
  if diff > 1  → "In X days" (màu xanh)
```

### 📈 Dashboard Calculation

```
Total Tasks     = COUNT(tasks WHERE user_id = me AND deleted_at IS NULL)
In Progress     = COUNT(tasks WHERE status = 'in_progress' AND user_id = me)
Completed       = COUNT(tasks WHERE status = 'done' AND user_id = me)
Overdue         = COUNT(tasks WHERE due_date < NOW() AND status != 'done')
Completion Rate = (Completed / Total) * 100

Project Progress = (completed_tasks_in_project / total_tasks_in_project) * 100
Avg Progress     = AVG(project.progress) WHERE status = 'active'

Team Velocity   = SUM(story_points) WHERE sprint = current_sprint AND status = 'done'
```

### 🔄 Real-time Features (WebSocket)

```
Events cần handle:
- 'task:created'    → thêm task mới vào danh sách
- 'task:updated'    → cập nhật task trong UI
- 'task:deleted'    → xóa task khỏi UI
- 'task:moved'      → cập nhật vị trí trong Kanban
- 'user:online'     → cập nhật online indicator
- 'user:offline'    → cập nhật offline indicator
- 'notification'    → hiện toast notification
```

### 🔑 Role & Permission

```
Roles: Owner | Admin | Member | Viewer

Owner:  full access (tạo/xóa project, mời/xóa member)
Admin:  quản lý tasks + members, không xóa project
Member: tạo/sửa task của mình + trong project được assign
Viewer: chỉ đọc, không tạo/sửa
```

---

## 5. CẤU TRÚC DATABASE

```sql
-- Users
users (
  id UUID PK,
  full_name VARCHAR(100),
  email VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255),
  avatar_url TEXT,
  banner_url TEXT,
  bio TEXT,
  location VARCHAR(100),
  title VARCHAR(100),          -- "Product Manager"
  department VARCHAR(50),
  is_online BOOLEAN DEFAULT false,
  last_seen_at TIMESTAMP,
  email_verified_at TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- Projects
projects (
  id UUID PK,
  name VARCHAR(255),
  description TEXT,
  color VARCHAR(7),            -- hex color
  icon_letter CHAR(1),
  status ENUM('active','completed','on_hold'),
  owner_id UUID FK users,
  due_date DATE,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- Project Members (join table)
project_members (
  project_id UUID FK projects,
  user_id UUID FK users,
  role ENUM('owner','admin','member','viewer'),
  joined_at TIMESTAMP,
  PRIMARY KEY (project_id, user_id)
)

-- Tasks
tasks (
  id UUID PK,
  title VARCHAR(500),
  description TEXT,
  status ENUM('todo','in_progress','done'),
  priority ENUM('high','medium','low'),
  due_date DATE,
  story_points INT DEFAULT 1,
  position INT,                -- thứ tự trong cột Kanban
  project_id UUID FK projects,
  assignee_id UUID FK users,
  created_by UUID FK users,
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP         -- soft delete
)

-- Skills (cho user profile)
skills (
  id UUID PK,
  user_id UUID FK users,
  name VARCHAR(100)
)

-- Achievements
achievements (
  id UUID PK,
  user_id UUID FK users,
  title VARCHAR(255),
  description TEXT,
  icon VARCHAR(50),
  earned_at TIMESTAMP
)

-- Sprints
sprints (
  id UUID PK,
  project_id UUID FK projects,
  name VARCHAR(100),           -- "Q2 Sprint · Week 14"
  week_number INT,
  start_date DATE,
  end_date DATE,
  status ENUM('active','completed')
)

-- Sprint Tasks (join)
sprint_tasks (
  sprint_id UUID FK sprints,
  task_id UUID FK tasks,
  PRIMARY KEY (sprint_id, task_id)
)

-- Refresh Tokens
refresh_tokens (
  id UUID PK,
  user_id UUID FK users,
  token_hash VARCHAR(255),
  expires_at TIMESTAMP,
  created_at TIMESTAMP
)
```

---

## 6. API ENDPOINTS

### Auth
```
POST   /api/auth/register          Đăng ký
POST   /api/auth/login             Đăng nhập
POST   /api/auth/logout            Đăng xuất
POST   /api/auth/refresh           Refresh access token
POST   /api/auth/forgot-password   Quên mật khẩu
POST   /api/auth/reset-password    Đặt lại mật khẩu
GET    /api/auth/me                Lấy thông tin user hiện tại
GET    /api/auth/github            OAuth GitHub
GET    /api/auth/twitter           OAuth Twitter
```

### Users
```
GET    /api/users/:id              Profile user
PUT    /api/users/:id              Cập nhật profile
POST   /api/users/:id/avatar       Upload avatar
POST   /api/users/:id/banner       Upload banner
GET    /api/users/:id/stats        Stats (task counts, completion %)
GET    /api/users/:id/activity     Activity chart data
GET    /api/users/:id/tasks        Tasks của user
```

### Tasks
```
GET    /api/tasks                  Danh sách task (filter, sort, search)
POST   /api/tasks                  Tạo task mới
GET    /api/tasks/:id              Chi tiết task
PUT    /api/tasks/:id              Cập nhật task
DELETE /api/tasks/:id              Xóa task (soft delete)
PATCH  /api/tasks/:id/status       Đổi status
PATCH  /api/tasks/:id/position     Đổi vị trí (Kanban DnD)
```

### Projects
```
GET    /api/projects               Danh sách project
POST   /api/projects               Tạo project
GET    /api/projects/:id           Chi tiết project
PUT    /api/projects/:id           Cập nhật project
DELETE /api/projects/:id           Xóa project
GET    /api/projects/:id/tasks     Tasks trong project
GET    /api/projects/:id/members   Members
POST   /api/projects/:id/members   Thêm member
DELETE /api/projects/:id/members/:userId  Xóa member
```

### Team
```
GET    /api/team/members           Tất cả members
POST   /api/team/invite            Gửi lời mời
GET    /api/team/stats             Team statistics
```

### Dashboard
```
GET    /api/dashboard              Dashboard data (stats + charts)
GET    /api/dashboard/kanban       Kanban board data
```

### Reports
```
GET    /api/reports/overview       Tổng quan (filter: week/month/3months)
GET    /api/reports/weekly         Weekly activity chart
GET    /api/reports/monthly        Monthly trend chart
GET    /api/reports/velocity       Team velocity
GET    /api/reports/priority       Priority breakdown
```

---

## 7. KỸ NĂNG & KIẾN THỨC CẦN HỌC

### 🧠 Kiến Thức Nền Tảng Phải Vững

**JavaScript/TypeScript:**
- [ ] ES6+: destructuring, spread, optional chaining, nullish coalescing
- [ ] Async/await, Promise, event loop
- [ ] TypeScript: interface, type, generic, utility types (Partial, Pick, Omit)
- [ ] Module system: CommonJS vs ESModule

**React:**
- [ ] Hooks cơ bản: useState, useEffect, useCallback, useMemo, useRef
- [ ] Custom hooks: tách logic ra hook riêng
- [ ] Context API + useReducer
- [ ] Component composition patterns
- [ ] React Router v6: nested routes, lazy loading, loaders
- [ ] Render optimization: React.memo, useMemo, useCallback

**State Management:**
- [ ] Zustand: create store, actions, selectors, devtools
- [ ] TanStack Query: useQuery, useMutation, cache invalidation, optimistic updates
- [ ] Phân biệt: Server state (TanStack Query) vs Client state (Zustand)

**Styling:**
- [ ] Tailwind CSS: utility classes, responsive, dark mode
- [ ] CSS custom properties (variables)
- [ ] Tailwind config: custom colors, fonts, spacing
- [ ] Shadcn/UI: cách cài component, customize theme

**Backend:**
- [ ] REST API design: resource naming, HTTP methods, status codes
- [ ] Fastify: routes, plugins, hooks, schema validation
- [ ] Middleware pattern: authentication, error handling, logging
- [ ] JWT: structure, signing, verification, refresh token pattern
- [ ] bcrypt: hashing rounds, compare
- [ ] CORS: origins, credentials, preflight

**Database:**
- [ ] SQL cơ bản: SELECT, JOIN, WHERE, GROUP BY, ORDER BY, LIMIT
- [ ] PostgreSQL: data types, constraints, indexes
- [ ] Prisma: schema, migrations, CRUD, relations, raw queries
- [ ] Index: khi nào cần index, B-tree index, composite index
- [ ] Transaction: ACID, khi nào dùng transaction

**Real-time:**
- [ ] WebSocket vs HTTP: khi nào dùng cái nào
- [ ] Socket.io: rooms, namespaces, events, broadcast
- [ ] Redis Pub/Sub: pattern cho multi-server

**Bảo Mật:**
- [ ] OWASP Top 10: SQL injection, XSS, CSRF, broken auth
- [ ] Input sanitization vs validation
- [ ] httpOnly cookie vs localStorage (bảo mật token)
- [ ] Rate limiting: token bucket algorithm
- [ ] Helmet.js: security headers

**Testing:**
- [ ] Unit test: test từng function độc lập
- [ ] Integration test: test API endpoint
- [ ] E2E test: test flow hoàn chỉnh (user journey)
- [ ] Test coverage: không phải 100% là tốt nhất
- [ ] Mocking: tại sao cần mock, khi nào mock

**DevOps cơ bản:**
- [ ] Docker: Dockerfile, docker-compose, volumes, networks
- [ ] Environment variables: .env, không commit lên git
- [ ] Git: conventional commits, branching strategy (git flow)
- [ ] CI basics: tự động chạy test khi push code

### 🛠️ Tools Cần Cài & Dùng Thành Thạo

```
Code: VSCode + extensions (ESLint, Prettier, Prisma, Tailwind CSS IntelliSense)
DB: DBeaver (GUI cho PostgreSQL) hoặc TablePlus
API Test: Postman hoặc Bruno (open source, commit được)
Redis GUI: RedisInsight
Version Control: Git + GitHub
Container: Docker Desktop
```

---

## 8. KẾ HOẠCH HỌC & LÀM THEO NGÀY

> **Quy tắc mỗi ngày:**
> 1. Học lý thuyết (30-45 phút) — đọc docs, xem ví dụ
> 2. Code (2-3 giờ) — implement feature
> 3. Review code (30 phút) — tự đọc lại, refactor
> 4. Test (30 phút) — viết test hoặc test tay
> 5. Document (15 phút) — ghi lại những gì đã học/làm

---

### 📅 TUẦN 1 — Nền Tảng & Setup Môi Trường (Ngày 1-7)

#### Ngày 1 — Setup Dự Án & Môi Trường

**Học:**
- Tại sao dùng Monorepo? Cấu trúc thư mục hợp lý cho fullstack
- Docker Compose cơ bản: service, volume, network, port mapping
- `.env` và environment variable best practices

**Làm:**
```bash
# Tạo cấu trúc thư mục
taskflow/
├── apps/
│   ├── web/          # React frontend
│   └── api/          # Node.js backend
├── packages/
│   └── shared/       # Types, validators dùng chung
├── docker-compose.yml
├── .env.example
└── README.md

# Setup Docker Compose với:
# - PostgreSQL 16
# - Redis 7
# - pgAdmin (GUI)
```

**Review:** Kiểm tra services chạy, kết nối được database

**Test:** `docker-compose up -d` → tất cả services green

**Document:** Ghi lại cấu trúc thư mục, lý do chọn

---

#### Ngày 2 — Backend Setup & Database Schema

**Học:**
- Fastify vs Express: điểm khác biệt, lý do chọn Fastify
- Prisma schema: model, relation, enum, @id, @default, @unique
- Database migration: tại sao quan trọng, cách rollback

**Làm:**
- Init Fastify project với TypeScript
- Viết Prisma schema đầy đủ (users, projects, tasks, project_members)
- Chạy migration lần đầu
- Setup kết nối Prisma trong app

**Review:** Schema có đúng không? Relations có logical không?

**Test:** Thử seed data bằng Prisma seed script

**Document:** Viết mô tả từng table, từng column quan trọng

---

#### Ngày 3 — Authentication: Đăng Ký & Đăng Nhập

**Học:**
- JWT structure: header.payload.signature
- Access token vs Refresh token: tại sao cần 2 loại
- bcrypt: salt rounds, trade-off performance vs security
- httpOnly cookie: tại sao an toàn hơn localStorage

**Làm:**
- POST /api/auth/register (validate + hash + tạo user)
- POST /api/auth/login (verify + tạo JWT pair)
- Middleware xác thực token cho protected routes
- Lưu refresh token vào Redis

**Review:** Test các edge cases (email trùng, password sai)

**Test (Postman):**
- Register → 201 Created
- Register email trùng → 409 Conflict
- Login sai password → 401 Unauthorized
- Login đúng → nhận được access_token

**Document:** Vẽ sequence diagram auth flow

---

#### Ngày 4 — Authentication: Refresh Token & Forgot Password

**Học:**
- Token rotation: mỗi lần refresh thì tạo refresh token mới (bảo mật hơn)
- Email sending: SMTP, Nodemailer, email template
- Crypto: tạo secure random token cho reset password

**Làm:**
- POST /api/auth/refresh (verify refresh + tạo token mới)
- POST /api/auth/logout (xóa refresh token khỏi Redis)
- POST /api/auth/forgot-password (gửi email reset)
- POST /api/auth/reset-password (verify token + đổi password)

**Review:** Kiểm tra token rotation hoạt động đúng

**Test:**
- Refresh với token hợp lệ → token mới
- Refresh với token cũ sau rotation → 401
- Logout → token bị invalidate

**Document:** Ghi lại TTL của từng loại token

---

#### Ngày 5 — Frontend Setup & Routing

**Học:**
- Vite config: alias, env variables, proxy
- React Router v6: BrowserRouter, Routes, Route, Outlet, Navigate
- Protected Route pattern: redirect về login nếu chưa đăng nhập
- Lazy loading: React.lazy + Suspense

**Làm:**
- Init React + TypeScript + Vite
- Setup Tailwind CSS + Shadcn/UI
- Cấu hình React Router với layout:
  - Public routes: /login, /register
  - Protected routes: /dashboard, /projects, /team, /reports
- ProtectedRoute component (check auth → redirect)
- Zustand auth store (user, access_token, login/logout actions)

**Review:** Thử truy cập route protected khi chưa login

**Test:** Navigate giữa các trang, F5 vẫn giữ auth state

**Document:** Vẽ routing tree

---

#### Ngày 6 — Màn Hình Login & Register

**Học:**
- React Hook Form: register, handleSubmit, formState, errors
- Zod schema validation: z.string().email(), z.string().min()
- Controlled vs Uncontrolled components
- Axios instance: baseURL, interceptors, error handling

**Làm:**
- Màn hình Register (Image 1) — pixel perfect với design
- Màn hình Login (Image 2) — pixel perfect với design
- Axios instance với interceptor tự động thêm Authorization header
- Interceptor response: nếu 401 → tự động refresh token

**Review:** Form validation hiển thị đúng chưa? Error messages rõ ràng?

**Test:** Submit form rỗng, email sai format, password ngắn → lỗi đúng chỗ

**Document:** Ghi lại validation rules

---

#### Ngày 7 — Review Tuần 1 & Refactor

**Học:** Code review best practices, SOLID principles cơ bản

**Làm:**
- Đọc lại toàn bộ code tuần 1
- Refactor: tách functions quá dài, đặt tên biến rõ ràng hơn
- Viết unit tests cho auth utilities (hash, verify JWT)
- Fix bugs phát hiện

**Review:** Chạy lại tất cả tests

**Test:** Viết integration test cho auth endpoints

**Document:** Cập nhật README về những gì đã hoàn thành

---

### 📅 TUẦN 2 — Core Features: Tasks & Dashboard (Ngày 8-14)

#### Ngày 8 — Task API (CRUD)

**Học:**
- REST best practices: resource naming, idempotency
- Soft delete: deleted_at field, lý do không nên hard delete
- Prisma: create, findMany (với filter/sort/pagination), update, soft delete
- Query builder pattern: xây dựng where clause động

**Làm:**
- GET /api/tasks (filter by status, priority, search, sort)
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id (soft delete)
- PATCH /api/tasks/:id/status

**Review:** Query có đúng không? Filter kết hợp có work không?

**Test:** Test từng endpoint với nhiều case khác nhau

**Document:** Ghi lại query parameters cho GET /tasks

---

#### Ngày 9 — Màn Hình My Tasks (FE)

**Học:**
- TanStack Query: useQuery (fetch + cache), useMutation (create/update/delete)
- Optimistic updates: cập nhật UI trước, rollback nếu server báo lỗi
- Debounce: tại sao cần debounce search
- Table component pattern

**Làm:**
- Màn hình My Tasks (Images 4, 5) — pixel perfect
- Tích hợp API với TanStack Query
- Search với debounce 300ms
- Filter panel (status, priority)
- Tick checkbox → optimistic update status → Done

**Review:** UX flow có mượt không? Loading state có hiện không?

**Test:** Search, filter, tick task hoạt động đúng

**Document:** Ghi lại optimistic update pattern

---

#### Ngày 10 — Dashboard: Stats & Charts

**Học:**
- Recharts: BarChart, LineChart, CartesianGrid, Tooltip, Legend
- Responsive charts: ResponsiveContainer
- useMemo cho data transformation (tránh re-compute)
- Aggregation queries trong Prisma ($queryRaw, groupBy)

**Làm:**
- Dashboard API: GET /api/dashboard (trả về tất cả stats)
- Màn hình Dashboard phần trên (Image 7): stat cards + charts
- Bar chart "Tasks Completed" 7 ngày
- Project progress bars

**Review:** Số liệu có chính xác không?

**Test:** Tạo task, xóa task → dashboard cập nhật đúng

**Document:** Ghi lại cách tính từng metric

---

#### Ngày 11 — Kanban Board

**Học:**
- dnd-kit: DndContext, SortableContext, useSortable, useDroppable
- Drag events: onDragStart, onDragOver, onDragEnd
- Optimistic reorder: cập nhật position ngay, gửi API ngầm
- Array reordering algorithms

**Làm:**
- Kanban Board component (Image 7 phần dưới)
- 3 columns: To Do, In Progress, Done
- Drag task giữa columns → cập nhật status
- Drag task trong cùng column → cập nhật position
- PATCH /api/tasks/:id/position endpoint

**Review:** Drag behavior có smooth không? Edge cases?

**Test:** Drag qua lại nhiều lần → order vẫn đúng

**Document:** Ghi lại position algorithm

---

#### Ngày 12 — Projects: API & Màn Hình

**Học:**
- Many-to-many relation trong Prisma (project_members)
- Aggregate: COUNT, AVG trong Prisma
- Grid layout responsive với Tailwind

**Làm:**
- Projects CRUD API
- Màn hình Projects (Image 8)
- Project cards với progress bar, member avatars
- Filter tabs (All/Active/Completed)
- "+ New Project" modal

**Review:** Progress tính đúng không? Avatars hiện đúng không?

**Test:** Tạo project, thêm task, kiểm tra progress thay đổi

**Document:** Ghi lại project status transitions

---

#### Ngày 13 — Team: API & Màn Hình

**Học:**
- Workload calculation logic
- Invite system: email token, expiry, one-time use
- Filter + search kết hợp

**Làm:**
- Team API (members, stats, invite)
- Màn hình Team (Image 9)
- Member cards với workload bar
- Filter theo department
- "+ Invite Member" modal với email input

**Review:** Workload % tính có đúng không?

**Test:** Invite member → nhận email → click link → join

**Document:** Ghi lại invite flow

---

#### Ngày 14 — Review Tuần 2 & Refactor

**Làm:**
- Code review toàn bộ tuần 2
- Viết thêm tests cho Task API
- Performance: kiểm tra slow queries (thêm index nếu cần)
- Fix UX issues phát hiện khi dùng

**Document:** Update README checklist

---

### 📅 TUẦN 3 — User Profile, Reports & Real-time (Ngày 15-21)

#### Ngày 15 — User Profile: API & Màn Hình

**Học:**
- File upload: multipart/form-data, Multer
- Image processing: Sharp (resize, compress, convert)
- Signed URL với S3/Cloudinary (thay vì expose trực tiếp)

**Làm:**
- User Profile API (GET profile, PUT update, POST avatar)
- Màn hình Profile (Images 3, 6)
- Upload avatar/banner
- Skills tags (thêm/xóa)
- Achievements list

**Review:** Upload hoạt động không? Ảnh compress đúng không?

**Test:** Upload file không phải ảnh → lỗi; Upload ảnh 10MB → compress về <500KB

**Document:** Ghi lại image processing pipeline

---

#### Ngày 16 — Reports: API & Charts

**Học:**
- Complex aggregation queries: GROUP BY date, date_trunc
- Chart.js vs Recharts: tradeoffs
- Gauge chart / semi-donut chart

**Làm:**
- Reports API (weekly, monthly, priority, velocity)
- Màn hình Reports (Image 10)
- Weekly Activity bar chart (grouped: created vs completed)
- Monthly Trend line chart
- Priority Breakdown gauge chart
- Team Velocity bar chart
- Time filter (This Week / This Month / Last 3 Months)

**Review:** Đổi time filter → data thay đổi đúng không?

**Test:** Tạo tasks trong nhiều ngày, kiểm tra charts

**Document:** Ghi lại query cho từng chart

---

#### Ngày 17 — WebSocket & Real-time Online Status

**Học:**
- Socket.io: rooms (1 room per user), namespace
- Presence system: heartbeat, timeout
- Redis Pub/Sub: tại sao cần khi scale multi-server
- Debounce emit: tránh emit quá nhiều

**Làm:**
- Socket.io server setup
- Client connect khi login, disconnect khi logout
- Online status: cập nhật is_online trong DB + emit event
- Auto-offline sau 5 phút không có heartbeat
- Hiển thị online indicator trong Team page và Profile

**Review:** Switch tab → offline sau timeout? Reconnect khi mạng về?

**Test:** Mở 2 tab → 1 tab close → tab kia thấy offline

**Document:** Ghi lại heartbeat interval và timeout logic

---

#### Ngày 18 — Real-time Task Updates

**Học:**
- Room strategy cho task updates: project room vs user room
- Optimistic update + server confirmation
- Handling conflicts: 2 người cùng edit 1 task

**Làm:**
- Emit task events khi create/update/delete
- Client lắng nghe events → cập nhật TanStack Query cache
- Thông báo real-time khi task được assign cho mình
- Toast notification component

**Review:** 2 người cùng xem cùng task list → 1 người thêm → người kia thấy ngay?

**Test:** Mở 2 tab khác nhau, thêm task ở tab 1, tab 2 tự cập nhật

**Document:** Ghi lại event naming convention

---

#### Ngày 19 — OAuth: GitHub & Twitter Login

**Học:**
- OAuth 2.0 flow: authorization code flow
- Passport.js: strategy pattern
- Linking OAuth account với existing account (cùng email)
- State parameter: chống CSRF trong OAuth

**Làm:**
- GitHub OAuth strategy
- Twitter OAuth strategy
- Callback handler: tìm user theo email → login, không có → tạo mới
- Frontend: nút GitHub/Twitter dẫn đúng URL

**Review:** OAuth flow có redirect đúng không sau login?

**Test:** Login với GitHub → về dashboard

**Document:** Ghi lại OAuth flow diagram

---

#### Ngày 20 — Error Handling & Logging

**Học:**
- Error types: Operational errors vs Programming errors
- Global error handler trong Fastify
- Winston: log levels (error, warn, info, debug), log rotation
- HTTP status codes: khi nào dùng 400, 401, 403, 404, 409, 422, 500

**Làm:**
- Custom error classes (AppError, ValidationError, NotFoundError, UnauthorizedError)
- Global error handler middleware
- Chuẩn hóa error response format: `{ success: false, error: { code, message } }`
- Setup Winston logging với file rotation
- Frontend: global error boundary + toast cho API errors

**Review:** Mọi error đều có format nhất quán?

**Test:** Trigger các loại lỗi khác nhau, kiểm tra response

**Document:** Ghi lại error codes và meanings

---

#### Ngày 21 — Review Tuần 3 & Kiểm Thử Tích Hợp

**Làm:**
- Viết integration tests cho Reports API
- E2E test với Playwright: flow đăng nhập → tạo task → hoàn thành task
- Performance: check N+1 queries với Prisma logging
- Thêm indexes cho các cột thường query (user_id, project_id, status, due_date)

**Document:** Test coverage report, danh sách bugs đã fix

---

### 📅 TUẦN 4 — Hoàn Thiện, Kiểm Thử & Deployment (Ngày 22-28)

#### Ngày 22 — Rate Limiting & Bảo Mật

**Học:**
- OWASP Top 10 (đọc lướt, focus vào những cái liên quan)
- Helmet.js: security headers (CSP, HSTS, X-Frame-Options)
- CORS: credentials mode, allowed origins
- Input sanitization: DOMPurify phía FE

**Làm:**
- Thêm rate limiting: 100 req/phút cho API, 5 req/phút cho login
- Setup Helmet cho tất cả responses
- Configure CORS đúng (chỉ allow origin của FE)
- Sanitize tất cả user inputs

**Review:** Test rate limit: gửi 10 req liên tiếp cho /auth/login → bị block

**Test:** Thử một số XSS payloads → không execute được

**Document:** Ghi lại security config

---

#### Ngày 23 — Search & Notification

**Học:**
- Full-text search trong PostgreSQL: tsvector, to_tsquery
- Notification data model
- Unread count badge

**Làm:**
- Cải thiện search: full-text search cho task title + description
- Notification system: lưu notifications, đánh dấu đã đọc
- Bell icon với unread count badge
- Notification dropdown

**Review:** Search "sprint" → trả về tất cả tasks có từ sprint

**Test:** Được assign task → nhận notification → đọc → count về 0

**Document:** Ghi lại notification trigger events

---

#### Ngày 24 — UI Polish & Responsive

**Học:**
- Responsive design: mobile-first approach
- Tailwind breakpoints: sm, md, lg, xl
- Skeleton loading state
- Empty states design

**Làm:**
- Làm mọi màn hình responsive (mobile + tablet + desktop)
- Skeleton loading cho tất cả danh sách
- Empty states khi không có dữ liệu
- Loading spinner/button khi submit form

**Review:** Test trên mobile (responsive DevTools)

**Test:** Kiểm tra mọi màn hình ở 375px, 768px, 1280px

**Document:** Ghi lại breakpoints đã dùng

---

#### Ngày 25 — Performance Optimization

**Học:**
- React: React.memo, useMemo, useCallback — khi nào thực sự cần
- Code splitting: dynamic import, React.lazy
- TanStack Query: staleTime, gcTime, prefetching
- Backend: caching với Redis, query optimization

**Làm:**
- Lazy load các route (Dashboard, Projects, Team, Reports)
- Cache dashboard data trong Redis 5 phút
- Optimize heavy queries (thêm explain analyze)
- Image lazy loading

**Review:** Lighthouse score trên dashboard

**Test:** Hard refresh → dashboard load < 2s

**Document:** Ghi lại gì đã cache, TTL bao lâu

---

#### Ngày 26 — Viết Tests Hoàn Chỉnh

**Học:**
- Testing pyramid: unit > integration > E2E
- Test naming convention: "should [action] when [condition]"
- Code coverage: tập trung coverage business logic

**Làm:**
- Unit tests: auth utilities, date calculations, task status logic
- Integration tests: tất cả API endpoints (happy path + error cases)
- E2E tests với Playwright:
  - Flow: Register → Login → Create Task → Complete Task
  - Flow: Create Project → Add Task → View Report

**Review:** Coverage report cho business logic >= 80%

**Test:** Chạy `npm test` → tất cả pass

**Document:** Ghi lại cách chạy tests

---

#### Ngày 27 — Docker & Deployment Prep

**Học:**
- Dockerfile: multi-stage build (builder → runner)
- docker-compose.production.yml: không mount source code
- Environment variables: không hardcode, dùng .env
- Health checks

**Làm:**
- Dockerfile cho FE (build static + Nginx serve)
- Dockerfile cho BE (multi-stage)
- docker-compose.production.yml
- Nginx config: reverse proxy, gzip, cache static assets
- Health check endpoint: GET /api/health

**Review:** Build docker image → chạy production → mọi thứ work

**Test:** docker-compose -f docker-compose.production.yml up → app chạy đúng

**Document:** Deployment steps

---

#### Ngày 28 — Final Review & Documentation

**Làm:**
- Code review toàn bộ codebase
- Viết JSDoc/TSDoc cho các function quan trọng
- Update README.md với:
  - Installation instructions
  - Environment variables guide
  - Running tests guide
  - Architecture diagram
- Tạo Postman collection với tất cả endpoints
- Demo walkthrough: chạy app, test từng feature

**Document:**
- What worked well
- What was challenging
- What would you do differently

---

## 9. CHECKLIST TIẾN ĐỘ

### 🔐 Authentication
- [ ] Register API
- [ ] Login API (JWT)
- [ ] Refresh Token
- [ ] Logout
- [ ] Forgot Password
- [ ] Reset Password
- [ ] OAuth GitHub
- [ ] OAuth Twitter
- [ ] Login UI
- [ ] Register UI

### 📋 Tasks
- [ ] Task CRUD API
- [ ] Filter & Search API
- [ ] Soft Delete
- [ ] My Tasks UI
- [ ] Task status toggle (checkbox)
- [ ] Search + Debounce
- [ ] Filter panel
- [ ] Due date color logic

### 🎯 Dashboard
- [ ] Stats aggregation API
- [ ] Dashboard UI (stat cards)
- [ ] Project progress bars
- [ ] Bar chart (7 days)
- [ ] Kanban board UI
- [ ] Drag & drop between columns
- [ ] Drag within column (reorder)

### 📁 Projects
- [ ] Project CRUD API
- [ ] Projects list UI
- [ ] Project cards (progress, members)
- [ ] Filter tabs
- [ ] New project modal

### 👥 Team
- [ ] Team members API
- [ ] Team UI (member cards)
- [ ] Department filter
- [ ] Invite member (email)
- [ ] Workload calculation

### 👤 Profile
- [ ] Profile API
- [ ] Profile UI
- [ ] Upload avatar/banner
- [ ] Stats charts on profile
- [ ] Skills management
- [ ] Achievements display

### 📊 Reports
- [ ] Weekly activity chart API
- [ ] Monthly trend API
- [ ] Priority breakdown API
- [ ] Team velocity API
- [ ] Reports UI với 4 charts
- [ ] Time filter switching

### ⚡ Real-time
- [ ] WebSocket server setup
- [ ] Online/offline status
- [ ] Task real-time updates
- [ ] Notifications
- [ ] Notification badge

### 🛡️ Security & Quality
- [ ] Rate limiting
- [ ] Security headers (Helmet)
- [ ] Input sanitization
- [ ] Error handling chuẩn
- [ ] Winston logging
- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests (Playwright)
- [ ] Performance optimization
- [ ] Responsive (mobile/tablet)
- [ ] Loading states / Skeleton
- [ ] Empty states

### 🚀 Deployment
- [ ] Dockerfile (FE + BE)
- [ ] Docker Compose production
- [ ] Nginx config
- [ ] Health check endpoint
- [ ] Final documentation

---

## 📊 TIẾN ĐỘ TỔNG QUAN

| Tuần | Nội Dung | Trạng Thái |
|------|----------|------------|
| Tuần 1 (Ngày 1-7)   | Setup, Auth API, Auth UI | ⬜ Chưa bắt đầu |
| Tuần 2 (Ngày 8-14)  | Tasks, Dashboard, Kanban, Projects, Team | ⬜ Chưa bắt đầu |
| Tuần 3 (Ngày 15-21) | Profile, Reports, WebSocket, OAuth | ⬜ Chưa bắt đầu |
| Tuần 4 (Ngày 22-28) | Security, Testing, Performance, Deploy | ⬜ Chưa bắt đầu |

---

*Cập nhật lần cuối: Khởi tạo — Tháng 4, 2026*