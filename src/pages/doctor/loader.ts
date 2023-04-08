import dayjs from 'dayjs';
import { LoaderFunction } from 'react-router-dom';
import { Appointment } from '~/entities/appointment';
import { Doctor } from '~/entities/doctor';

export const loader: LoaderFunction = async ({ params }) => {
  const id = params.id;

  const response = await fetch(`${import.meta.env.VITE_API_URL}/doctors/${id}`);

  const doctor: Doctor = await response.json();

  doctor.availability = doctor.availability.map(availability => {
    return {
      ...availability,
      start_time: dayjs(availability.start_time, 'HH:mm'),
      end_time: dayjs(availability.end_time, 'HH:mm'),
    };
  });

  const appointmentsResponse = await fetch(`${import.meta.env.VITE_API_URL}/doctors/${id}/appointments`);

  const appointments: Appointment[] = await appointmentsResponse.json();

  doctor.appointments = appointments.map(appointment => {
    return {
      ...appointment,
      scheduledTo: dayjs(appointment.scheduledTo),
    };
  });

  return doctor;
};
