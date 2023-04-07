import { useLoaderData } from 'react-router-dom';
import { MedicalSpecialty } from '../../entities/medical-specialty';
import * as Icons from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { css, SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';

export const Specialties = () => {
  const specialties = useLoaderData() as MedicalSpecialty[];
  return (
    <Container>
      {specialties.map(specialty => {
        const Icon = Icons[specialty.icon];
        return (
          <Link key={specialty.code} to={`/doctors/${specialty.code}`}>
            <Box>
              <Icon css={styles.icon} />
              <Description>{specialty.description}</Description>
            </Box>
          </Link>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 250px;
  height: 120px;
  margin: 10px;
`;

const Description = styled.span`
  text-align: center;
`;

const styles: Record<string, SerializedStyles> = {
  icon: css`
    font-size: 30px;
    margin-bottom: 20px;
  `,
};
