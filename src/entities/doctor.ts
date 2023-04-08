import { Appointment } from './appointment';
import { DoctorAvailability } from './doctor-availability';

export type Doctor = {
  id: string;
  fullname: string;
  registrationNumber: string;
  picture: string;
  rating: number;
  clinic_id: string;
  availability: DoctorAvailability[];
  specialties: string[];
  appointments: Pick<Appointment, 'scheduledTo'>[];
};
