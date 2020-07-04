import React from 'react';
import { ReactComponent as IconChart } from './icons/icon-chart.svg';
import { ReactComponent as IconFolder } from './icons/icon-folder.svg';
import './Sidebar.scss';

export const Sidebar = () => (
  <div className="sidebar">
    <div className="sidebar__logo"></div>
    <nav className="sidebar__nav">
      <ul>
        <li className="active">
          <IconFolder />
        </li>
        <li>
          <IconChart />
        </li>
      </ul>
    </nav>
  </div>
);
