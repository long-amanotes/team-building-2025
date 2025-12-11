# Hướng dẫn chạy Local Development

## Chạy Frontend (Vite Dev Server)

```bash
npm run dev
```

Frontend sẽ chạy tại: `http://localhost:5173`

**Lưu ý:** API route (`/api/momo-activities`) sẽ **KHÔNG hoạt động** với `npm run dev` vì API routes cần Vercel runtime.

## Chạy với API Routes (Vercel Dev)

Để test cả frontend và API routes local:

```bash
# Cài đặt Vercel CLI (nếu chưa có)
npm i -g vercel

# Chạy với Vercel dev
vercel dev
```

Vercel dev sẽ:
- Chạy frontend (Vite)
- Chạy API routes tại `/api/*`
- Tự động detect và compile TypeScript cho API routes

## Test API Route

Sau khi chạy `vercel dev`, bạn có thể test API:

```bash
curl "http://localhost:3000/api/momo-activities"
```

Hoặc mở browser: `http://localhost:3000/api/momo-activities`

## Production

Khi deploy lên Vercel, cả frontend và API routes sẽ tự động hoạt động.
