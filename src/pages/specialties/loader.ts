import { LoaderFunction } from 'react-router-dom';
import { MedicalSpecialty } from '~/entities/medical-specialty';

export const loader: LoaderFunction = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/specialties`);

  const specialties: MedicalSpecialty[] = await response.json();

  return specialties;
};
