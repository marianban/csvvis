import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './app.scss';
import { useObserver } from 'mobx-react-lite';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { useStore } from 'hooks';
import { IStore } from 'store';
import { DataPage } from 'pages';

function App() {
  const store = useStore<IStore>();
  const { tables } = store;
  return useObserver(() => (
    <div className="app">
      <Sidebar />
      <Header />
      <div className="left-pane">
        <h3>Files</h3>
        <div className="files">
          <ul>
            {tables.map((t) => (
              <li key={t.id}>
                <a href={`#${t.id}`}>{t.title}</a>
                <ul className="columns">
                  {t.columns.map((c) => (
                    <li key={c.field}>{c.title}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <main className="main">
        <Router>
          <Switch>
            <Route path="/">
              <DataPage />
            </Route>
          </Switch>
        </Router>
      </main>
      <div className="right-pane"></div>
    </div>
  ));
}

export default App;
