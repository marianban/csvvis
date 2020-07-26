import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { Default, itemsData } from '../grid.stories';

jest.mock('react-virtualized-auto-sizer', () => ({ children }: any) =>
  children({ height: 768, width: 1024 })
);

test('Renders data in grid', () => {
  act(() => {
    render(<Default />);
  });

  itemsData.slice(0, 5).forEach((item) => {
    screen.getByText(item.id);
    screen.getByText(item.firstName);
    screen.getByText(item.lastName);
    screen.getByText(item.phoneNumber);
    screen.getByText(item.email);
    screen.getByText(item.address);
    screen.getByText(item.age.toString());
  });
});
