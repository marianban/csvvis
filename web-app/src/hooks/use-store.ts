import { useContext } from 'react';
import { StoreContext } from 'store';
import { IAnyStateTreeNode } from 'mobx-state-tree';

export const useStore = <S extends IAnyStateTreeNode>() => {
  const rootStore: S = useContext(StoreContext);
  return rootStore;
};
