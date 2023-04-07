import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Specialties, loader as SpecialtiesLoader } from '../pages/specialties';
import { Appointments, loader as AppointmentsLoader } from '../pages/appointments';
import { Doctors, loader as DoctorsLoader } from '../pages/doctors';
import { Template } from '../components/template';
import { Navigate } from 'react-router-dom';

export const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Template />,
      children: [
        { path: '/', element: <Navigate to="specialties" /> },
        { path: '/specialties', element: <Specialties />, loader: SpecialtiesLoader },
        {
          path: '/appointments',
          element: <Appointments />,
          loader: AppointmentsLoader,
        },
        {
          path: '/doctors/:specialty?',
          element: <Doctors />,
          loader: DoctorsLoader,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
