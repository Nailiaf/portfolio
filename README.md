# Portfolio (static site)

Website statis murni (HTML, CSS, JavaScript), tanpa build step. Siap di-hosting di Vercel.

## Struktur folder

```
portfolio/
├── index.html            # semua teks/isi halaman
├── css/
│   └── style.css         # warna, font, tampilan (ubah warna di blok :root paling atas)
├── js/
│   ├── projects.js       # data pop up "Read more" tiap proyek
│   └── main.js           # carousel, pop up, efek, menu mobile
├── assets/
│   └── images/           # taruh foto di sini (lihat README.txt di dalamnya)
│       ├── projects/
│       ├── organizations/
│       └── certificates/
├── favicon.svg
└── vercel.json           # pengaturan header untuk Vercel (opsional)
```

## Cara mengubah isi

| Mau ubah | Buka file | Cari |
|---|---|---|
| Deskripsi diri, nama, link email/GitHub | `index.html` | teks di bagian hero dan footer |
| Kartu proyek (judul, ringkasan, tag) | `index.html` | `<article class="news-card">` |
| Isi pop up proyek (fitur, peran, teknologi, link situs) | `js/projects.js` | `p1`, `p2`, ... |
| Pengalaman organisasi | `index.html` | `<article class="org-card reveal">` |
| Sertifikat | `index.html` | `<div class="cert-card reveal"` |
| Posisi yang diincar | `index.html` | `<div class="pos-card reveal">` |
| Warna dan font | `css/style.css` | blok `:root` di paling atas |

Semua isi yang bertanda `(dummy)` atau berkurung siku `[...]` adalah contoh, tinggal diganti.

## Menambah foto

Taruh file di `assets/images/` dengan nama persis seperti di `assets/images/README.txt`
(contoh: `profile.jpg`, `projects/project-1.jpg`). Fotonya muncul otomatis,
dan kalau file belum ada, placeholder yang tampil.

## Melihat hasil di komputer

Klik dua kali `index.html`, atau pakai server lokal supaya mirip aslinya:

```
npx serve .
```

## Deploy ke Vercel

**Lewat GitHub (disarankan, otomatis update tiap kamu push):**

1. Buat repository baru di GitHub, lalu upload seluruh isi folder ini.
2. Buka vercel.com, login, klik **Add New > Project**, pilih repository tadi.
3. Framework Preset: **Other**. Kosongkan Build Command dan Output Directory.
4. Klik **Deploy**. Selesai, kamu dapat alamat `nama-project.vercel.app`.

**Lewat Vercel CLI:**

```
npm i -g vercel
cd portfolio
vercel          # pertama kali (preview)
vercel --prod   # rilis ke production
```

Domain sendiri bisa ditambahkan di Vercel: **Project > Settings > Domains**.

## Catatan

- Font (Google Fonts) dan icon teknologi (Devicon) dimuat dari internet lewat CDN, jadi perlu koneksi.
- Untuk gambar pratinjau saat link dibagikan (Open Graph), tambahkan
  `<meta property="og:image" content="https://domainmu.com/assets/images/og-image.jpg">` di `index.html`.
