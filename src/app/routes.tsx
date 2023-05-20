import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { Template } from '~/components/template';
import { SpecialtiesPage } from '~/pages/specialties';
import { AppointmentsPage } from '~/pages/appointments';
import { DoctorsPage } from '~/pages/doctors';
import { DoctorPage } from '~/pages/doctor';
import { Login } from '~/pages/login';
import { CalendarPage } from '~/pages/calendar';
import { Role } from '~/enums/role';
import { storage } from '~/storage/auth';
import { FunctionComponent } from 'react';
import { Forbidden, NotFound } from '~/pages/errors';

type Validate = {
  roles: Role[];
  component: FunctionComponent;
};

const Validate: FunctionComponent<Validate> = ({ roles, component: Component }) => {
  const auth = storage.read();
  return roles.includes(auth.role) ? <Component /> : <Forbidden />;
};

export const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  {
    path: '/',
    element: <Template />,
    children: [
      { path: '/', element: <Navigate to="appointments" /> },
      { path: '/appointments', element: <Validate roles={[Role.PATIENT, Role.DOCTOR]} component={AppointmentsPage} /> },
      { path: '/specialties', element: <Validate roles={[Role.PATIENT]} component={SpecialtiesPage} /> },
      { path: '/doctors', element: <Validate roles={[Role.PATIENT]} component={DoctorsPage} /> },
      { path: '/doctors/:id', element: <Validate roles={[Role.PATIENT]} component={DoctorPage} /> },
      { path: '/calendar', element: <Validate roles={[Role.DOCTOR]} component={CalendarPage} /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
