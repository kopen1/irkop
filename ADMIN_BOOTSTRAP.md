# Bootstrap admin pertama

## Langkah

```bash
WORKER="https://landing-page.<sub>.workers.dev"
ADM_TOKEN="<ADMIN_BOOTSTRAP_TOKEN value>"

# a) Daftar akun biasa (role=user default)
curl -sS -X POST "$WORKER/api/auth/register" \
  -H "content-type: application/json" \
  -d '{"email":"admin@irkop.pages.dev","name":"Site Admin","password":"<strong>"}'

# b) Promote via /api/admin/bootstrap (perlu handler + token)
curl -sS -X POST "$WORKER/api/admin/bootstrap" \
  -H "content-type: application/json" \
  -H "x-bootstrap-token: $ADM_TOKEN" \
  -d '{"email":"admin@irkop.pages.dev"}'
```

## Handler template (tambahkan ke worker/src jika belum ada)

```ts
// worker/src/handlers-bootstrap.ts
import { findUserByEmail, updateUserRole, logActivity } from './db';
import { jsonOk, HttpError } from './rbac';
import type { Env } from './index';

export async function handleBootstrap(request: Request, env: Env): Promise<Response> {
  const got = request.headers.get('x-bootstrap-token');
  if (!got || got !== env.ADMIN_BOOTSTRAP_TOKEN) {
    throw new HttpError(403, 'Invalid bootstrap token.', 'forbidden');
  }
  const body = await request.json().catch(() => null) as { email?: unknown } | null;
  if (!body || typeof body.email !== 'string') {
    throw new HttpError(400, 'email required.', 'bad_request');
  }
  const user = await findUserByEmail(env.DB, body.email);
  if (!user) throw new HttpError(404, 'User not registered.', 'not_found');
  await updateUserRole(env.DB, user.id, 'admin');
  await logActivity(env.DB, {
    id: crypto.randomUUID(), user_id: user.id, action: 'role_change',
    metadata: { from: 'user', to: 'admin', source: 'bootstrap' },
  });
  return jsonOk({ ok: true, user: { email: user.email, role: 'admin' } });
}
```

Daftarkan di `worker/src/index.ts`:
```ts
case method === 'POST' && url.pathname === '/api/admin/bootstrap':
  response = await handleBootstrap(request, env, ctx); break;
```

## Setelah admin pertama dibuat

- `wrangler secret delete ADMIN_BOOTSTRAP_TOKEN`
- (Opsional) Hard-remove endpoint agar tidak bisa di-misuse.
