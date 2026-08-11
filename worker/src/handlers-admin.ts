import { listUsers, updateUserRole, updateUserStatus, logActivity, toPublicUser, findUserById, listActivity } from './db';
import { requireAdmin, jsonOk, HttpError } from './rbac';
import type { Env } from './index';
import type { AuthContext, Role, UserStatus } from './types';
const isRole=(x:unknown):x is Role=> x==='user'||x==='admin';
const isStatus=(x:unknown):x is UserStatus=>x==='active'||x==='suspended'||x==='pending';

export async function handleAdminUserList(req:Request,env:Env,ctx:AuthContext){
  requireAdmin(ctx);
  const u = new URL(req.url);
  const lim = Math.min(Number(u.searchParams.get('limit')??50),200);
  const off = Math.max(Number(u.searchParams.get('offset')??0),0);
  const rows = await listUsers(env.DB,lim,off);
  return jsonOk({users:rows.map(toPublicUser),limit:lim,offset:off});
}
export async function handleAdminUserUpdate(req:Request,env:Env,ctx:AuthContext,path:string){
  requireAdmin(ctx);
  const id = path.split('/').pop()!;
  const body = await req.json().catch(()=>null) as any;
  if(!body || !isRole(body.role) || !isStatus(body.status)) throw new HttpError(400,'role and status required.','bad_request');
  if (id===(ctx.user as any).id) throw new HttpError(400,'Cannot modify self.','self_modify');
  const t = await findUserById(env.DB,id); if(!t) throw new HttpError(404,'Not found.','not_found');
  if ((t as any).role!==body.role){ await updateUserRole(env.DB,id,body.role); await logActivity(env.DB,{id:crypto.randomUUID(),user_id:(ctx.user as any).id,action:'role_change',metadata:{target:id,from:(t as any).role,to:body.role}}); }
  if ((t as any).status!==body.status){ await updateUserStatus(env.DB,id,body.status); await logActivity(env.DB,{id:crypto.randomUUID(),user_id:(ctx.user as any).id,action:'account_status_change',metadata:{target:id,from:(t as any).status,to:body.status}}); }
  const nu = await findUserById(env.DB,id); return jsonOk({user:toPublicUser(nu as any)});
}
export async function handleAdminActivity(req:Request,env:Env,ctx:AuthContext){
  requireAdmin(ctx);
  const u = new URL(req.url);
  const lim = Math.min(Number(u.searchParams.get('limit')??100),500);
  const rows = await listActivity(env.DB,lim);
  return jsonOk({ activity: rows.map((r:any)=>({id:r.id,user_id:r.user_id,action:r.action,metadata:r.metadata? (()=>{try{return JSON.parse(r.metadata);}catch{return null;}})() : null,created_at:r.created_at})) });
}
export async function handleAdminSettings(_:Request,env:Env,ctx:AuthContext){
  requireAdmin(ctx);
  return jsonOk({ environment: env.ENVIRONMENT, public_domain: env.PUBLIC_DOMAIN });
}
