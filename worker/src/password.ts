// PBKDF2-SHA256 — Web Crypto, Workers-compatible, OWASP 2024 guidance
const ITER = 600_000, HASH_LEN = 32, SALT_LEN = 16;
const enc = new TextEncoder();
const toHex = (b: ArrayBuffer) => Array.from(new Uint8Array(b)).map(x=>x.toString(16).padStart(2,'0')).join('');
const fromHex = (h: string) => { const u = new Uint8Array(h.length/2); for(let i=0;i<u.length;i++) u[i]=parseInt(h.substr(i*2,2),16); return u; };

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LEN));
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name:'PBKDF2', salt, iterations: ITER, hash:'SHA-256' }, key, HASH_LEN*8);
  return `pbkdf2$${ITER}$${toHex(salt.buffer)}$${toHex(bits)}`;
}
export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const p = stored.split('$'); if (p.length!==4 || p[0]!=='pbkdf2') return false;
  const iter = Number(p[1]); if (!iter || iter<100_000) return false;
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name:'PBKDF2', salt: fromHex(p[2]), iterations: iter, hash:'SHA-256' } as Pbkdf2Params, key, p[3].length/2*8);
  const a = toHex(bits);
  if (a.length !== p[3].length) return false;
  let d=0; for(let i=0;i<a.length;i++) d |= a.charCodeAt(i) ^ p[3].charCodeAt(i);
  return d===0;
}
export function validatePasswordPolicy(pw: string): string|null {
  if (pw.length<8) return 'Password must be at least 8 characters.';
  if (pw.length>128) return 'Password must be at most 128 characters.';
  return null;
}
