import { ConfigProvider } from 'antd';
import { Router } from './routes';
import { themes } from '../themes';

export const App = () => {
  return (
    <ConfigProvider theme={themes.main}>
      <Router />
    </ConfigProvider>
  );
};
