import { LoaderFunction } from 'react-router-dom';
import { Appointment } from '~/entities/appointment';
import { AppointmentStatus } from '~/enums/appointment-status';
import dayjs from 'dayjs';
import { Doctor } from '~/entities/doctor';
import { Clinic } from '~/entities/clinic';

export const loader: LoaderFunction = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/patients/${import.meta.env.VITE_PATIENT_ID}/appointments`
  );

  let appointments: Appointment[] = await response.json();

  const getDoctor = async (id: string): Promise<Doctor> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/doctors/${id}`);
    return response.json();
  };

  const getClinic = async (id: string): Promise<Clinic> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/clinics/${id}`);
    return response.json();
  };

  appointments = await Promise.all(
    appointments.map(async appointment => {
      return {
        ...appointment,
        scheduledTo: dayjs(appointment.scheduledTo),
        doctor: await getDoctor(appointment.doctor_id),
        clinic: await getClinic(appointment.clinic_id),
      };
    })
  );

  return appointments;
};
