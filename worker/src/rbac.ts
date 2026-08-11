import type { AuthContext, Role } from './types';
export class HttpError extends Error { constructor(public status:number, public message:string, public code='http_error'){super(message);} }
export function requireUser(ctx: AuthContext) { if(!ctx.user||!ctx.session) throw new HttpError(401,'Authentication required.','unauthenticated'); return ctx; }
export function requireAdmin(ctx: AuthContext) { const a=requireUser(ctx); if((a.user as any).role!=='admin') throw new HttpError(403,'Admin required.','forbidden'); return a; }
export function hasRole(u:{role:Role}|null, r:Role){return !!u && u.role===r;}
export function jsonError(err:unknown){
  if(err instanceof HttpError) return new Response(JSON.stringify({error:err.code,message:err.message}),{status:err.status,headers:{'content-type':'application/json'}});
  const m = err instanceof Error?err.message:'Unknown error';
  return new Response(JSON.stringify({error:'server_error',message:m}),{status:500,headers:{'content-type':'application/json'}});
}
export function jsonOk<T>(data:T, status=200, extra:Record<string,string>={}){
  const h:Record<string,string> = {'content-type':'application/json', ...extra};
  return new Response(JSON.stringify(data), { status, headers: h });
}
