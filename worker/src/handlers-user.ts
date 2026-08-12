import { listSessionsByUser, listActivity } from './db';
import { requireUser, jsonOk } from './rbac';
import type { Env } from './index';
import type { AuthContext } from './types';

export async function handleProfile(
  _request: Request,
  _env: Env,
  ctx: AuthContext,
): Promise<Response> {
  const auth = requireUser(ctx);
  return jsonOk({ user: auth.user });
}

export async function handleSessions(
  _request: Request,
  env: Env,
  ctx: AuthContext,
): Promise<Response> {
  const auth = requireUser(ctx);
  const sessions = await listSessionsByUser(env.DB, auth.user.id);

  const safe = sessions.map((s: any) => ({
    id: s.id,
    created_at: s.created_at,
    last_seen_at: s.last_seen_at,
    expires_at: s.expires_at,
    revoked_at: s.revoked_at,
    is_current: s.id === auth.session.id,
  }));

  return jsonOk({ sessions: safe });
}

export async function handleActivity(
  _request: Request,
  env: Env,
  ctx: AuthContext,
): Promise<Response> {
  const auth = requireUser(ctx);
  const rows = await listActivity(env.DB, 100, auth.user.id);

  const safe = rows.map((r: any) => ({
    id: r.id,
    action: r.action,
    metadata: r.metadata ? safeJsonParse(r.metadata) : null,
    created_at: r.created_at,
  }));

  return jsonOk({ activity: safe });
}

function safeJsonParse(s: string): unknown {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}
