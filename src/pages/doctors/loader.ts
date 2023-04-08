import { LoaderFunction } from 'react-router-dom';
import { Doctor } from '~/entities/doctor';

export const loader: LoaderFunction = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;

  const specialty = searchParams.get('specialty');

  let url = `${import.meta.env.VITE_API_URL}/doctors`;

  if (specialty) {
    url += `?specialty=${specialty}`;
  }

  const response = await fetch(url);

  const doctors: Doctor[] = await response.json();

  return doctors;
};
