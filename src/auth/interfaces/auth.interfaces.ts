export interface AdminUser {
  username: string;
  role: string;
}

export interface LoginResponse {
  access_token: string;
  user: AdminUser;
}

export interface JwtPayload {
  username: string;
  role: string;
  sub: string;
  iat?: number;
  exp?: number;
}
