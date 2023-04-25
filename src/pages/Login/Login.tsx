import { useEffect, useState } from 'react';
import styles from './Login.module.scss';
import { TextField } from '../../components/TextField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [registerErrorMessage, setRegisterErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("password", loginPassword);
    formData.append("email", loginEmail);
    try {
      const { data } = await axios.post("http://localhost:8000/server.php/login", formData, {
        headers: {
          "Content-Type": "application/json",
        }
      })
      setLoginErrorMessage("");
      localStorage.setItem("auth_token", data);
      localStorage.setItem("current_user", loginEmail);
      navigate("/");
      console.log({ data });
    } catch (e: any) {
      setLoginErrorMessage(e.response.data);
    }
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("password", registerPassword);
    formData.append("email", registerEmail);
    try {
      const { data } = await axios.post("http://localhost:8000/server.php/users", formData, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      localStorage.setItem("auth_token", data);
      localStorage.setItem("current_user", registerEmail);
      navigate("/");
    } catch (e: any) {
      setRegisterErrorMessage(e.response.data);
    }
  }

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
        <form className={styles.Card_Fields} onSubmit={(e) => handleLogin(e)}>
          <TextField placeholder='Email...' value={loginEmail} onChange={(value) => setLoginEmail(value)}/>
          <TextField placeholder='Password...' value={loginPassword} onChange={(value) => setLoginPassword(value)} type='password' />
          {loginErrorMessage && <p>{loginErrorMessage}</p>}
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
        <form className={styles.Card_Fields} onSubmit={(e) => handleRegister(e)}>
          <TextField placeholder='Email...' value={registerEmail} onChange={(value) => setRegisterEmail(value)} type='email' />
          <TextField placeholder='Password...' value={registerPassword} onChange={(value) => setRegisterPassword(value)} type='password' />
          <TextField placeholder='First name...' value={firstName} onChange={(value) => setFirstName(value)}/>
          <TextField placeholder='Last name...' value={lastName} onChange={(value) => setLastName(value)}/>
          {registerErrorMessage && <p>{registerErrorMessage}</p>}
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
