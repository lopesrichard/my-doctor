import { CalendarOutlined, MedicineBoxOutlined, TeamOutlined, CalendarFilled } from '@ant-design/icons';
import * as Ant from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { storage } from '~/storage/auth';
import { Role } from '~/enums/role';

const items: Record<Role, Ant.MenuProps['items']> = {
  [Role.PATIENT]: [
    {
      key: 'appointments',
      label: 'Minhas consultas',
      icon: <CalendarOutlined />,
    },
    {
      key: 'specialties',
      label: 'Especialidades',
      icon: <MedicineBoxOutlined />,
    },
    {
      key: 'doctors',
      label: 'Médicos',
      icon: <TeamOutlined />,
    },
  ],
  [Role.DOCTOR]: [
    {
      key: 'appointments',
      label: 'Minhas consultas',
      icon: <CalendarOutlined />,
    },
    {
      key: 'calendar',
      label: 'Agenda',
      icon: <CalendarFilled />,
    },
  ],
  [Role.ADMIN]: [],
};

const extractKeyFromPathname = (pathname: string) => pathname.split('/')[1];

export const SideMenu = () => {
  const auth = storage.read();

  const breakpoints = Ant.Grid.useBreakpoint();
  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [key, setKey] = useState(extractKeyFromPathname(location.pathname));

  useEffect(() => {
    setKey(extractKeyFromPathname(location.pathname));
  }, [location]);

  return (
    <Sider
      width={300}
      collapsible
      collapsed={!breakpoints.lg || collapsed}
      onCollapse={value => setCollapsed(value)}
      trigger={!breakpoints.lg && null}
    >
      <Menu mode="inline" selectedKeys={[key]} items={items[auth.role]} onClick={evt => navigate(evt.key)} />
    </Sider>
  );
};

const Sider = styled(Ant.Layout.Sider)`
  width: 300px !important;
`;

const Menu = styled(Ant.Menu)`
  height: 100%;
  border-right: 0;
`;
