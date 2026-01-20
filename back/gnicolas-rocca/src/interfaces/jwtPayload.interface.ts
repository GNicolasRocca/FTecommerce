import { Role } from 'src/auth/roles.enum';

export interface JwtPayload {
  sub: string;
  email: string;
  role: Role; // roles?: string[];
  iat?: number;
  exp?: number;
}
