import { hashPassword, verifyPassword, validatePasswordPolicy } from './password';
import { createUser, findUserByEmail, findUserById, toPublicUser, logActivity } from './db';
import { clearSessionCookie, issueSession, revokeCurrentSession } from './sessions';
import { requireUser, jsonOk, HttpError } from './rbac';
import type { Env } from './index';
import type { AuthContext } from './types';

function validateEmail(e:unknown):string|null {
  if(typeof e!=='string') return null;
  const t = e.trim().toLowerCase();
  if (t.length<3 || t.length>254) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)) return null;
  return t;
}
function validateName(n:unknown):string|null {
  if(typeof n!=='string') return null;
  const t = n.trim(); if (t.length<2||t.length>80) return null; return t;
}
async function rateLimit(env:Env, key:string, limit:number, windowSec:number){
  const since = new Date(Date.now()-windowSec*1000).toISOString();
  const r = await env.DB.prepare('SELECT COUNT(*) as n FROM activity_logs WHERE action=? AND created_at>?').bind(key,since).all<{n:number}>();
  if ((r.results?.[0]?.n??0)>=limit) throw new HttpError(429,'Too many requests.','rate_limited');
}

export async function handleRegister(request:Request, env:Env, ctx:AuthContext, ipHash:string|null){
  await rateLimit(env,'register:'+(ipHash??'anon'),5,600);
  if (ctx.user) throw new HttpError(409,'Already authenticated.','already_authenticated');
  const body = await request.json().catch(()=>null) as any;
  if(!body) throw new HttpError(400,'Invalid body.','bad_request');
  const email = validateEmail(body.email); if(!email) throw new HttpError(400,'Invalid email.','bad_email');
  const name = validateName(body.name); if(!name) throw new HttpError(400,'Invalid name.','bad_name');
  const pw = body.password; if(typeof pw!=='string') throw new HttpError(400,'Invalid password.','bad_password');
  const pe = validatePasswordPolicy(pw); if(pe) throw new HttpError(400,pe,'weak_password');
  const existing = await findUserByEmail(env.DB,email);
  if(existing) throw new HttpError(409,'Could not create account.','registration_failed');
  const userId = crypto.randomUUID();
  await createUser(env.DB,{ id:userId, email, password_hash: await hashPassword(pw), name, role:'user', status:'active' });
  await logActivity(env.DB,{ id:crypto.randomUUID(), user_id:userId, action:'register', metadata:{email}, ip_hash:ipHash });
  const {cookie}=await issueSession(env.DB,userId);
  const u = await findUserById(env.DB,userId);
  return jsonOk({user:toPublicUser(u as any)},201,{'set-cookie':cookie});
}

export async function handleLogin(request:Request, env:Env, ctx:AuthContext, ipHash:string|null){
  await rateLimit(env,'login:'+(ipHash??'anon'),10,60);
  if(ctx.user) throw new HttpError(409,'Already authenticated.','already_authenticated');
  const body = await request.json().catch(()=>null) as any;
  if(!body) throw new HttpError(400,'Invalid body.','bad_request');
  const email = validateEmail(body.email);
  const pw = body.password;
  if(!email || typeof pw!=='string') throw new HttpError(401,'Invalid credentials.','invalid_credentials');
  const u = await findUserByEmail(env.DB,email);
  let ok = false;
  if (u) ok = await verifyPassword(pw, (u as any).password_hash);
  else await verifyPassword(pw, 'pbkdf2$600000$00$'+('0'.repeat(96)));
  if(!u||!ok) throw new HttpError(401,'Invalid credentials.','invalid_credentials');
  if((u as any).status!=='active') throw new HttpError(403,'Account unavailable.','account_unavailable');
  const {cookie}=await issueSession(env.DB,(u as any).id);
  await logActivity(env.DB,{id:crypto.randomUUID(),user_id:(u as any).id,action:'login',ip_hash:ipHash});
  return jsonOk({user:toPublicUser(u as any)},200,{'set-cookie':cookie});
}

export async function handleLogout(request:Request, env:Env){
  const ck = request.headers.get('cookie');
  await revokeCurrentSession(env.DB, ck);
  return jsonOk({ok:true},200,{'set-cookie':clearSessionCookie()});
}

export async function handleMe(_req:Request,_env:Env,ctx:AuthContext){
  const a = requireUser(ctx); return jsonOk({user:(a as any).user});
}
