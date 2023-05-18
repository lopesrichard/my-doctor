import { Layout } from 'antd';
import { Menu } from './menu';
import styled from '@emotion/styled';
import * as Router from 'react-router-dom';

export const Header = () => (
  <Row>
    <Link to="/">
      <Logo src="/logo-white.png" />
    </Link>
    <Menu />
  </Row>
);

const Row = styled(Layout.Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
`;

const Link = styled(Router.Link)`
  height: 80%;
`;

const Logo = styled.img`
  height: 100%;
  margin-top: -10%;
`;
