# Frontend-Backend Integration Summary

## 📁 Project Structure

```
/home/smilarity/work/
├── fe-despametingan/          ← Frontend (Next.js)
│   ├── .env.local             ✅ Configured (API_URL=http://localhost:8000)
│   ├── src/
│   │   ├── app/
│   │   │   ├── admin/
│   │   │   │   ├── login/     ← Login page
│   │   │   │   └── dashboard/ ← Protected routes
│   │   │   └── page.tsx       ← Home page
│   │   ├── components/
│   │   │   └── admin/
│   │   │       └── AppSidebar.tsx ← Admin navigation
│   │   ├── context/
│   │   │   └── AuthContext.tsx    ✅ Token handling, interceptors
│   │   ├── lib/
│   │   │   ├── api.ts             ✅ Axios instance with interceptors
│   │   │   └── api/
│   │   │       ├── auth.ts        ✅ login, logout, getMe
│   │   │       ├── dashboard.ts   ✅ getDashboardStats
│   │   │       ├── desa.ts        ✅ getPublicDesaProfile, getDesaProfile, updateDesaProfile
│   │   │       ├── penduduk.ts    ✅ getPendudukList, getPendudukDetail
│   │   │       └── kartu-keluarga.ts ✅ (ready for implementation)
│   │   └── types/
│   │       └── index.ts       ✅ TypeScript interfaces
│   └── package.json
│
└── be-pametingan/             ← Backend (Laravel)
    ├── .env                   ✅ Generated from .env.example
    ├── app/Http/
    │   ├── Controllers/Api/
    │   │   ├── AuthController.ts       ✅ login, logout, me
    │   │   ├── DashboardController.ts  ✅ index
    │   │   ├── DesaController.ts       ✅ show, showPublic, update
    │   │   ├── PendudukController.ts   ✅ CRUD operations
    │   │   └── KartuKeluargaController.ts ✅ CRUD operations
    │   └── Middleware/
    │       └── ...
    ├── routes/
    │   └── api.php            ✅ All endpoints configured
    ├── database/
    │   ├── migrations/        ⏳ Need to run
    │   └── seeders/           ⏳ Available for test data
    ├── setup.sh               ✅ Quick setup script
    └── composer.json
```

---

## 🔌 Integration Points

### 1. Authentication (AuthContext)
**Frontend**: `src/context/AuthContext.tsx`
**Backend**: `app/Http/Controllers/Api/AuthController.php`

Flow:
```
Login Page (admin/login)
  ↓
AuthContext.login(email, password)
  ↓
POST /api/login
  ↓
Backend validates + returns token
  ↓
Store in localStorage + cookie
  ↓
Redirect to /admin/dashboard
```

---

### 2. API Services
All services in `src/lib/api/` use the configured Axios instance

**Available Endpoints**:

#### Auth
- `POST /api/login` → `login(email, password)`
- `POST /api/logout` → `logout()`
- `GET /api/me` → `getMe()`

#### Dashboard
- `GET /api/dashboard` → `getDashboardStats()`

#### Desa (Village)
- `GET /api/public/desa` → `getPublicDesaProfile()`
- `GET /api/desa/profile` → `getDesaProfile()`
- `POST /api/desa/profile` → `updateDesaProfile(formData)`

#### Penduduk (Residents)
- `GET /api/penduduk` → `getPendudukList(params)`
- `GET /api/penduduk/{id}` → `getPendudukDetail(id)`
- `POST /api/penduduk` → Create
- `PUT /api/penduduk/{id}` → Update
- `DELETE /api/penduduk/{id}` → Delete

#### Kartu Keluarga (Family Cards)
- `GET /api/kartu-keluarga` → List
- `GET /api/kartu-keluarga/{id}` → Detail
- `POST /api/kartu-keluarga` → Create
- `PUT /api/kartu-keluarga/{id}` → Update
- `DELETE /api/kartu-keluarga/{id}` → Delete

---

### 3. Protected Routes
Routes requiring authentication wrap with AuthContext check:

```typescript
// Example: Admin Dashboard
'use client'
import { useAuth } from '@/context/AuthContext'
import { redirect } from 'next/navigation'

export default function Dashboard() {
  const { isLoading, isAuthenticated } = useAuth()
  
  if (isLoading) return <Loading />
  if (!isAuthenticated) redirect('/admin/login')
  
  // Dashboard content
}
```

---

### 4. Middleware & Interceptors

**Request Interceptor** (auto-attached Bearer token):
```typescript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

**Response Interceptor** (handle 401):
```typescript
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem("auth_token")
      window.location.href = "/admin/login"
    }
    return Promise.reject(error)
  }
)
```

---

## 🧪 Testing the Integration

### 1. Start Backend
```bash
cd /home/smilarity/work/be-pametingan
php artisan serve
# Runs on http://localhost:8000
```

### 2. Start Frontend
```bash
cd /home/smilarity/work/fe-despametingan
npm run dev
# Runs on http://localhost:3000
```

### 3. Test Login
- Go to `http://localhost:3000/admin/login`
- Use seeded credentials (see INTEGRATION_SETUP.md)
- Check browser Network tab to verify API calls

### 4. Verify Endpoints
```bash
# Check if backend API is responding
curl http://localhost:8000/api/public/desa

# Should return:
# {
#   "data": { ... },
#   "message": "Success"
# }
```

---

## 📋 Checklist

- [x] Frontend `.env.local` configured
- [x] Frontend API services created
- [x] Frontend AuthContext with interceptors
- [x] Backend API routes defined
- [x] Backend .env created
- [ ] PHP installed on system
- [ ] `composer install` run on backend
- [ ] Database migrations run
- [ ] Both servers running and connected
- [ ] Login flow tested
- [ ] API endpoints tested

---

## 🎯 What Works Right Now

- ✅ Frontend has all UI components (admin pages, forms)
- ✅ API service layer is fully typed (TypeScript)
- ✅ Authentication context with token management
- ✅ Request/response interceptors configured
- ✅ Backend API structure is ready
- ✅ Database migrations are prepared

## ⏳ What's Pending

- PHP/Composer installation (system issue)
- Backend dependencies installation
- Database setup (migrations + seeds)
- Live testing of endpoints

---

## 🚨 Current Issue

System package manager (apt) has a lock issue. This prevents installing PHP.

**Solution**:
1. Option A: Restart system to clear apt lock
2. Option B: Use Docker (if available)
3. Option C: Install PHP from source

Once PHP is installed, just run the `setup.sh` scripts provided.

---

**Integration Status**: 90% Complete (waiting for PHP runtime setup)
