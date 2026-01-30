# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/c00af435-a0c6-4c29-84f3-1afdda12974b

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/c00af435-a0c6-4c29-84f3-1afdda12974b) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Fullstack Admin Dashboard (Backend + Frontend)

Struktur folder utama:

```
/server            -> Backend Node.js + Express + Prisma (MySQL)
/uploads           -> File thumbnail upload (dibuat otomatis oleh backend)
/src               -> Frontend React (portfolio + admin UI)
```

### Backend (Node.js + Express + Prisma + MySQL)

1. Masuk ke folder backend dan install dependencies:

```sh
cd server
npm install
```

2. Buat file environment `server/.env` berdasarkan contoh berikut:

```env
DB_URL="mysql://USER:PASSWORD@localhost:3306/portfolio_db"
JWT_SECRET="your-super-secret"
PORT=4000
CORS_ORIGIN="http://localhost:5173"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="admin12345"
```

3. Jalankan migrasi + seed data:

```sh
npx prisma migrate dev --name init
npm run seed
```

4. Jalankan backend:

```sh
npm run dev
```

### Frontend (React)

1. Install dependencies di root project:

```sh
npm install
```

2. Tambahkan `.env` di root (opsional) untuk base API:

```env
VITE_API_BASE="http://localhost:4000"
```

3. Jalankan frontend:

```sh
npm run dev
```

### CORS (contoh konfigurasi)

Backend sudah menggunakan konfigurasi berikut agar React bisa akses API:

```js
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
```

### REST API

Public:
- `GET /api/projects` -> hanya project published.
- `GET /api/projects/:slug` -> detail project published.

Admin (JWT protected):
- `POST /api/admin/login`
- `GET /api/admin/projects`
- `GET /api/admin/projects/:id`
- `POST /api/admin/projects`
- `PUT /api/admin/projects/:id`
- `DELETE /api/admin/projects/:id`
- `PATCH /api/admin/projects/:id/publish`
- `POST /api/admin/upload` (field `file`, simpan ke `/uploads` dan return URL)

### Seed Data

Seed akan membuat minimal 3 project + 1 admin user agar bisa langsung dites. 
Admin default bisa diubah melalui `ADMIN_EMAIL` dan `ADMIN_PASSWORD` di `.env`.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/c00af435-a0c6-4c29-84f3-1afdda12974b) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
