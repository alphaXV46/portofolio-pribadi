# Blueprint Project: Website Portofolio

Dokumen ini mencakup tahap **1.1 Perencanaan (Requirement & Scope)** dan **2.2 Perancangan & Desain (Architecture & UI/UX)**. Setelah dokumen ini, kamu bisa langsung eksekusi coding tanpa perlu bolak-balik mikir ulang struktur.

---

# 1.1 Perencanaan (Requirement & Scope)

## 1.1.1 Tujuan Website

| Aspek | Deskripsi |
|---|---|
| **Tujuan utama** | Menampilkan profil profesional, proyek, dan keahlian secara meyakinkan agar dilihat recruiter, klien freelance, atau kolaborator potensial |
| **Tujuan sekunder** | Jadi sarana personal branding jangka panjang — mudah di-update tiap ada proyek baru |
| **Metrik keberhasilan** | Waktu muat halaman < 2 detik, lolos Core Web Vitals, form kontak menghasilkan minimal 1 lead per bulan |

## 1.1.2 Target Pengguna

| Persona | Kebutuhan | Prioritas Konten |
|---|---|---|
| **Recruiter / HR** | Scan cepat skill & pengalaman, unduh CV | Skills matrix, Experience timeline, tombol download CV |
| **Klien freelance / startup founder** | Bukti kualitas kerja nyata (case study), cara kontak cepat | Featured projects, demo live, contact form |
| **Sesama developer / kolaborator** | Detail teknis proyek, link GitHub | Tech stack badge, GitHub link, project detail page |

## 1.1.3 Daftar Fitur — MVP vs Fase Lanjutan

**Must-have (MVP — wajib rilis di versi pertama):**

- Homepage: Hero, About singkat, Skills, Featured Projects, Contact
- Halaman listing seluruh proyek + halaman detail per proyek
- Contact form yang benar-benar mengirim email (bukan sekadar UI)
- Responsive penuh (mobile, tablet, desktop)
- SEO dasar: meta tag, sitemap, robots.txt, Open Graph image
- Dark mode dengan gaya glassmorphism sebagai tema utama
- Halaman 404 custom

**Nice-to-have (Fase 2 — setelah MVP live):**

- Admin dashboard untuk CRUD proyek/skill/pengalaman tanpa sentuh kode
- Command palette (`Cmd+K`) untuk navigasi cepat
- Blog / case study panjang berbasis MDX
- Analytics dashboard (proyek mana yang paling sering dilihat)
- Multi-bahasa (ID/EN)
- Live status badge ("Open for freelance")

> **Rekomendasi:** Rilis MVP dulu dengan konten proyek dikelola manual (via file/DB langsung), baru bangun admin dashboard di Fase 2 kalau memang kamu akan sering update konten sendiri tanpa bantuan developer lain.

## 1.1.4 User Flow

**Flow 1 — Pengunjung (Visitor)**

```
Landing di Homepage
   -> Baca Hero + About
   -> Scroll ke Featured Projects
       -> Klik salah satu project card
       -> Masuk halaman detail proyek (deskripsi, gambar, tech stack, link demo/GitHub)
       -> Klik "Back to projects" atau lanjut lihat proyek lain
   -> Scroll ke Skills
   -> Scroll ke Contact Section
       -> Isi form (nama, email, pesan)
       -> Submit -> notifikasi sukses -> email masuk ke inbox pemilik web
```

**Flow 2 — Pengunjung melihat semua proyek**

```
Homepage -> Klik "View all projects" (di navbar atau featured section)
   -> Halaman /projects (grid semua proyek + filter kategori)
   -> Filter berdasarkan kategori (Fullstack / Backend / Mobile / Game)
   -> Klik proyek -> halaman detail
```

**Flow 3 — Admin (Fase 2, kalau pakai dashboard)**

```
/admin/login -> Autentikasi
   -> Dashboard: lihat daftar pesan masuk (belum dibaca)
   -> Kelola Proyek: tambah/edit/hapus, upload thumbnail, atur urutan tampil
   -> Kelola Skills & Experience
   -> Logout
```

---

# 2.2 Perancangan & Desain (Architecture & UI/UX)

## 2.2.1 Skema Database (ERD)

> Skema ini didesain untuk skenario **Fase 2 (dinamis dengan admin dashboard)**. Untuk MVP, kamu bisa pakai versi yang lebih ringan — lihat catatan di bawah tabel.

