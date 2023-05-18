import { Storage } from './storage';

export interface AuthStorageData {
  accessToken: string;
}

export class AuthStorage extends Storage<AuthStorageData> {
  constructor() {
    super('Auth');
  }
}

export const storage = new AuthStorage();
