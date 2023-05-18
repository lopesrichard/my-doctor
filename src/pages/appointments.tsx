import { useNavigate } from 'react-router-dom';
import { Appointment } from '~/entities/appointment';
import styled from '@emotion/styled';
import { Avatar, Badge, Divider, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Doctor } from '~/entities/doctor';
import { AppointmentStatus } from '~/enums/appointment-status';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { ActionButton } from '~/components/template/action-button';
import { useEffect, useState } from 'react';
import { AppointmentDetails } from '~/modals/appointment-details';
import { ClassNames } from '@emotion/react';
import * as Ant from 'antd';
import { Dayjs } from 'dayjs';
import { service as patientService } from '~/services/patient';
import { service as appointmentService } from '~/services/appointments';
import { notify } from '~/notifications';

export const AppointmentsPage = () => {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [appointment, setAppointment] = useState<Appointment | null>(null);

  const load = async () => {
    const response = await patientService.appointments();
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
    {
      dataIndex: 'doctor',
      title: 'Médico',
      render: (doctor: Doctor) => <DoctorAvatar doctor={doctor} />,
      responsive: ['lg'],
    },
    {
      dataIndex: 'status',
      title: 'Status',
      render: (status: AppointmentStatus) => <Badge {...badges[status]} />,
      responsive: ['lg'],
    },
  ];

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

const DoctorAvatar = ({ doctor }: { doctor: Doctor }) => {
  return (
    <div>
      <Avatar src={doctor.picture} css={{ marginRight: 10 }} />
      <span>{doctor.fullname}</span>
    </div>
  );
};
