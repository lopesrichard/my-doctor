import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { Specialties, loader as SpecialtiesLoader } from '~/pages/specialties';
import { Appointments, loader as AppointmentsLoader } from '~/pages/appointments';
import { Doctors, loader as DoctorsLoader } from '~/pages/doctors';
import { DoctorPanel, loader as DoctorLoader } from '~/pages/doctor';
import { Template } from '~/components/template';

export const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Template />,
      children: [
        { path: '/', element: <Navigate to="appointments" /> },
        {
          path: '/appointments',
          element: <Appointments />,
          loader: AppointmentsLoader,
        },
        { path: '/specialties', element: <Specialties />, loader: SpecialtiesLoader },
        {
          path: '/doctors',
          element: <Doctors />,
          loader: DoctorsLoader,
        },
        {
          path: '/doctors/:id',
          element: <DoctorPanel />,
          loader: DoctorLoader,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
