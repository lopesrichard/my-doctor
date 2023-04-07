import { AppointmentStatus } from '~/enums/appointment-status';
import { Doctor } from './doctor';
import { Clinic } from './clinic';
import { Dayjs } from 'dayjs';

export type Appointment = {
  id: number;
  status: AppointmentStatus;
  scheduledTo: Dayjs;
  clinic: Clinic;
  doctor: Pick<Doctor, 'fullname' | 'picture'>;
};
