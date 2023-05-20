import { Layout, Grid, Breakpoint } from 'antd';
import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import { ResponsiveProps } from '~/types/responsive';

export const Content = () => {
  const breakpoints = Grid.useBreakpoint();
  return (
    <Background breakpoints={breakpoints}>
      <Container breakpoints={breakpoints}>
        <Outlet />
      </Container>
    </Background>
  );
};

const Background = styled(Layout.Content)<ResponsiveProps>`
  padding-top: ${({ breakpoints }) => (breakpoints.lg ? '50px' : '10px')};
  padding-bottom: ${({ breakpoints }) => (breakpoints.lg ? '50px' : '10px')};
  padding-left: ${({ breakpoints }) => (breakpoints.lg ? '50px' : '10px')};
  padding-right: ${({ breakpoints }) => (breakpoints.lg ? '50px' : '10px')};
  min-height: calc(100vh - 64px);
`;

const Container = styled.div<ResponsiveProps>`
  display: flex;
  margin: 0 auto;
  padding: ${({ breakpoints }) => (breakpoints.lg ? '30px' : '10px')};
  min-height: 100%;
  background-color: white;
`;
