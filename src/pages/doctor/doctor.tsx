import { useLoaderData } from 'react-router-dom';
import * as Ant from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import styled from '@emotion/styled';

import { Doctor } from '~/entities/doctor';
import { useState } from 'react';

export const DoctorPanel = () => {
  const doctor = useLoaderData() as Doctor;

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);

  const availabilities = selectedDate
    ? doctor.availability.filter(availability => availability.day_of_week === selectedDate.day())
    : [];

  const appointments = selectedDate
    ? doctor.appointments.filter(
        appointment => appointment.scheduledTo.format('YYYYMMDD') === selectedDate.format('YYYYMMDD')
      )
    : [];

  return (
    <Container>
      <Title>
        {doctor.fullname} | CRM - {doctor.registrationNumber}
      </Title>
      <Ant.Divider />
      <Picture src={doctor.picture} />
      <Ant.Calendar
        fullscreen={false}
        mode="month"
        validRange={[dayjs(), dayjs().add(3, 'month')]}
        disabledDate={date => {
          if (date.isBefore(dayjs())) return true;
          if (!doctor.availability.some(availability => availability.day_of_week === date.day())) return true;
          return false;
        }}
        onSelect={date => setSelectedDate(date)}
      />
      {availabilities.length > 0 && (
        <div css={{ marginBottom: 20 }}>
          <h1>Horários disponíveis:</h1>
          <div>
            <Ant.Radio.Group
              onChange={evt => setSelectedTime(dayjs(evt.target.value))}
              value={selectedTime?.toISOString()}
            >
              {availabilities.map(availability => {
                const options: Dayjs[] = [];

                let startTime = availability.start_time;
                let endTime = availability.end_time;

                while (startTime.isBefore(endTime)) {
                  options.push(startTime);
                  startTime = startTime.add(15, 'minutes');
                }

                return options.map(option => {
                  const hasAppointment = appointments.some(
                    appointment => appointment.scheduledTo.format('HH:mm') === option.format('HH:mm')
                  );
                  return (
                    <Ant.Radio key={option.toISOString()} value={option.toISOString()} disabled={hasAppointment}>
                      {option.format('HH:mm')}
                    </Ant.Radio>
                  );
                });
              })}
            </Ant.Radio.Group>
          </div>
        </div>
      )}
      {selectedDate && selectedTime && <Ant.Button type="primary">Agendar consulta</Ant.Button>}
    </Container>
  );
};

const Title = styled.h1`
  font-size: 26px;
`;

const Container = styled.div`
  width: 100%;
`;

const Picture = styled.img`
  object-fit: cover;
  object-position: top;
  width: 200px;
  height: 200px;
  margin-bottom: 5px;
  border-radius: 100%;
`;
