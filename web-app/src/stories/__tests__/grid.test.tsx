import React from 'react';
import { render, screen } from '@testing-library/react';
import { Default, data } from '../grid.stories';

test('Renders data in grid', () => {
  render(<Default />);
  data.forEach((item) => {
    screen.getByText(item.id);
    screen.getByText(item.firstName);
    screen.getByText(item.lastName);
    screen.getByText(item.phoneNumber);
    screen.getByText(item.email);
    screen.getByText(item.address);
    screen.getByText(item.age);
  });
});
