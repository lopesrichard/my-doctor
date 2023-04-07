import { useLoaderData } from 'react-router-dom';
import { Doctor } from '../../entities/doctor';
import { Rate } from 'antd';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

export const Doctors = () => {
  const doctors = useLoaderData() as Doctor[];
  return (
    <div>
      <Title>Médicos</Title>
      <Container>
        {doctors.map(doctor => {
          return (
            <Link to={doctor.registrationNumber}>
              <Card key={doctor.registrationNumber}>
                <Picture src={doctor.picture} />
                <Rating value={doctor.rating} allowHalf />
                <FullName>{doctor.fullname}</FullName>
                <RegistrationNumber>CRM - {doctor.registrationNumber}</RegistrationNumber>
              </Card>
            </Link>
          );
        })}
      </Container>
    </div>
  );
};

const Title = styled.h1`
  font-size: 26px;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  height: 350px;
  padding: 20px;
  color: black;
  &hover {
    opacity: 50%;
  }
`;

const Picture = styled.img`
  object-fit: cover;
  object-position: top;
  width: 100%;
  min-height: 250px;
  margin-bottom: 5px;
  border-radius: 20px;
`;

const Rating = styled(Rate)`
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
