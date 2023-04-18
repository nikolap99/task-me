import { useEffect, useState } from 'react';
import styles from './Login.module.scss';
import { TextField } from '../../components/TextField';

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    // read localStorage sessionToken
    // if it exists, navigate("/");
  }, []);

  const isLoginFormValid = loginEmail && loginPassword;
  const isRegisterFormValid = registerEmail && registerPassword && firstName && lastName;

  return (
    <div className={styles.CardContainer}>
      <div className={styles.Card}>
        <h2>Login</h2>
        <form className={styles.Card_Fields}>
          <TextField placeholder='Email...' value={loginEmail} onChange={(value) => setLoginEmail(value)}/>
          <TextField placeholder='Password...' value={loginPassword} onChange={(value) => setLoginPassword(value)} type='password' />
          <button 
            className={isLoginFormValid ? styles.Card_Button : styles.Card_Button_Disabled}
            type='submit'
          >
            Login
          </button>
        </form>
      </div>
      <div className={styles.Card}>
        <h2>Register</h2>
        <form className={styles.Card_Fields}>
          <TextField placeholder='Email...' value={registerEmail} onChange={(value) => setRegisterEmail(value)} type='email' />
          <TextField placeholder='Password...' value={registerPassword} onChange={(value) => setRegisterPassword(value)} type='password' />
          <TextField placeholder='First name...' value={firstName} onChange={(value) => setFirstName(value)}/>
          <TextField placeholder='Last name...' value={lastName} onChange={(value) => setLastName(value)}/>
          <button 
            className={isRegisterFormValid ? styles.Card_Button : styles.Card_Button_Disabled}
            type='submit'
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export { Login };
