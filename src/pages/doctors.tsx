import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import * as Ant from 'antd';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Doctor } from '~/entities/doctor';
import { service } from '~/services/doctor';
import { notify } from '~/notifications';

export const DoctorsPage = () => {
  const location = useLocation();
  const [params] = useSearchParams();

  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const load = async () => {
    const specialty = params.get('specialty');
    const response = await service.list(specialty);
    if (response.success) {
      setDoctors(response.data);
    } else {
      notify.error(response.error);
    }
  };

  useEffect(() => {
    load();
  }, [location]);

  return (
    <Container>
      <Title>Médicos</Title>
      <Ant.Divider />
      <Grid>
        {doctors.map(doctor => {
          return (
            <Link key={doctor.id} to={doctor.id.toString()}>
              <Card key={doctor.registrationNumber}>
                <Picture src={doctor.picture} />
                <Rating value={doctor.rating} allowHalf />
                <FullName>{doctor.fullname}</FullName>
                <RegistrationNumber>CRM - {doctor.registrationNumber}</RegistrationNumber>
              </Card>
            </Link>
          );
        })}
      </Grid>
    </Container>
  );
};

const Title = styled.h1`
  font-size: 26px;
`;

const Container = styled.div`
  width: 100%;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  text-align: center;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: 300ms opacity;
  &:hover {
    opacity: 70%;
  }
`;

const Picture = styled.img`
  object-fit: cover;
  object-position: top;
  width: 100%;
  height: 300px;
  margin-bottom: 5px;
  border-radius: 20px;
`;

const Rating = styled(Ant.Rate)`
  margin-bottom: 5px;
`;

const FullName = styled.span`
  font-size: 20px;
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 5px;
`;

const RegistrationNumber = styled.span`
  font-size: 16px;
  margin-bottom: 5px;
`;
