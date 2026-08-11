import type { UserRow, PublicUser, Role, UserStatus } from './types';
export function toPublicUser(u: UserRow): PublicUser {
  return { id:u.id,email:u.email,name:u.name,avatar_url:u.avatar_url,
           role:u.role,status:u.status,email_verified_at:u.email_verified_at,
           created_at:u.created_at };
}
export async function findUserByEmail(db: D1Database,email:string){return db.prepare('SELECT * FROM users WHERE email=?').bind(email.trim().toLowerCase()).first<UserRow>();}
export async function findUserById(db: D1Database,id:string){return db.prepare('SELECT * FROM users WHERE id=?').bind(id).first<UserRow>();}
export async function createUser(db: D1Database, d:{id:string;email:string;password_hash:string;name:string;role:Role;status?:UserStatus}) {
  await db.prepare('INSERT INTO users (id,email,password_hash,name,role,status) VALUES (?,?,?,?,?,?)').bind(d.id,d.email.trim().toLowerCase(),d.password_hash,d.name,d.role,d.status??'active').run();
}
export async function listUsers(db:D1Database,limit=50,offset=0){const r=await db.prepare('SELECT * FROM users ORDER BY created_at DESC LIMIT ? OFFSET ?').bind(limit,offset).all<UserRow>();return r.results??[];}
export async function updateUserRole(db:D1Database,id:string,role:Role){await db.prepare("UPDATE users SET role=?, updated_at=strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE id=?").bind(role,id).run();}
export async function updateUserStatus(db:D1Database,id:string,status:UserStatus){await db.prepare("UPDATE users SET status=?, updated_at=strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE id=?").bind(status,id).run();}
export async function createSession(db: D1Database, d:{id:string;user_id:string;token_hash:string;expires_at:string}) {
  await db.prepare('INSERT INTO sessions (id,user_id,token_hash,expires_at) VALUES (?,?,?,?)').bind(d.id,d.user_id,d.token_hash,d.expires_at).run();
}
export async function findSessionByTokenHash(db: D1Database, th:string){return db.prepare('SELECT * FROM sessions WHERE token_hash=? AND revoked_at IS NULL').bind(th).first();}
export async function touchSession(db: D1Database, id:string, exp:string){await db.prepare("UPDATE sessions SET last_seen_at=strftime('%Y-%m-%dT%H:%M:%fZ','now'), expires_at=? WHERE id=?").bind(exp,id).run();}
export async function revokeSession(db: D1Database, id:string){await db.prepare("UPDATE sessions SET revoked_at=strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE id=?").bind(id).run();}
export async function listSessionsByUser(db:D1Database,uid:string){const r=await db.prepare('SELECT * FROM sessions WHERE user_id=? ORDER BY created_at DESC').bind(uid).all();return r.results??[];}
export async function logActivity(db: D1Database, d:{id:string;user_id:string|null;action:string;metadata?:Record<string,unknown>;ip_hash?:string}) {
  await db.prepare('INSERT INTO activity_logs (id,user_id,action,metadata,ip_hash) VALUES (?,?,?,?,?)').bind(d.id,d.user_id,d.action, d.metadata? JSON.stringify(d.metadata): null, d.ip_hash??null).run();
}
export async function listActivity(db:D1Database,limit:number,uid:string|null=null){
  const sql = uid?'SELECT * FROM activity_logs WHERE user_id=? ORDER BY created_at DESC LIMIT ?':'SELECT * FROM activity_logs ORDER BY created_at DESC LIMIT ?';
  const r = uid? await db.prepare(sql).bind(uid,limit).all() : await db.prepare(sql).bind(limit).all();
  return r.results??[];
}
