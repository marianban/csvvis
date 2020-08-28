import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './app.scss';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { DataPage, ChartsPage } from 'pages';
import { LeftPane } from './left-pane';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <Header />
      <LeftPane />
      <main className="main">
        <Switch>
          <Route path="/" exact={true}>
            <DataPage />
          </Route>
          <Route path="/charts">
            <ChartsPage />
          </Route>
        </Switch>
      </main>
      <div className="right-pane"></div>
    </div>
  );
}

export default App;
