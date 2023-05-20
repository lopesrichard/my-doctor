import * as Ant from 'antd';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Credentials } from '~/models/credentials';
import { service } from '~/services/auth';
import { storage } from '~/storage/auth';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    storage.clear();
  }, []);

  const login = async (values: Credentials) => {
    setLoading(true);

    const response = await service.signin(values);

    if (response.success) {
      storage.store(response.data);
      navigate('/');
    } else {
      setError(response.error);
    }

    setLoading(false);
  };

  return (
    <Layout>
      <Container>
        <Row justify="center">
          <Ant.Col xs={24} sm={24} md={16} lg={12} xl={8} xxl={6}>
            <Card>
              <Image src="/logo.png" />
              <Alert type="error" message={error} style={{ visibility: error ? 'visible' : 'hidden' }} />
              <Ant.Form onFinish={login} onChange={() => setError(null)}>
                <Item name="username" rules={[{ required: true, message: 'Informe o usuário' }]}>
                  <Input placeholder="Usuário" type="text" size="large" autoComplete="off" />
                </Item>
                <Item name="password" rules={[{ required: true, message: 'Informe a senha' }]}>
                  <Input placeholder="Senha" type="password" size="large" />
                </Item>
                <Button type="primary" size="large" htmlType="submit" loading={loading}>
                  Entrar
                </Button>
              </Ant.Form>
            </Card>
          </Ant.Col>
        </Row>
      </Container>
    </Layout>
  );
};

const Layout = styled(Ant.Layout)`
  min-height: 100vh;
`;

const Container = styled(Ant.Layout.Content)`
  display: flex;
  align-items: center;
`;

const Row = styled(Ant.Row)`
  flex: auto;
  padding: 20px;
`;

const Card = styled(Ant.Card)`
  padding: 20px;
`;

const Image = styled.img`
  display: block;
  margin: 0 auto;
  margin-bottom: 20px;
  width: 50%;
`;

const Item = styled(Ant.Form.Item)``;

const Input = styled(Ant.Input)``;

const Button = styled(Ant.Button)`
  width: 100%;
`;

const Alert = styled(Ant.Alert)`
  height: 40px;
  margin-bottom: 24px;
`;
