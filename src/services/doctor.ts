import { Appointment } from '~/entities/appointment';
import { Service } from './service';
import { Doctor } from '~/entities/doctor';

export class DoctorService extends Service {
  constructor() {
    super('doctors');
  }

  public async find(id: number) {
    return await this.get<Doctor>(`/${id}`);
  }

  async self() {
    return await this.get<Doctor>('/self');
  }

  public async list(specialty: string | null) {
    return await this.get<Doctor[]>('/', { specialty });
  }

  async appointments(id: number) {
    return await this.get<Appointment[]>(`/${id}/appointments`);
  }

  async selfAppointments() {
    return await this.get<Appointment[]>('/self/appointments');
  }
}

export const service = new DoctorService();
