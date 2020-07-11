import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Navigator } from 'components';

export default {
  title: 'Navigator',
  component: Navigator,
};

export const Default = () => (
  <Router>
    <Navigator>
      <Navigator.Item to="home" active={true}>
        Home
      </Navigator.Item>
      <Navigator.Item to="features">Features</Navigator.Item>
      <Navigator.Item to="pricing">Pricing</Navigator.Item>
    </Navigator>
  </Router>
);
