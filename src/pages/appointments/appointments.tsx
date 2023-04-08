import { useLoaderData, useNavigate } from 'react-router-dom';
import { Appointment } from '~/entities/appointment';
import styled from '@emotion/styled';
import { Avatar, Badge, Divider, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Doctor } from '~/entities/doctor';
import { AppointmentStatus } from '~/enums/appointment-status';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { ActionButton } from '~/components/template/action-button';
import { useState } from 'react';
import { AppointmentDetails } from '~/modals/appointment-details';
import { ClassNames } from '@emotion/react';
import * as Ant from 'antd';
import { Dayjs } from 'dayjs';

export const Appointments = () => {
  const navigate = useNavigate();

  const appointments = useLoaderData() as Appointment[];
  const [appointment, setAppointment] = useState<Appointment | null>(null);

  const cancel = async (appointment: Appointment) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/appointments/${appointment.id}`, {
      method: 'DELETE',
    });

    if (response.status === 200) {
      Ant.notification.success({
        placement: 'topRight',
        message: 'Cancelamento efetuado com sucesso',
        icon: <CheckOutlined />,
      });

      navigate('.');
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
