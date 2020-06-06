import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Menu from './components/Menu';
import Home from './components/Home'
import AddArticle from './components/pages/AddArticle';
import ViewArticle from './components/pages/ViewArticle';
import { Container } from 'react-bootstrap';
import EditArticle from './components/pages/EditArticle';

function App() {
  return (
    <Router>
      <Menu />
      <Container className="content">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/add" component={AddArticle} />
          <Route path="/view/:vId" component={ViewArticle} />
          <Route path="/edit/:eId" component={EditArticle} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
