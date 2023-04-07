import { useLoaderData } from 'react-router-dom';
import { Appointment } from '../../entities/appointment';

export const Appointments = () => {
  const appointments = useLoaderData() as Appointment[];
  return <div>Appointments {appointments.length}</div>;
};
