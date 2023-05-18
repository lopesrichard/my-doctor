import { UserOutlined, LogoutOutlined, SettingOutlined, AccountBookOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import * as Ant from 'antd';
import * as Router from 'react-router-dom';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { useEffect, useState } from 'react';
import { router } from '~/app/routes';
import { service } from '~/services/patient';
import { storage } from '~/storage/auth';

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
  const [picture, setPicture] = useState<string>();

  const load = async () => {
    const response = await service.find();
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
