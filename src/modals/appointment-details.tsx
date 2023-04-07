import { Badge, Descriptions, Divider, Modal, ModalProps } from 'antd';
import styled from '@emotion/styled';
import { Appointment } from '~/entities/appointment';
import { FunctionComponent } from 'react';
import { AppointmentLocation } from './appointment-location';
import { AppointmentStatus } from '~/enums/appointment-status';

export type AppointmentDetailsProps = ModalProps & {
  appointment: Appointment;
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

export const AppointmentDetails: FunctionComponent<AppointmentDetailsProps> = ({ appointment, ...props }) => {
  return (
    <Modal {...props} open footer={false} width="80%">
      <Container>
        <Title>Detalhes da consulta</Title>
        <Descriptions title="Detalhes:" column={1}>
          <Descriptions.Item label="Status">
            <Badge {...badges[appointment.status]} />
          </Descriptions.Item>
          <Descriptions.Item label="Data">{appointment.scheduledTo.toLocaleDateString()}</Descriptions.Item>
          <Descriptions.Item label="Horário">{appointment.scheduledTo.toLocaleTimeString()}</Descriptions.Item>
          <Descriptions.Item label="Médico Responsável">{appointment.doctor.fullname}</Descriptions.Item>
          <Descriptions.Item label="Endereço">{appointment.clinic.address.addressLine}</Descriptions.Item>
          <Descriptions.Item>
            <AppointmentLocation appointment={appointment} />
          </Descriptions.Item>
        </Descriptions>
        <Divider />
      </Container>
    </Modal>
  );
};

const Title = styled.h1`
  font-size: 26px;
`;

const Container = styled.div`
  width: 100%;
`;
