import { Layout } from 'antd';
import { Menu } from './menu';
import styled from '@emotion/styled';

export const Header = () => (
  <Row>
    <Menu />
  </Row>
);

const Row = styled(Layout.Header)`
  display: flex;
  justify-content: flex-end;
`;
