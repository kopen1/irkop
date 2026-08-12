import { resolveSession, hashIp } from './sessions';
import { handleRegister, handleLogin, handleLogout, handleMe } from './handlers-auth';
import { handleProfile, handleSessions, handleActivity } from './handlers-user';
import { handleToolsList } from './handlers-tools';
import { handleAdminUserList, handleAdminUserUpdate, handleAdminActivity, handleAdminSettings } from './handlers-admin';
import { jsonError } from './rbac';

export interface Env {
  DB: D1Database; SESSION_SECRET: string; PUBLIC_DOMAIN: string;
  ALLOWED_ORIGIN: string; ENVIRONMENT: string; ADMIN_BOOTSTRAP_TOKEN?: string;
}
const CORS = {
  'access-control-allow-origin':'*',
  'access-control-allow-methods':'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  'access-control-allow-headers':'content-type',
  'access-control-max-age':'86400',
};

export default {
  async fetch(request:Request, env:Env): Promise<Response> {
    try {
      const url = new URL(request.url);
      const method = request.method.toUpperCase();
      if (method==='OPTIONS') return new Response(null,{status:204,headers:CORS});
      const ip = request.headers.get('cf-connecting-ip') ?? request.headers.get('x-forwarded-for') ?? null;
      const ipHash = await hashIp(ip, env.SESSION_SECRET);
      const ctx = await resolveSession(env.DB, request.headers.get('cookie'));
      let response:Response;
      switch(true) {
        case url.pathname==='/healthz':
          response = new Response(JSON.stringify({ok:true,ts:Date.now()}),{headers:{'content-type':'application/json'}}); break;
        case method==='POST' && url.pathname==='/api/auth/register': response=await handleRegister(request,env,ctx,ipHash); break;
        case method==='POST' && url.pathname==='/api/auth/login':    response=await handleLogin(request,env,ctx,ipHash); break;
        case method==='POST' && url.pathname==='/api/auth/logout':  response=await handleLogout(request,env); break;
        case method==='GET'  && url.pathname==='/api/auth/me':       response=await handleMe(request,env,ctx); break;
        case method==='GET'  && url.pathname==='/api/user/profile':  response=await handleProfile(request,env,ctx); break;
        case method==='GET'  && url.pathname==='/api/user/sessions': response=await handleSessions(request,env,ctx); break;
        case method==='GET'  && url.pathname==='/api/user/activity': response=await handleActivity(request,env,ctx); break;
        case method==='GET'  && url.pathname==='/api/tools':         response=await handleToolsList(request,env,ctx); break;
        case method==='GET'  && url.pathname==='/api/admin/users':   response=await handleAdminUserList(request,env,ctx); break;
        case method==='PATCH' && /^\/api\/admin\/users\/[^/]+$/.test(url.pathname):
          response=await handleAdminUserUpdate(request,env,ctx,url.pathname); break;
        case method==='GET'  && url.pathname==='/api/admin/activity':response=await handleAdminActivity(request,env,ctx); break;
        case method==='GET'  && url.pathname==='/api/admin/settings':response=await handleAdminSettings(request,env,ctx); break;
        default: response=new Response(JSON.stringify({error:'not_found'}),{status:404,headers:{'content-type':'application/json'}});
      }
      const h = new Headers(response.headers); for(const [k,v] of Object.entries(CORS)) h.set(k,v);
      return new Response(response.body,{status:response.status,headers:h});
    } catch(err){ return jsonError(err); }
  }
};
