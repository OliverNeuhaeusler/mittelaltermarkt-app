import styled from 'styled-components/macro';
import Login from '../components/Login.js';

function ProfileCard({
  loggedIn,
  setLoggedIn,
  onLogOut,
  profiles,
  getProfile,
}) {
  return (
    <Section>
      {loggedIn ? (
        <>
          <article>
            <h3>{profiles.firstName}</h3>
            <h3>{profiles.secondName}</h3>
          </article>
          <p>{profiles.street}</p>
          <p>{profiles.address}</p>
          <StyledButton onClick={onLogOut}>Logout</StyledButton>
        </>
      ) : (
        <Login
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          getProfile={getProfile}
        />
      )}
    </Section>
  );
}

const Section = styled.section`
  align-items: center;
  background: var(--PrimaryCard);
  border: groove 0.1rem var(--PrimaryBorder);
  border-radius: 1rem;
  color: hsl(37, 19%, 90%);
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: auto;
  justify-content: center;
  margin: 1rem auto;
  min-width: calc((100% -2rem) / 3);
  position: relative;
  width: 15rem;
  z-index: 1;

  article {
    display: flex;
  }
  h3 {
    padding-left: 0.5rem;
  }
`;

const StyledButton = styled.button`
  background: hsl(37, 19%, 70%);
  border: 1px solid hsl(37, 19%, 70%);
  border-radius: 1.25rem;
  color: hsl(20, 38%, 26%);
  cursor: pointer;
  margin: 0.313rem auto 1rem;
  outline: none;
  padding: 0.3rem 0.7rem;
`;

export default ProfileCard;
