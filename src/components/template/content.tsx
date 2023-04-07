import { Layout, Grid, Breakpoint } from 'antd';
import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';

export const Content = () => {
  const screens = Grid.useBreakpoint();
  return (
    <Background screens={screens}>
      <Container>
        <Outlet />
      </Container>
    </Background>
  );
};

type BackgroundProps = {
  screens: Partial<Record<Breakpoint, boolean>>;
};

const Background = styled(Layout.Content)<BackgroundProps>`
  padding-top: ${props => (props.screens.lg ? '50px' : '10px')};
  padding-bottom: ${props => (props.screens.lg ? '50px' : '10px')};
  padding-left: ${props => (props.screens.lg ? '50px' : '10px')};
  padding-right: ${props => (props.screens.lg ? '50px' : '10px')};
  min-height: 100vh;
`;

const Container = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 30px;
  min-height: 100%;
  background-color: white;
`;
