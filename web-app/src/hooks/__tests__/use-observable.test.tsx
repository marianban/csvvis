import React from 'react';
import { types, Instance } from 'mobx-state-tree';
import { useObservable } from '../use-observable';

const User = types.model({
  firstName: types.string,
  lastName: types.string,
  age: types.number,
});

const Store = types.model({
  users: types.optional(types.array(User), []),
});

const store = Store.create();

interface IStore extends Instance<typeof Store> {}

const Component = () => {
  const users = useObservable((store) => store.users);
};
