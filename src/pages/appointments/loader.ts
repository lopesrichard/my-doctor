import { LoaderFunction } from 'react-router-dom';
import { Appointment } from '~/entities/appointment';
import { AppointmentStatus } from '~/enums/appointment-status';

export const loader: LoaderFunction = async () => {
  const appointments: Appointment[] = [
    {
      status: AppointmentStatus.OPEN,
      scheduledTo: new Date(2023, 3, 23, 12, 30),
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
      status: AppointmentStatus.OPEN,
      scheduledTo: new Date(2023, 3, 15, 16, 0),
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
      status: AppointmentStatus.CANCELED,
      scheduledTo: new Date(2023, 3, 3, 12, 30),
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
      status: AppointmentStatus.CONCLUDED,
      scheduledTo: new Date(2023, 3, 1, 12, 30),
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
