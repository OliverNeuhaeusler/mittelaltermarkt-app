import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components/macro';
import { saveToken } from '../lib/tokenStorage.js';
import logInUser from './loginUser.js';

export default function Login() {
  const [profile, setProfile] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [wrongData, setWrongData] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    logInUser(profile)
      .then((result) => {
        if (result.message !== 'success') {
          setWrongData(true);
        } else {
          saveToken(result.token);
          setIsSuccess(true);
        }
      })
      .catch(() => setWrongData(true));
  }

  const handleInputChange = (event) => {
    event.persist();
    setProfile((profile) => ({
      ...profile,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <>
      <LoginForm onSubmit={handleSubmit}>
        <article id="email">
          <label htmlFor="Email">Email:</label>
          <input
            id="Email"
            autoFocus
            name="email"
            type="email"
            value={profile.email}
            onChange={handleInputChange}
          />
        </article>
        <article id="password">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            name="password"
            value={profile.password}
            onChange={handleInputChange}
          />
        </article>
        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
      </LoginForm>
      {isSuccess && (
        <StyledBackgroundModal>
          <StyledModal>
            <p>Login successful</p>
            <StyledButton onClick={() => setLoggedIn(true)}>
              I Dare
            </StyledButton>
          </StyledModal>
        </StyledBackgroundModal>
      )}
      {loggedIn && <Redirect to="/" />}
      {wrongData && (
        <StyledBackgroundModal>
          <StyledModal>
            <p>User or Password wrong</p>
            <StyledButton onClick={() => setIsError(true)}>
              I Pussy out
            </StyledButton>
          </StyledModal>
        </StyledBackgroundModal>
      )}
      {isError && <Redirect to="/" />}
    </>
  );
}

const LoginForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  position: fixed;
  left: 72%;
  top: 2.5%;

  article {
    padding: 1rem;
  }

  label {
    color: hsl(37, 19%, 90%);
    padding: 0.5rem;
  }
`;

const StyledBackgroundModal = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledModal = styled.div`
  color: #fff;
  background: linear-gradient(-45deg, #e73c7e, #23a6d5);
  height: 20%;
  width: 50%;
  display: flex;
  justify-content: center;
  border-radius: 20px;
  align-items: center;
  flex-direction: column;
`;

const StyledButton = styled.button`
  color: #fbfcfd;
  background: transparent;
  border: 1px solid #fbfcfd;
  border-radius: 20px;
  outline: none;
  cursor: pointer;
  padding: 10px 25px;
  margin: 5px;
`;
