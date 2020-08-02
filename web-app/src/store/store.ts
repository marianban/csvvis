import { types, onSnapshot, Instance } from 'mobx-state-tree';
import { Table } from './table';

const Store = types.model('Store', {
  tables: types.optional(types.array(Table), []),
});

export const rootStore = Store.create({
  tables: [],
});

export interface IStore extends Instance<typeof Store> {}

// listen to new snapshots
onSnapshot(rootStore, (snapshot) => {
  console.dir(snapshot);
});
