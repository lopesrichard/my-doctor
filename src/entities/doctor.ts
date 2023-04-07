import { Appointment } from './appointment';
import { DoctorAvailability } from './doctor-availability';
import { MedicalSpecialty } from './medical-specialty';

export type Doctor = {
  fullname: string;
  registrationNumber: string;
  picture: string;
  rating: number;
  availability: DoctorAvailability[];
  specialties: MedicalSpecialty[];
  appointments: Pick<Appointment, 'scheduledTo'>[];
};
