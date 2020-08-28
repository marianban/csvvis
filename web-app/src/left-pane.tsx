import React from 'react';
import { useObserver } from 'mobx-react-lite';
import { useStore } from 'hooks';
import { IStore } from 'store';

export const LeftPane = () => {
  const store = useStore<IStore>();
  const { tables } = store;
  return useObserver(() => (
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
  ));
};
