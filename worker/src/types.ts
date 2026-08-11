export type Role = 'user'|'admin';
export type UserStatus = 'active'|'suspended'|'pending';
export interface UserRow {
  id:string;email:string;password_hash:string;name:string;
  avatar_url:string|null;role:Role;status:UserStatus;
  email_verified_at:string|null;created_at:string;updated_at:string;
}
export interface PublicUser {
  id:string;email:string;name:string;avatar_url:string|null;
  role:Role;status:UserStatus;email_verified_at:string|null;created_at:string;
}
export interface SessionRow {
  id:string;user_id:string;token_hash:string;expires_at:string;
  created_at:string;last_seen_at:string;revoked_at:string|null;
}
export interface AuthContext { user: PublicUser|null; session: SessionRow|null; }
