import { LoaderFunction } from 'react-router-dom';
import { Doctor } from '~/entities/doctor';
import dayjs from 'dayjs';

export const loader: LoaderFunction = async ({ params }) => {
  const registrationNumber = params.registrationNumber;

  const doctor: Doctor = {
    fullname: 'Rogério Cunha Andrade',
    registrationNumber: '12964-MG',
    picture:
      'https://img.freepik.com/fotos-gratis/retrato-de-terapeuta-profissional-experiente-com-estetoscopio-olhando-para-a-camera_1098-19305.jpg',
    rating: 5,
    specialties: [{ code: 'cardiology', description: 'Cardiologia', icon: 'HeartOutlined' }],
    availability: [
      { day_of_week: 1, start_time: dayjs('08:00', 'HH:mm'), end_time: dayjs('10:00', 'HH:mm') },
      { day_of_week: 1, start_time: dayjs('14:00', 'HH:mm'), end_time: dayjs('18:00', 'HH:mm') },
      { day_of_week: 3, start_time: dayjs('14:00', 'HH:mm'), end_time: dayjs('18:00', 'HH:mm') },
    ],
    appointments: [{ scheduledTo: dayjs('2023-04-10T08:45') }],
  };

  return doctor;
};
