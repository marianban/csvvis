import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './app.scss';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { DataPage } from 'pages';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <Header />
      <main className="main">
        <Router>
          <Switch>
            <Route path="/">
              <DataPage />
            </Route>
          </Switch>
        </Router>
      </main>
    </div>
  );
}

export default App;