**Entitas dan relasi:**

- `ADMINS (1) --- (N) PROJECTS` — satu admin mengelola banyak proyek
- `PROJECTS (N) --- (N) TAGS` melalui tabel junction `PROJECT_TAGS` — satu proyek bisa punya banyak tech-stack tag, satu tag bisa dipakai banyak proyek
- `ADMINS (1) --- (N) SKILLS`
- `ADMINS (1) --- (N) EXPERIENCES`
- `CONTACT_MESSAGES` berdiri independen, hanya dibaca oleh admin dari dashboard

**Detail kolom per tabel:**

### `admins`
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid (PK) | |
| username | string, unique | |
| email | string, unique | |
| password_hash | string | di-hash pakai bcrypt/argon2, jangan pernah simpan plaintext |
| created_at | timestamp | |

### `projects`
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid (PK) | |
| slug | string, unique | untuk URL `/projects/[slug]` |
| title | string | |
| description | text | ringkasan singkat untuk card |
| content | text/markdown | isi lengkap case study (opsional, bisa juga tetap pakai MDX file) |
| thumbnail_url | string | |
| category | string | Fullstack / Backend / Mobile / Game, dsb |
| demo_url | string, nullable | |
| github_url | string, nullable | |
| is_featured | boolean | tampil di homepage atau tidak |
| display_order | int | urutan tampil manual |
| created_at, updated_at | timestamp | |

### `tags`
| Kolom | Tipe |
|---|---|
| id | uuid (PK) |
| name | string, unique (mis. "Next.js", "Laravel", "PostgreSQL") |

### `project_tags` (junction table)
| Kolom | Tipe |
|---|---|
| project_id | uuid (FK -> projects.id) |
| tag_id | uuid (FK -> tags.id) |

### `skills`
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid (PK) | |
| name | string | |
| category | string | Frontend / Backend / Tools / Database |
| icon | string | nama icon (Lucide) atau url |
| proficiency | int (1-5) | opsional, untuk progress bar |

### `experiences`
| Kolom | Tipe |
|---|---|
| id | uuid (PK) |
| company | string |
| role | string |
| start_date | date |
| end_date | date, nullable (null = masih aktif) |
| description | text |

### `contact_messages`
| Kolom | Tipe |
|---|---|
| id | uuid (PK) |
| name | string |
| email | string |
| message | text |
| is_read | boolean |
| created_at | timestamp |

> **Catatan skala — pilih salah satu:**
> - **Opsi ringan (disarankan untuk MVP solo-portfolio):** Simpan `projects`, `skills`, `experiences` sebagai file MDX/JSON di dalam repo (git-versioned, gratis, gak butuh server database). Hanya `contact_messages` yang benar-benar butuh database (atau bahkan cukup langsung kirim via email service tanpa disimpan sama sekali).
> - **Opsi penuh (kalau kamu mau update konten tanpa deploy ulang / mau punya admin dashboard):** Pakai skema lengkap di atas dengan **Prisma ORM** + **PostgreSQL** (via Supabase/Neon, keduanya punya free tier yang cukup untuk portofolio).

## 2.2.2 Wireframe & Struktur Layout Halaman

### Homepage (`/`)

```
┌─────────────────────────────────────────┐
│ Navbar: Logo | Home Projects Skills      │
│         Contact          [CV] [Theme]    │
├─────────────────────────────────────────┤
│                                           │
│     HERO SECTION                         │
│     Nama + Role (mis. "Fullstack Dev")   │
│     Deskripsi singkat 1-2 kalimat        │
│     [CTA: Lihat Proyek] [CTA: Kontak]    │
│     🟢 Status badge (opsional)           │
│                                           │
├─────────────────────────────────────────┤
│  ABOUT (singkat, 2-3 paragraf + foto)    │
├─────────────────────────────────────────┤
│  FEATURED PROJECTS                       │
│  [Card] [Card] [Card]                    │
│  -> "Lihat semua proyek"                 │
├─────────────────────────────────────────┤
│  SKILLS MATRIX                           │
│  Frontend | Backend | Tools | Database   │
├─────────────────────────────────────────┤
│  CONTACT                                 │
│  Form (Nama, Email, Pesan) + social link │
├─────────────────────────────────────────┤
│  Footer: copyright, social icons         │
└─────────────────────────────────────────┘
```

