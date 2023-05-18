import { Patient } from '~/entities/patient';
import { Service } from './service';
import { Appointment } from '~/entities/appointment';
import { storage } from '~/storage/auth';
import { JwtPayload } from '~/models/jwt-payload';
import decode from 'jwt-decode';

export class PatientService extends Service {
  private id: number;

  constructor() {
    super('patients');
    const token = storage.read();
    const payload = decode<JwtPayload>(token.accessToken);
    this.id = payload.patientId;
  }
  async find() {
    return await this.get<Patient>(`/${this.id}`);
  }
  async appointments() {
    return await this.get<Appointment[]>(`/${this.id}/appointments`);
  }
}

export const service = new PatientService();
