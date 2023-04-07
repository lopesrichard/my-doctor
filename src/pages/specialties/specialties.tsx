import { useLoaderData } from 'react-router-dom';
import * as Icons from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { css, SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import { MedicalSpecialty } from '~/entities/medical-specialty';
import { Divider } from 'antd';

export const Specialties = () => {
  const specialties = useLoaderData() as MedicalSpecialty[];
  return (
    <Container>
      <Title>Especialidades</Title>
      <Divider />
      <Grid>
        {specialties.map(specialty => {
          const Icon = Icons[specialty.icon];
          return (
            <Link key={specialty.code} to={`/doctors?specialty=${specialty.code}`}>
              <Box>
                <Icon css={styles.icon} />
                <Description>{specialty.description}</Description>
              </Box>
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
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 250px;
  max-width: 100%;
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
