import { UserOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';

const items: ItemType[] = [
  {
    label: 'Sair',
    key: 'logout',
  },
];

export const Menu = () => (
  <Dropdown menu={{ items }} placement="bottom">
    <a onClick={e => e.preventDefault()}>
      <Space>
        <UserOutlined />
      </Space>
    </a>
  </Dropdown>
);
