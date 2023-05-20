import decode from 'jwt-decode';
import { Storage } from './storage';
import { JwtPayload } from '~/models/jwt-payload';
import { JwtTokens } from '~/models/jwt-tokens';

export type AuthStorageData = JwtPayload & JwtTokens;

export class AuthStorage extends Storage<AuthStorageData> {
  constructor() {
    super('Auth');
  }
  store(tokens: JwtTokens) {
    const payload = decode<JwtPayload>(tokens.accessToken);
    super.store({ ...tokens, ...payload });
  }
}

export const storage = new AuthStorage();
