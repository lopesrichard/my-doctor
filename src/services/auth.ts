import { Service } from './service';
import { Credentials } from '~/models/credentials';
import { JwtTokens } from '~/models/jwt-tokens';

export class AuthService extends Service {
  constructor() {
    super('auth');
  }
  async signin(credentials: Credentials) {
    return await this.post<JwtTokens>('signin', credentials);
  }
}

export const service = new AuthService();
