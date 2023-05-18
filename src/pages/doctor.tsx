import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import * as Ant from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import styled from '@emotion/styled';
import { Doctor } from '~/entities/doctor';
import { service as doctorService } from '~/services/doctor';
import { service as appointmentService } from '~/services/appointments';
import { notify } from '~/notifications';
import { Availability } from '~/entities/availability';
import { AppointmentStatus } from '~/enums/appointment-status';

export const DoctorPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [selectedDate, setSelectedDate] = useState<Dayjs>();
  const [selectedTime, setSelectedTime] = useState<Dayjs>();
  const [doctor, setDoctor] = useState<Doctor>();
  const [loading, setLoading] = useState(false);

  const load = async (id: number) => {
    const find = await doctorService.find(id);
    const appointments = await doctorService.appointments(id);
    if (find.success && appointments.success) {
      setDoctor({ ...find.data, appointments: appointments.data });
      setSelectedDate(calculateFirstAvailableDay(find.data.availability));
    } else {
      notify.error('Ocorreu um problema ao consultar os dados do médico');
    }
  };

  const calculateFirstAvailableDay = (availability: Availability[]) => {
    if (availability.length === 0) return;

    let current = dayjs();

    while (!availability.find(({ dayOfWeek }) => dayOfWeek === current.day())) {
      current = current.add(1, 'day');
    }

    return current;
  };

  useEffect(() => {
    if (id) load(parseInt(id));
  }, []);

  const makeAppointment = async (doctor: Doctor) => {
    setLoading(true);

    if (!selectedDate || !selectedTime) return;

    const scheduledTo = selectedDate
      .set('hour', selectedTime.hour())
      .set('minute', selectedTime.minute())
      .set('seconds', 0)
      .set('milliseconds', 0);

    const response = await appointmentService.schedule({
      scheduledTo: scheduledTo.toISOString(),
      clinic_id: doctor.clinics[0].id,
      doctor_id: doctor.id,
      patient_id: import.meta.env.VITE_PATIENT_ID,
    });

    if (response.success) {
      notify.success('Consulta agendada com sucesso');
      navigate('/appointments');
    } else {
      notify.error('Ocorreu um erro no agendamento');
    }

    setLoading(false);
  };

  if (!id) {
    return <Navigate to="/doctors" />;
  }

  if (!doctor) {
    return null;
  }

  const availabilities = selectedDate
    ? doctor.availability.filter(availability => availability.dayOfWeek === selectedDate.day())
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
          if (!doctor.availability.some(availability => availability.dayOfWeek === date.day())) return true;
          return false;
        }}
        onSelect={date => setSelectedDate(date)}
        defaultValue={selectedDate}
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

                let startTime = availability.startTime;
                let endTime = availability.endTime;

                while (startTime.isBefore(endTime)) {
                  options.push(startTime);
                  startTime = startTime.add(15, 'minutes');
                }

                return options.map(option => {
                  const hasAppointment = appointments.some(
                    appointment =>
                      appointment.status !== AppointmentStatus.CANCELED &&
                      appointment.scheduledTo.format('HH:mm') === option.format('HH:mm')
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
      {selectedDate && selectedTime && (
        <Ant.Button type="primary" onClick={() => makeAppointment(doctor)} loading={loading}>
          Agendar consulta
        </Ant.Button>
      )}
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
