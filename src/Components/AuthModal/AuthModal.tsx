import Signup from './Signup';
import Login from './Login';
import styled from 'styled-components';
import react, { useState } from 'react';

type AuthModalProps = {
  setAuthModal: React.Dispatch<React.SetStateAction<boolean>>;
};

// 로그인과 회원가입을 하나의 modal내에서 제공
function AuthModal({ setAuthModal }: AuthModalProps) {
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
      {isLogin && (
        <Login handleIsLogin={handleIsLogin} setAuthModal={setAuthModal} />
      )}
      {!isLogin && (
        <Signup handleIsLogin={handleIsLogin} setAuthModal={setAuthModal} />
      )}
    </ModalContainer>
  );
}

export default AuthModal;

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;