### Halaman Listing Proyek (`/projects`)

```
┌─────────────────────────────────────────┐
│ Navbar                                   │
├─────────────────────────────────────────┤
│ Judul "Semua Proyek"                     │
│ [Filter: All | Fullstack | Backend | ...]│
├─────────────────────────────────────────┤
│ [Card] [Card] [Card]                     │
│ [Card] [Card] [Card]                     │
│ (grid responsive 3 kolom -> 1 kolom mobile) │
└─────────────────────────────────────────┘
```

Setiap **project card** berisi: thumbnail, judul, deskripsi 1 baris, badge tech-stack (maks 3-4 terlihat, sisanya "+2"), link GitHub/demo icon.

### Halaman Detail Proyek (`/projects/[slug]`)

```
┌─────────────────────────────────────────┐
│ Navbar                                   │
├─────────────────────────────────────────┤
│ [Back to projects]                       │
│ Judul Proyek                             │
│ Badge tech-stack lengkap                 │
│ [Link Demo] [Link GitHub]                │
├─────────────────────────────────────────┤
│ Gambar/screenshot utama (besar)          │
├─────────────────────────────────────────┤
│ Konten case study (dari MDX/DB):         │
│  - Latar belakang & masalah              │
│  - Solusi & keputusan teknis             │
│  - Tantangan & pembelajaran              │
│  - Galeri screenshot tambahan            │
├─────────────────────────────────────────┤
│ Navigasi: Proyek sebelumnya / berikutnya │
└─────────────────────────────────────────┘
```

### Mobile Navigation

```
┌───────────────────┐
│ Logo         [☰]   │  <- hamburger, slide-in dari kanan
└───────────────────┘
        klik ☰
┌───────────────────┐
│           [X]      │
│  Home               │
│  Projects           │
│  Skills             │
│  Contact            │
│  [Download CV]      │
└───────────────────┘
```

> Untuk wireframe visual yang lebih presisi (drag-drop, prototyping klik-antar-halaman), pindahkan poin-poin di atas ke **Figma** — cukup buat frame per halaman dengan ukuran 1440px (desktop) dan 390px (mobile), lalu susun blok-blok di atas jadi kotak-kotak kasar dulu sebelum styling detail.

## 2.2.3 Pemilihan Tech Stack (Revisi Final)

| Layer | Teknologi | Alasan |
|---|---|---|
| **Framework** | Next.js 15+ (App Router) | SSR/SSG, SEO, routing berbasis folder |
| **Bahasa** | TypeScript | Type-safety, mengurangi bug runtime |
| **Styling** | Tailwind CSS v4 | Utility-first, rapid development |
| **Animasi** | Motion (rebrand dari Framer Motion) | Transisi halaman, efek scroll/hover |
| **Icon** | Lucide React | Ringan, konsisten dengan desain modern |
| **Konten statis (MVP)** | MDX + Velite | Pengganti Contentlayer yang sudah unmaintained |
| **Database (Fase 2)** | PostgreSQL (Supabase/Neon) + Prisma ORM | Kalau butuh admin dashboard dinamis |
| **Autentikasi admin (Fase 2)** | Auth.js (NextAuth v5) | Login admin panel |
| **Contact form backend** | Next.js Route Handler + Resend | Kirim email tanpa backend terpisah |
| **Validasi form** | Zod + React Hook Form | Validasi client & server konsisten |
| **Deployment** | Vercel | Auto-deploy dari Git, analytics bawaan |
| **Monitoring** | Vercel Analytics / Plausible | Tahu proyek mana yang paling dilihat |

---

## 2.2.4 Checklist Sebelum Mulai Coding

- [ ] Konten sudah disiapkan: teks about, daftar proyek + screenshot, daftar skill, CV PDF
- [ ] Domain sudah dibeli (opsional tapi disarankan untuk kesan profesional)
- [ ] Akun Resend/email service sudah dibuat untuk contact form
- [ ] Kalau pakai Fase 2 (DB): akun Supabase/Neon sudah disiapkan
- [ ] Referensi visual (2-3 portofolio developer lain yang kamu suka gayanya) sudah dikumpulkan untuk acuan styling

---

*Dokumen ini adalah fondasi. Langkah selanjutnya: scaffold project dengan `create-next-app`, lalu mulai dari komponen `Navbar` dan `Hero` sesuai wireframe di atas.*
