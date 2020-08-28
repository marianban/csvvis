import React from 'react';
import cn from 'classnames';
import { useLocation, Link } from 'react-router-dom';
import { ReactComponent as IconChart } from './icons/icon-chart.svg';
import { ReactComponent as IconFolder } from './icons/icon-folder.svg';
import './sidebar.scss';

export const Sidebar = () => {
  const { pathname } = useLocation();
  return (
    <div className="sidebar">
      <div className="sidebar__logo"></div>
      <nav className="sidebar__nav">
        <ul>
          <li className={cn({ active: pathname === '/' })}>
            <Link to="/">
              <IconFolder />
            </Link>
          </li>
          <li className={cn({ active: pathname === '/charts' })}>
            <Link to="/charts">
              <IconChart />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
