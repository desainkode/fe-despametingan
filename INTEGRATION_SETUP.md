# Frontend-Backend Integration Setup

## ✅ Sudah Selesai

### Frontend Setup
- **Lokasi**: `/home/smilarity/work/fe-despametingan`
- **API Configuration**: `.env.local` sudah dikonfigurasi
  ```
  NEXT_PUBLIC_API_URL=http://localhost:8000
  ```
- **API Services**: Sudah ada di `src/lib/api/`
  - `auth.ts` - Login, logout, getMe
  - `dashboard.ts` - Dashboard stats
  - `desa.ts` - Public & admin profil desa
  - `penduduk.ts` - Penduduk list & detail
  - `kartu-keluarga.ts` - Kartu keluarga management
  
- **Auth Context**: Sudah ada di `src/context/AuthContext.tsx`
  - Token management (localStorage + cookie)
  - Bearer token interceptor
  - Auto logout on 401

### Backend Setup (Partial)
- **Lokasi**: `/home/smilarity/work/be-pametingan`
- **API Routes**: Sudah konfigurasi di `routes/api.php`
  - `POST /login` - User login
  - `POST /logout` - User logout (protected)
  - `GET /me` - Current user (protected)
  - `GET /dashboard` - Dashboard stats (protected)
  - `GET/POST /desa/profile` - Profil desa (protected)
  - `GET /public/desa` - Public desa profile
  - `CRUD /penduduk` - Penduduk management (protected)
  - `CRUD /kartu-keluarga` - Kartu keluarga management (protected)

---

## ⚠️ Perlu Disetup Lanjutan

### 1. Install PHP & Dependencies (URGENT)
```bash
# Clear apt lock (jika ada issue)
sudo rm -f /var/lib/apt/lists/lock /var/cache/apt/archives/lock /var/lib/dpkg/lock*
sudo apt update

# Install PHP & required extensions
sudo apt install -y php-cli php-mbstring php-xml php-bcmath php-curl php-sqlite3

# Install Composer
sudo apt install -y composer

# Navigate to backend
cd /home/smilarity/work/be-pametingan

# Install PHP dependencies
composer install

# Generate application key
php artisan key:generate
```

### 2. Setup Database
```bash
cd /home/smilarity/work/be-pametingan

# Run migrations
php artisan migrate

# (Optional) Seed data
php artisan db:seed
```

### 3. Run Backend Server
```bash
cd /home/smilarity/work/be-pametingan

# Start Laravel development server (runs on port 8000)
php artisan serve
```

### 4. Run Frontend Server
```bash
cd /home/smilarity/work/fe-despametingan

# Install dependencies (if not done)
npm install

# Start dev server (runs on port 3000)
npm run dev
```

---

## 🔄 Integration Flow

### Login Flow
```
Frontend (admin/login) 
  → POST /api/login (email, password)
    → Backend validates credentials
    → Returns { user: {...}, token: "xxx" }
  → Frontend stores token in localStorage + cookie
  → AuthContext updates with user & token
  → Redirect to /admin/dashboard
```

### Protected Requests
```
Frontend API call (with @/lib/api)
  → Interceptor adds "Authorization: Bearer {token}"
  → Backend (Sanctum) validates token
  → If valid: Process request
  → If invalid (401): Frontend clears token & redirects to login
```

### Example: Get Dashboard Data
```typescript
// Frontend
import { getDashboardStats } from '@/lib/api/dashboard';

const stats = await getDashboardStats();
// Behind the scenes:
// GET /api/dashboard
// Header: Authorization: Bearer {token}
```

---

## 📝 Test Credentials (After Seeding)
```
Email: admin@example.com
Password: password
```

---

## 🐛 Troubleshooting

### API URL Not Working?
- Ensure backend is running on `http://localhost:8000`
- Check `.env.local` has correct `NEXT_PUBLIC_API_URL`
- Clear browser cache & restart dev server

### 401 Unauthorized?
- Token might be expired
- Check localStorage has `auth_token`
- Try logout and login again

### CORS Issues?
- Check backend `cors.php` config allows frontend origin
- By default should allow all for development

---

## 📦 API Response Format

Backend returns standardized format:
```json
{
  "data": { ... },
  "message": "Success"
}
```

Frontend API services already handle this format - data is automatically extracted.

---

## 🚀 Next Steps

1. **Fix system apt lock** (restart system if needed)
2. **Install PHP & Composer**
3. **Run `composer install` on backend**
4. **Run migrations**
5. **Start both servers**
6. **Test login flow**
7. **Test API endpoints**

---

**Status**: Frontend ✅ | Backend Ready (waiting PHP) ⏳
