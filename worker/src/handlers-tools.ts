import { jsonOk } from './rbac';
export async function handleToolsList(_:Request,__:any,_ctx:any){
  return jsonOk({ tools: [
    { slug:'konter', name:'Konter', description:'The first IRKOP tool. Coming soon.',
      marketingPath:'/konter', appUrl:null, status:'coming_soon', requiresAuth:true }
  ]});
}
