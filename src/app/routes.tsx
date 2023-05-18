import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { Template } from '~/components/template';
import { SpecialtiesPage } from '~/pages/specialties';
import { AppointmentsPage } from '~/pages/appointments';
import { DoctorsPage } from '~/pages/doctors';
import { DoctorPage } from '~/pages/doctor';
import { Login } from '~/pages/login';

export const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  {
    path: '/',
    element: <Template />,
    children: [
      { path: '/', element: <Navigate to="appointments" /> },
      { path: '/appointments', element: <AppointmentsPage /> },
      { path: '/specialties', element: <SpecialtiesPage /> },
      { path: '/doctors', element: <DoctorsPage /> },
      { path: '/doctors/:id', element: <DoctorPage /> },
    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
