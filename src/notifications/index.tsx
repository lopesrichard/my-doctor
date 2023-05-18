import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { notification } from 'antd';

export const notify = {
  success: (message: string) => {
    notification.success({ placement: 'topRight', message: message, icon: <CheckOutlined /> });
  },
  error: (message: string) => {
    notification.success({ placement: 'topRight', message: message, icon: <CloseOutlined /> });
  },
};
