import { Layout } from 'antd';
import { Header } from './header';
import { Content } from './content';
import { SideMenu } from './sidemenu';

export const Template = () => {
  return (
    <Layout>
      <Header />
      <Layout>
        <SideMenu />
        <Content />
      </Layout>
    </Layout>
  );
};
