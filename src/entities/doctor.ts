import { Appointment } from './appointment';
import { Clinic } from './clinic';
import { Availability } from './availability';

export type Doctor = {
  id: number;
  fullname: string;
  registrationNumber: string;
  picture: string;
  rating: number;
  clinics: Clinic[];
  availability: Availability[];
  specialties: string[];
  appointments: Appointment[];
};
