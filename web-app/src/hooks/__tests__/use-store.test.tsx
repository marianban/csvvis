import React from 'react';
import { v4 } from 'uuid';
import { useObserver } from 'mobx-react-lite';
import { types, Instance, SnapshotIn } from 'mobx-state-tree';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useStore } from '../use-store';
import { StoreProvider } from 'store';

const User = types
  .model({
    id: types.string,
    firstName: types.string,
    lastName: types.string,
    age: types.number,
  })
  .actions((self) => ({
    update(user: IUserPartial) {
      if (user.firstName) {
        self.firstName = user.firstName;
      }
      if (user.lastName) {
        self.lastName = user.lastName;
      }
      if (user.age) {
        self.age = user.age;
      }
    },
  }));

const Users = types
  .model({
    items: types.optional(types.array(User), []),
  })
  .actions((self) => ({
    create(userIn: IUserIn) {
      const user = User.create({ ...userIn, id: v4() });
      self.items.push(user);
    },
  }));

const Store = types.model({
  users: Users,
});

const store = Store.create({ users: {} });

interface IStore extends Instance<typeof Store> {}
interface IUser extends Instance<typeof User> {}
interface IUserIn extends Omit<SnapshotIn<typeof User>, 'id'> {}
interface IUserPartial extends Omit<Partial<SnapshotIn<typeof User>>, 'id'> {}
interface IUsers extends Instance<typeof Users> {}

const UserList = () => {
  const store = useStore<IStore>();
  const users = store.users.items;
  const handleNewUser = () => {
    store.users.create({
      firstName: 'egg',
      lastName: 'head',
      age: 25,
    });
  };
  return useObserver(() => (
    <div>
      <div data-testid="user-list">
        {users.map((user) => (
          <div key={user.id} data-testid={user.id}>
            <div data-testid="first-name">{user.firstName}</div>
            <div data-testid="last-name">{user.lastName}</div>
            <div data-testid="age">{user.age}</div>
          </div>
        ))}
      </div>
      <button onClick={handleNewUser}>New User</button>
    </div>
  ));
};

type WrapperProps = { children: React.ReactNode };

const Wrapper = ({ children }: WrapperProps) => (
  <StoreProvider store={store}>{children}</StoreProvider>
);

test('can read and write observable values', () => {
  render(
    <Wrapper>
      <UserList />
    </Wrapper>
  );
  expect(screen.getByTestId('user-list')).toBeEmpty();
  userEvent.click(screen.getByText('New User'));
  expect(screen.getByTestId('user-list').childNodes).toHaveLength(1);
  expect(screen.getByTestId('first-name')).toHaveTextContent('egg');
  expect(screen.getByTestId('last-name')).toHaveTextContent('head');
  expect(screen.getByTestId('age')).toHaveTextContent('25');
  userEvent.click(screen.getByText('New User'));
  expect(screen.getByTestId('user-list').childNodes).toHaveLength(2);
});
