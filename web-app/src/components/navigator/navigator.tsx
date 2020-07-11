import React, { FC } from 'react';
import c from 'classnames';
import { Link, LinkProps } from 'react-router-dom';
import './navigator.scss';

export type NavigatorItemProps = LinkProps & {
  active?: boolean;
};

const NavigatorLinkItem: FC<NavigatorItemProps> = ({
  active = false,
  ...rest
}) => {
  return (
    <li className={c({ 'navigator__item--active': active })}>
      <Link {...rest} />
    </li>
  );
};

export type NavigatorProps = {
  className?: string;
};

export const Navigator: FC<NavigatorProps> & {
  Item: FC<NavigatorItemProps>;
} = ({ children, className = '' }) => {
  return (
    <nav className={c('navigator', className)}>
      <ul>{children}</ul>
    </nav>
  );
};

Navigator.Item = NavigatorLinkItem;
