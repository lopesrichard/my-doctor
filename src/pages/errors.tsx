import { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { theme } from 'antd';

const { useToken } = theme;

export const Forbidden = () => {
  return <Error code={403} message="Você não tem acesso ao recurso solicitado" />;
};

export const NotFound = () => {
  return <Error code={404} message="O recurso que você procurava não foi encontrado" />;
};

type ErrorProps = {
  code: number;
  message: string;
};

const Error: FunctionComponent<ErrorProps> = ({ code, message }) => {
  const { token } = useToken();

  return (
    <Container>
      <Code color={token.colorPrimary}>{code}</Code>
      <Message color={token.colorLink}>{message}</Message>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Code = styled.span`
  font-size: 200px;
  color: ${props => props.color};
  font-weight: bold;
`;

const Message = styled.p`
  font-size: 32px;
  color: ${props => props.color};
`;
