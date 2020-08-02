import React from 'react';
import { IAnyStateTreeNode } from 'mobx-state-tree';
import { AnyAaaaRecord } from 'dns';

export const StoreContext = React.createContext<AnyAaaaRecord>(undefined!);

export const StoreProvider = <T extends IAnyStateTreeNode>({
  store,
  children,
}: {
  store: T;
  children: React.ReactNode;
}) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
