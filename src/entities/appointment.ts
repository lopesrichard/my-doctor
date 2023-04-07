import { AppointmentStatus } from '~/enums/appointment-status';
import { Doctor } from './doctor';
import { Clinic } from './clinic';

export type Appointment = {
  status: AppointmentStatus;
  scheduledTo: Date;
  clinic: Clinic;
  doctor: Pick<Doctor, 'fullname' | 'picture'>;
};
