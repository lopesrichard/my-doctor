import { MoreOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import * as Ant from 'antd';
import { FunctionComponent } from 'react';

export const ActionButton: FunctionComponent<Pick<Ant.MenuProps, 'items'>> = ({ items }) => {
  return (
    <Ant.Dropdown trigger={['hover']} menu={{ items }} placement="bottom">
      <Button onClick={event => event.stopPropagation()} icon={<MoreOutlined />} shape="circle" />
    </Ant.Dropdown>
  );
};

const Button = styled(Ant.Button)`
  background-color: transparent;
  border: none;
  box-shadow: none;
  color: inherit;
  &:hover {
    background-color: #eeeeee;
  }
`;
