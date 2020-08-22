import { types, onSnapshot, Instance } from 'mobx-state-tree';
import { v4 } from 'uuid';
import { Table, IColumn } from './table';

const Store = types
  .model('Store', {
    tables: types.optional(types.array(Table), []),
  })
  .actions((self) => ({
    addTable(title: string, columns: IColumn[], rows: any[]) {
      self.tables.push({
        id: v4(),
        title: title,
        columns,
      });
      self.tables[self.tables.length - 1].setRows(rows);
    },
  }));

export const rootStore = Store.create({
  tables: [],
});

export interface IStore extends Instance<typeof Store> {}

// listen to new snapshots
onSnapshot(rootStore, (snapshot) => {
  console.dir(snapshot);
});
