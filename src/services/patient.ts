import { Patient } from '~/entities/patient';
import { Service } from './service';
import { Appointment } from '~/entities/appointment';

export class PatientService extends Service {
  constructor() {
    super('patients');
  }
  async self() {
    return await this.get<Patient>('/self');
  }
  async selfAppointments() {
    return await this.get<Appointment[]>('/self/appointments');
  }
}

export const service = new PatientService();
