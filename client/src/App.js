import { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { saveToLocalStorage, loadFromLocalStorage } from './lib/localStorage';
import styled from 'styled-components/macro';
import BurgerMenu from './BurgerMenu.js';
import MarktCard from './pages/MarktCard.js';
import MarktForm from './pages/MarktForm.js';

function App() {
  const [markts, setMarkts] = useState(loadFromLocalStorage('Märkte') ?? []);
  const [comments, setComments] = useState(
    loadFromLocalStorage('Comments') ?? []
  );

  function addComment(comment, marktToUpdate) {
    const foundMarkt = markts.find((markt) => {
      return markt.name === marktToUpdate.name;
    });
    foundMarkt.comments.push(comment);
    const upToDateMarkts = markts.filter((markt) => {
      return markt.name !== marktToUpdate.name;
    });
    setMarkts([...upToDateMarkts, foundMarkt]);
  }
  useEffect(() => {
    saveToLocalStorage('Comments', comments);
  }, [comments]);

  useEffect(() => {
    saveToLocalStorage('Märkte', markts);
  }, [markts]);

  function addMarkt(markt) {
    setMarkts([...markts, markt]);
  }

  return (
    <div>
      <Header>
        <h1>Mittelalter-Märkte</h1>
      </Header>
      <main>
        <BurgerMenu />
        <Switch>
          <Route exact path="/">
            Home
          </Route>
          <Route path="/markt">
            {markts.map((markt) => (
              <MarktCard
                markt={markt}
                onAddComment={addComment}
                comments={comments}
              />
            ))}
          </Route>
          <Route path="/favorites">Favoriten</Route>
          <Route path="/createmarkt">
            <MarktForm onAddMarkt={addMarkt} />
          </Route>
          <Route path="/profil">Profil</Route>
          <Route path="/contact">Kontakt</Route>
          <Route path="/impressum">Impressum</Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;

const Header = styled.header`
  display: flex;
  z-index: 100;

  h1 {
    display: flex;
    background: hsl(37, 48%, 38%);
    border: groove 0.5rem goldenrod;
    border-radius: 0.8rem;
    color: hsl(37, 19%, 70%);
    justify-content: center;
    left: 0;
    margin: 0 auto;
    padding: 1rem;
    position: fixed;
    top: 0;
    width: 100%;
  }
`;
