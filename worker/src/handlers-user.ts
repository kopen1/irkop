import { listSessionsByUser, listActivity } from './db';
import { requireUser, jsonOk } from './rbac';
import type { Env } from './index';
import type { AuthContext } from './types';
function safe(s:string){try{return JSON.parse(s);}catch{return null;}}

export async function handleProfile(_:Request,__:Env,ctx:AuthContext){ const a=requireUser(ctx); return jsonOk({user:(a as any).user}); }
export async function handleSessions(_:Request,env:Env,ctx:AuthContext){
  const a=requireUser(ctx);
  const arr = await listSessionsByUser(env.DB, (a as any).user.id);
  return jsonOk({ sessions: arr.map((s:any)=>({
    id:s.id,created_at:s.created_at,last_seen_at:s.last_seen_at,
    expires_at:s.expires_at,revoked_at:s.revoked_at,
    is_current: s.id === (a as any).session.id })) });
}
export async function handleActivity(_:Request,env:Env,ctx:AuthContext){
  const a=requireUser(ctx);
  const rows = await listActivity(env.DB, 100, (a as any).user.id);
  return jsonOk({ activity: rows.map((r:any)=>({id:r.id,action:r.action,metadata:r.metadata?safe(r.metadata):null,created_at:r.created_at})) });
}
