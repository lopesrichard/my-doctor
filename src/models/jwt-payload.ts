import { Role } from '~/enums/role';

export interface JwtPayload {
  sub: number;
  role: Role;
}
