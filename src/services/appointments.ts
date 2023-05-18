import { AddAppointment } from '~/models/add-appointment';
import { Service } from './service';
import { Appointment } from '~/entities/appointment';

export class AppointmentService extends Service {
  constructor() {
    super('appointments');
  }
  public async schedule(data: AddAppointment) {
    return await this.post<Appointment>('/', data);
  }
  public async cancel(id: number) {
    return await this.delete(`/${id}`);
  }
}

export const service = new AppointmentService();
