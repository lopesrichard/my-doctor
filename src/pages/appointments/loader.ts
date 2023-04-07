import { LoaderFunction } from 'react-router-dom';
import { Appointment } from '~/entities/appointment';
import { AppointmentStatus } from '~/enums/appointment-status';
import dayjs from 'dayjs';

export const loader: LoaderFunction = async () => {
  const appointments: Appointment[] = [
    {
      id: 1,
      status: AppointmentStatus.OPEN,
      scheduledTo: dayjs('2023-04-02T01:30'),
      doctor: {
        fullname: 'Rogério Cunha Andrade',
        picture:
          'https://img.freepik.com/fotos-gratis/retrato-de-terapeuta-profissional-experiente-com-estetoscopio-olhando-para-a-camera_1098-19305.jpg',
      },
      clinic: {
        name: 'Hospital Tacchini',
        address: {
          addressLine: 'R. Dr. José Mário Mônaco, 358 - Bento Gonçalves',
          latitude: -29.16621727182327,
          longitude: -51.511962822879596,
        },
      },
    },
    {
      id: 2,
      status: AppointmentStatus.OPEN,
      scheduledTo: dayjs('2023-04-01T01:00'),
      doctor: {
        fullname: 'Rogério Cunha Andrade',
        picture:
          'https://img.freepik.com/fotos-gratis/retrato-de-terapeuta-profissional-experiente-com-estetoscopio-olhando-para-a-camera_1098-19305.jpg',
      },
      clinic: {
        name: 'Hospital Tacchini',
        address: {
          addressLine: 'R. Dr. José Mário Mônaco, 358 - Bento Gonçalves',
          latitude: -29.16621727182327,
          longitude: -51.511962822879596,
        },
      },
    },
    {
      id: 3,
      status: AppointmentStatus.CANCELED,
      scheduledTo: dayjs('2023-04-03T12:30'),
      doctor: {
        fullname: 'Maria Cunha Andrade',
        picture:
          'https://img.freepik.com/fotos-gratis/enfermeira-negra-em-seu-espaco-de-trabalho_52683-100580.jpg?w=900&t=st=1680832647~exp=1680833247~hmac=83311ffd1d5b6d1cf6edbae7bb5dcb03ef157708db39352a6695a0c35c46ee16',
      },
      clinic: {
        name: 'Hospital Tacchini',
        address: {
          addressLine: 'R. Dr. José Mário Mônaco, 358 - Bento Gonçalves',
          latitude: -29.16621727182327,
          longitude: -51.511962822879596,
        },
      },
    },
    {
      id: 4,
      status: AppointmentStatus.CONCLUDED,
      scheduledTo: dayjs('2023-04-01T12:30'),
      doctor: {
        fullname: 'Paula Rocha',
        picture:
          'https://img.freepik.com/free-photo/portrait-medical-worker-female-physician-face-mask-from-covid-during-pandemic-smiling-look_1258-85659.jpg',
      },
      clinic: {
        name: 'Hospital Tacchini',
        address: {
          addressLine: 'R. Dr. José Mário Mônaco, 358 - Bento Gonçalves',
          latitude: -29.16621727182327,
          longitude: -51.511962822879596,
        },
      },
    },
  ];
  return appointments;
};
