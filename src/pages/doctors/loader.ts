import { LoaderFunction } from 'react-router-dom';
import { Doctor } from '~/entities/doctor';
import dayjs from 'dayjs';

export const loader: LoaderFunction = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const specialty = searchParams.get('specialty');
  const doctors: Doctor[] = [
    {
      fullname: 'Rogério Cunha Andrade',
      registrationNumber: '12964-MG',
      picture:
        'https://img.freepik.com/fotos-gratis/retrato-de-terapeuta-profissional-experiente-com-estetoscopio-olhando-para-a-camera_1098-19305.jpg',
      rating: 5,
      specialties: [{ code: 'cardiology', description: 'Cardiologia', icon: 'HeartOutlined' }],
      availability: [
        { day_of_week: 1, start_time: dayjs('08:00', 'HH:mm'), end_time: dayjs('10:00', 'HH:mm') },
        { day_of_week: 1, start_time: dayjs('14:00', 'HH:mm'), end_time: dayjs('18:00', 'HH:mm') },
      ],
      appointments: [],
    },
    {
      fullname: 'Maria Cunha Andrade',
      registrationNumber: '63548-MG',
      picture:
        'https://img.freepik.com/fotos-gratis/enfermeira-negra-em-seu-espaco-de-trabalho_52683-100580.jpg?w=900&t=st=1680832647~exp=1680833247~hmac=83311ffd1d5b6d1cf6edbae7bb5dcb03ef157708db39352a6695a0c35c46ee16',
      rating: 4,
      specialties: [{ code: 'pediatric-surgery', description: 'Cirurgia Pediátrica', icon: 'MedicineBoxOutlined' }],
      availability: [{ day_of_week: 2, start_time: dayjs('12:00', 'HH:mm'), end_time: dayjs('16:00', 'HH:mm') }],
      appointments: [],
    },
    {
      fullname: 'Paula Rocha',
      registrationNumber: '98754-SP',
      picture:
        'https://img.freepik.com/free-photo/portrait-medical-worker-female-physician-face-mask-from-covid-during-pandemic-smiling-look_1258-85659.jpg',
      rating: 4.5,
      specialties: [{ code: 'radiology', description: 'Radiologia', icon: 'FundProjectionScreenOutlined' }],
      availability: [
        { day_of_week: 1, start_time: dayjs('09:00', 'HH:mm'), end_time: dayjs('12:00', 'HH:mm') },
        { day_of_week: 2, start_time: dayjs('14:00', 'HH:mm'), end_time: dayjs('18:00', 'HH:mm') },
        { day_of_week: 3, start_time: dayjs('08:00', 'HH:mm'), end_time: dayjs('10:00', 'HH:mm') },
      ],
      appointments: [],
    },
    {
      fullname: 'Luisa Fernanda Garcia',
      registrationNumber: '87654-SP',
      picture:
        'https://thumbs.dreamstime.com/b/closeup-portrait-female-doctor-protective-face-mask-closeup-portrait-female-doctor-stomatologist-protective-face-mask-222068774.jpg',
      rating: 4.5,
      specialties: [
        { code: 'dermatology', description: 'Dermatologia', icon: 'SkinOutlined' },
        { code: 'cosmetic-surgery', description: 'Cirurgia Plástica', icon: 'SmileOutlined' },
      ],
      availability: [
        { day_of_week: 3, start_time: dayjs('09:00', 'HH:mm'), end_time: dayjs('13:00', 'HH:mm') },
        { day_of_week: 4, start_time: dayjs('14:00', 'HH:mm'), end_time: dayjs('18:00', 'HH:mm') },
      ],
      appointments: [],
    },
    {
      fullname: 'Daniel Oliveira',
      registrationNumber: '234567-BA',
      picture:
        'https://thumbs.dreamstime.com/b/mature-male-doctor-serious-face-standing-grey-background-stethoscope-neck-37718876.jpg',
      rating: 4.2,
      specialties: [
        { code: 'neurology', description: 'Neurologia', icon: 'ApiOutlined' },
        { code: 'psychiatry', description: 'Psiquiatria', icon: 'UserOutlined' },
      ],
      availability: [
        { day_of_week: 1, start_time: dayjs('10:00', 'HH:mm'), end_time: dayjs('14:00', 'HH:mm') },
        { day_of_week: 3, start_time: dayjs('15:00', 'HH:mm'), end_time: dayjs('19:00', 'HH:mm') },
      ],
      appointments: [],
    },
    {
      fullname: 'Isabela Torres',
      registrationNumber: '987654-PE',
      picture:
        'https://www.westend61.de/images/0001534680pw/female-doctor-with-protective-face-mask-in-hospital-EBBF02684.jpg',
      rating: 4.8,
      specialties: [
        { code: 'gynecology', description: 'Ginecologia', icon: 'WomanOutlined' },
        { code: 'obstetrics', description: 'Obstetrícia', icon: 'SafetyCertificateOutlined' },
      ],
      availability: [
        { day_of_week: 2, start_time: dayjs('09:00', 'HH:mm'), end_time: dayjs('13:00', 'HH:mm') },
        { day_of_week: 4, start_time: dayjs('14:00', 'HH:mm'), end_time: dayjs('18:00', 'HH:mm') },
      ],
      appointments: [],
    },
  ];

  return doctors;
};
