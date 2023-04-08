import { AppointmentStatus } from '~/enums/appointment-status';
import { Doctor } from './doctor';
import { Clinic } from './clinic';
import { Dayjs } from 'dayjs';

export type Appointment = {
  id: number;
  status: AppointmentStatus;
  scheduledTo: Dayjs;
  clinic_id: string;
  doctor_id: string;
  patient_id: string;
  clinic: Clinic;
  doctor: Doctor;
};
