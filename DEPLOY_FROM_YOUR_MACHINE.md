# Lanjut deploy dari mesin Anda

Sandbox tidak punya GitHub credentials, jadi push & deploy harus dari mesin lokal Anda.

## Status

| Komponen | Status | Detail |
|---|---|---|
| Cloudflare D1 `irkop-db` | ✅ Live | uuid `a7b24294-2888-4c24-a9c0-fa10fc100116`, region WNAM |
| `worker/wrangler.toml` | ✅ Patched dengan D1 id | di dalam zip ini |
| Local commit `be264b3` | ✅ Packaged sebagai zip & bundle | Lihat lampiran |
| GitHub repo `kopen1/irkop` | kosong, siap di-push | https://github.com/kopen1/irkop.git |
| Cloudflare Worker | ⏳ | deploy dari mesin Anda |
| Cloudflare Pages project | ⏳ | connect GitHub → Pages dari dashboard |
| Admin pertama | ⏳ | lihat `ADMIN_BOOTSTRAP.md` |

## Urutan langkah

### 1. (Sudah Anda lakukan) Buat repo kosong di GitHub
https://github.com/new → name: `irkop`, Private, tanpa README/license/gitignore.

### 2. Extract bundle & push
```bash
unzip irkop-repo.zip && cd repo
git init -b main
git add -A && git commit -m "Initial IRKOP scaffold"
git remote add origin https://github.com/kopen1/irkop.git
git push -u origin main        # User: kopen1, Password: <PAT>
```

### 3. Deploy Worker
```bash
cd worker
export CLOUDFLARE_API_TOKEN="<CF token>"
export CLOUDFLARE_ACCOUNT_ID="f813ce0ef79112878848b786643e63a8"
npx wrangler d1 migrations apply irkop-db --remote
echo "<32-byte-random>" | npx wrangler secret put SESSION_SECRET
echo "<bootstrap-token>" | npx wrangler secret put ADMIN_BOOTSTRAP_TOKEN
npx wrangler deploy            # catat Worker URL
```

### 4. Cloudflare Pages → connect GitHub
Dashboard → Pages → Create application → Connect to Git → pilih `kopen1/irkop`
- Project name: `irkop`
- Build command: `npx @cloudflare/next-on-pages@1`
- Build output: `.vercel/output/static`
- Env var: `WORKER_URL` = <Worker URL dari langkah 3>
- Save and Deploy

URL produksi: **https://home.irkop.workers.dev**

### 5. Admin pertama
Lihat `ADMIN_BOOTSTRAP.md`

### 6. Bersihkan
- Revoke GitHub PAT & Cloudflare API token dari dashboard
- (Opsional) Attach custom domain `irkop.page.dev` di Pages → Custom domains
