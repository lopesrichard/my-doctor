import { ConfigProvider } from 'antd';
import { themes } from '~/themes';
import { Router } from './routes';

export const App = () => {
  return (
    <ConfigProvider theme={themes.main}>
      <Router />
    </ConfigProvider>
  );
};
