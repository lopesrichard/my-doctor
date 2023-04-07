import { AppointmentStatus } from '../enums/appointment-status';
import { Doctor } from './doctor';

export type Appointment = {
  status: AppointmentStatus;
  scheduledTo: Date;
  doctor: Doctor;
};
