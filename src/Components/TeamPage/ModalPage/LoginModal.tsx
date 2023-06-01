import Signup from '../../RegisterPage/Signup';
import Login from '../../LoginPage/Login';
import styled from 'styled-components';
import { useState } from 'react';

function LoginModal() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const handleIsLogin = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isLogin) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  };

  return (
    <ModalContainer>
      {isLogin && <Login handleIsLogin={handleIsLogin} />}
      {!isLogin && <Signup handleIsLogin={handleIsLogin} />}
    </ModalContainer>
  );
}

export default LoginModal;

const ModalContainer = styled.div``;
