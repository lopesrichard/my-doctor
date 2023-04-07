import { ConfigProvider } from 'antd';
import { themes } from '~/themes';
import { Router } from './routes';
import ptBR from 'antd/locale/pt_BR';

export const App = () => {
  return (
    <ConfigProvider theme={themes.main} locale={ptBR}>
      <Router />
    </ConfigProvider>
  );
};
