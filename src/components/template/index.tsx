import { Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import { Header } from './header';
import { Content } from './content';
import { SideMenu } from './sidemenu';
import { storage } from '~/storage/auth';

export const Template = () => {
  const auth = storage.read();
  return auth ? (
    <Layout>
      <Header />
      <Layout>
        <SideMenu />
        <Content />
      </Layout>
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};
