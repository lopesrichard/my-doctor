import { Service } from './service';
import { Specialty } from '~/entities/specialty';

export class SpecialtyService extends Service {
  constructor() {
    super('specialties');
  }

  public async list(params?: object) {
    return await this.get<Specialty[]>('/', params);
  }
}

export const service = new SpecialtyService();
