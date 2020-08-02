import { useState, useContext, useEffect } from 'react';
import { reaction } from 'mobx';
import { StoreContext } from 'store';
import { IStateTreeNode, IAnyStateTreeNode } from 'mobx-state-tree';

type Expression<S, R> = (state: S) => R;

export const useObservable = <
  S extends IAnyStateTreeNode,
  R extends IAnyStateTreeNode
>(
  expression: Expression<S, R>
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setValue] = useState(0);
  const rootStore: S = useContext(StoreContext);

  const dispose = reaction(
    () => expression(rootStore),
    () => {
      setValue((value) => value + 1);
    }
  );

  useEffect(() => {
    return () => {
      dispose();
    };
  }, [dispose]);

  return expression(rootStore);
};
