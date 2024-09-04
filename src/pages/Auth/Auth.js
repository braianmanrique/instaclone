import React, { useState } from 'react'
import "./Auth.scss";
import { Container , Image} from 'semantic-ui-react';

import instaclone from "../../assets/png/instaclone.png";
import RegisterForm from '../../components/Auth/RegisterForm/RegisterForm';
import LoginForm from '../../components/Auth/loginForm/LoginForm';

export default function Auth() {
    const [showLogin, setShowLogin] = useState(true);

  return (
   <Container fluid className='auth'>
    <Image src={instaclone} />
    <div className='container-form'>
        {showLogin ? <LoginForm /> : <RegisterForm  setShowLogin={setShowLogin} />}
    </div>

    <div className='change-form'>
          
            {showLogin ? (
                <>
                        ¿No tienes cuenta?
                        <span onClick={() => setShowLogin(!showLogin)}>Registrate</span>
                </>
            ): 
                <>
                        !Entra con tu cuenta!
                        <span onClick={() => setShowLogin(!showLogin)}>Inciar session</span>
                </>
            }
    </div>
   </Container>
  )
}
