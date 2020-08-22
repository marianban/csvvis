import { types, Instance } from 'mobx-state-tree';

export const Column = types.model('Column', {
  title: types.string,
  field: types.string,
});

export const Table = types
  .model('Table', {
    id: types.identifier,
    title: types.optional(types.string, ''),
    columns: types.array(Column),
  })
  .volatile((self) => ({
    rows: [] as any[],
  }))
  .actions((self) => ({
    setRows(rows: any[]) {
      self.rows = rows;
    },
  }));

export interface IColumn extends Instance<typeof Column> {}
export interface ITable extends Instance<typeof Table> {}
