import React from 'react';
import faker from 'faker';
import { Grid } from 'components';

export default {
  title: 'Grid',
  component: Grid,
};

type DataItem = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  address: string;
  age: number;
  dateOfBirth: string;
};

const columns = [
  { field: 'id', title: 'Id' },
  { field: 'firstName', title: 'First Name' },
  { field: 'lastName', title: 'Last Name' },
  { field: 'phoneNumber', title: 'Phone Number' },
  { field: 'email', title: 'Email' },
  { field: 'address', title: 'Address' },
  { field: 'age', title: 'Age' },
  { field: 'dateOfBirth', title: 'Date Of Birth' },
];

export const data: DataItem[] = Array.from({ length: 10000 }, () => ({
  id: faker.random.uuid(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  phoneNumber: faker.phone.phoneNumber(),
  email: faker.internet.email(),
  address: faker.address.streetAddress(),
  age: faker.random.number(),
  dateOfBirth: faker.date.past().toISOString(),
}));

export const Default = () => (
  <div style={{ width: '800px', height: '600px' }}>
    <Grid columns={columns} data={data} />
  </div>
);
