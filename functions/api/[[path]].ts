// Pages Functions catch-all proxy /api/* -> Worker same-origin
export const onRequest: PagesFunction<{ WORKER_URL: string }> = async (context) => {
  const url = new URL(context.request.url);
  const target = (context.env.WORKER_URL || '').replace(/\/$/,'') + url.pathname + url.search;
  const init: RequestInit = { method: context.request.method, headers: context.request.headers, redirect: 'manual' };
  if (context.request.method !== 'GET' && context.request.method !== 'HEAD') init.body = await context.request.arrayBuffer();
  const resp = await fetch(target, init);
  return new Response(resp.body, { status: resp.status, statusText: resp.statusText, headers: resp.headers });
};
