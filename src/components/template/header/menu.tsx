import { UserOutlined, LogoutOutlined, SettingOutlined, AccountBookOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import * as Ant from 'antd';
import * as Router from 'react-router-dom';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { useEffect, useState } from 'react';
import { router } from '~/app/routes';
import { service as PatientService } from '~/services/patient';
import { service as DoctorService } from '~/services/doctor';
import { storage } from '~/storage/auth';
import { Role } from '~/enums/role';

const items: ItemType[] = [
  { label: <Router.Link to="account">Minha conta</Router.Link>, key: 'account', icon: <AccountBookOutlined /> },
  { label: <Router.Link to="settings">Configurações</Router.Link>, key: 'settings', icon: <SettingOutlined /> },
  {
    label: 'Sair',
    key: 'logout',
    icon: <LogoutOutlined />,
    onClick: () => {
      storage.clear();
      router.navigate('/login');
    },
  },
];

export const Menu = () => {
  const auth = storage.read();

  const [picture, setPicture] = useState<string>();

  const load = async () => {
    const response = auth.role === Role.PATIENT ? await PatientService.self() : await DoctorService.self();
    if (response.success) setPicture(response.data.picture);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Ant.Dropdown menu={{ items }} placement="bottomLeft" trigger={['click']}>
      <Link onClick={e => e.preventDefault()}>
        <Ant.Space>{picture ? <Ant.Avatar src={picture} size="large" /> : <UserOutlined />}</Ant.Space>
      </Link>
    </Ant.Dropdown>
  );
};

const Link = styled.a``;
