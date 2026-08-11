import { createSession, findSessionByTokenHash, touchSession, revokeSession, findUserById, toPublicUser } from './db';
const TTL = 60*60*24*7; const REFRESH_THRESHOLD = 60*60*24;
const COOKIE = 'irkop_sid';
const enc = new TextEncoder();

function randomToken(b=32){ const u = crypto.getRandomValues(new Uint8Array(b)); return Array.from(u).map(x=>x.toString(16).padStart(2,'0')).join(''); }
async function sha256Hex(s:string){ const b = await crypto.subtle.digest('SHA-256', enc.encode(s)); return Array.from(new Uint8Array(b)).map(x=>x.toString(16).padStart(2,'0')).join(''); }

export async function issueSession(db: D1Database, userId: string) {
  const raw = randomToken(32);
  const th = await sha256Hex(raw);
  const sid = crypto.randomUUID();
  const exp = new Date(Date.now()+TTL*1000).toISOString();
  await createSession(db, { id:sid, user_id:userId, token_hash:th, expires_at:exp });
  return { cookie: `${COOKIE}=${raw}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${TTL}`, tokenHash: th };
}
export function clearSessionCookie() { return `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`; }

export async function resolveSession(db: D1Database, cookieHeader: string|null) {
  if (!cookieHeader) return { user:null, session:null };
  const cookies = parseCookies(cookieHeader);
  const raw = cookies[COOKIE]; if (!raw) return { user:null, session:null };
  const th = await sha256Hex(raw);
  const s = await findSessionByTokenHash(db, th) as any;
  if (!s) return { user:null, session:null };
  const expMs = Date.parse(s.expires_at);
  if (!Number.isFinite(expMs) || expMs<Date.now()) { await revokeSession(db, s.id); return { user:null, session:null }; }
  if (expMs-Date.now() < REFRESH_THRESHOLD*1000) {
    const newExp = new Date(Date.now()+TTL*1000).toISOString();
    await touchSession(db, s.id, newExp); s.expires_at = newExp;
  }
  const u = await findUserById(db, s.user_id);
  if (!u || (u as any).status !== 'active') { await revokeSession(db, s.id); return { user:null, session:null }; }
  return { user: toPublicUser(u as any), session: s };
}

export async function revokeCurrentSession(db: D1Database, cookieHeader: string|null): Promise<boolean> {
  if (!cookieHeader) return false;
  const cookies = parseCookies(cookieHeader);
  const raw = cookies[COOKIE]; if (!raw) return false;
  const th = await sha256Hex(raw);
  const s = await findSessionByTokenHash(db, th) as any;
  if (!s) return false;
  await revokeSession(db, s.id);
  return true;
}

export function parseCookies(h:string){ return h.split(';').map(x=>x.trim()).filter(Boolean).reduce<Record<string,string>>((a,r)=>{const i=r.indexOf('='); if(i<=0) return a; a[r.slice(0,i).trim()]=decodeURIComponent(r.slice(i+1).trim()); return a;},{}); }
export async function hashIp(ip:string|null, secret:string|undefined): Promise<string|null> {
  if (!ip) return null; return sha256Hex(secret?`${secret}::${ip}`:ip);
}
