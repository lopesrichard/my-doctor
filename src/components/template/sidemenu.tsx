import { MedicineBoxOutlined } from '@ant-design/icons';
import * as Ant from 'antd';
import Sider from 'antd/es/layout/Sider';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';

const items: Ant.MenuProps['items'] = [
  {
    key: 'appointments',
    label: 'Minhas consultas',
    icon: <MedicineBoxOutlined />,
  },
  {
    key: 'specialties',
    label: 'Especialidades',
    icon: <MedicineBoxOutlined />,
  },
  {
    key: 'doctors',
    label: 'Médicos',
    icon: <MedicineBoxOutlined />,
  },
];

const extractKeyFromPathname = (pathname: string) => pathname.split('/')[1];

export const SideMenu = () => {
  const breakpoints = Ant.Grid.useBreakpoint();
  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(true);
  const [key, setKey] = useState(extractKeyFromPathname(location.pathname));

  useEffect(() => {
    setKey(extractKeyFromPathname(location.pathname));
  }, [location]);

  return (
    <Sider
      width={breakpoints.lg ? 300 : 150}
      collapsible
      collapsed={collapsed}
      onCollapse={value => setCollapsed(value)}
    >
      <Menu mode="inline" selectedKeys={[key]} items={items} onClick={evt => navigate(evt.key)} />
    </Sider>
  );
};

const Menu = styled(Ant.Menu)`
  height: 100%;
  border-right: 0;
`;
