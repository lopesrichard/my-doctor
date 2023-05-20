import { useNavigate } from 'react-router-dom';
import { Appointment } from '~/entities/appointment';
import styled from '@emotion/styled';
import { Avatar, Badge, Divider, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Doctor } from '~/entities/doctor';
import { AppointmentStatus } from '~/enums/appointment-status';
import { CloseOutlined } from '@ant-design/icons';
import { ActionButton } from '~/components/template/action-button';
import { useEffect, useState } from 'react';
import { AppointmentDetails } from '~/modals/appointment-details';
import { ClassNames } from '@emotion/react';
import { Dayjs } from 'dayjs';
import { service as patientService } from '~/services/patient';
import { service as appointmentService } from '~/services/appointments';
import { service as doctorService } from '~/services/doctor';
import { notify } from '~/notifications';
import { storage } from '~/storage/auth';
import { Role } from '~/enums/role';
import { Patient } from '~/entities/patient';

export const AppointmentsPage = () => {
  const auth = storage.read();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [appointment, setAppointment] = useState<Appointment | null>(null);

  const load = async () => {
    const response =
      auth.role === Role.PATIENT ? await patientService.selfAppointments() : await doctorService.selfAppointments();
    if (response.success) {
      setAppointments(response.data);
    } else {
      notify.error(response.error);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const cancel = async (appointment: Appointment) => {
    const response = await appointmentService.cancel(appointment.id);
    if (response.success) {
      notify.success('Cancelamento efetuado com sucesso');
      await load();
    } else {
      notify.success('Ocorreu um erro ao efetuar o cancelamento');
    }
  };

  const badges = {
    [AppointmentStatus.OPEN]: {
      text: 'Em Aberto',
      color: 'cyan',
    },
    [AppointmentStatus.CANCELED]: {
      text: 'Cancelada',
      color: 'volcano',
    },
    [AppointmentStatus.CONCLUDED]: {
      text: 'Concluída',
      color: 'green',
    },
  };

  const columns: ColumnsType<Appointment> = [
    {
      width: 50,
      render: (appointment: Appointment) =>
        appointment.status === AppointmentStatus.OPEN ? (
          <ActionButton
            items={[
              {
                label: 'Cancelar consulta',
                key: 'cancel',
                icon: <CloseOutlined />,
                onClick: async menu => {
                  menu.domEvent.stopPropagation();
                  await cancel(appointment);
                },
              },
            ]}
          />
        ) : null,
    },
    {
      dataIndex: 'scheduledTo',
      title: 'Data',
      render: (scheduled: Dayjs) => scheduled.format('DD/MM/YYYY HH[h]mm'),
    },
  ];

  if (auth.role === Role.PATIENT) {
    columns.push({
      dataIndex: 'doctor',
      title: 'Médico',
      render: (doctor: Doctor) => <PersonAvatar person={doctor} />,
      responsive: ['lg'],
    });
  }

  if (auth.role === Role.DOCTOR) {
    columns.push({
      dataIndex: 'patient',
      title: 'Paciente',
      render: (patient: Patient) => <PersonAvatar person={patient} />,
      responsive: ['lg'],
    });
  }

  columns.push({
    dataIndex: 'status',
    title: 'Status',
    render: (status: AppointmentStatus) => <Badge {...badges[status]} />,
    responsive: ['lg'],
  });

  return (
    <>
      {appointment && <AppointmentDetails appointment={appointment} onCancel={() => setAppointment(null)} />}
      <Container>
        <Title>Minhas consultas</Title>
        <Divider />
        <ClassNames>
          {({ css }) => (
            <Table
              columns={columns}
              dataSource={appointments}
              onRow={appointment => ({ onClick: () => setAppointment(appointment) })}
              rowClassName={css({ cursor: 'pointer ' })}
              rowKey={appointment => appointment.id}
            />
          )}
        </ClassNames>
      </Container>
    </>
  );
};

const Title = styled.h1`
  font-size: 26px;
`;

const Container = styled.div`
  width: 100%;
`;

const PersonAvatar = ({ person }: { person: Doctor | Patient }) => {
  return (
    <div>
      <Avatar src={person.picture} css={{ marginRight: 10 }} />
      <span>{person.fullname}</span>
    </div>
  );
};
