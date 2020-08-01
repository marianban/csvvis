import React, { useCallback, useMemo } from 'react';
import cn from 'classnames';
import AutoSizer from 'react-virtualized-auto-sizer';
import {
  VariableSizeGrid,
  GridChildComponentProps,
  GridOnScrollProps,
} from 'react-window';

import './grid.scss';

export type Column = {
  title: string;
  field: string;
  template?: (field: string) => JSX.Element;
};

export type GridProps = {
  columns: Column[];
  data: any[];
};

const ROW_HEIGHT = 40;

export const Grid = (props: GridProps) => {
  const { columns, data } = props;
  const columnCount = columns.length;
  const header: any = React.useRef(null);

  const onBodyScroll = useCallback(
    ({ scrollLeft, scrollUpdateWasRequested }: GridOnScrollProps) => {
      if (!scrollUpdateWasRequested) {
        header!.current.scrollTo({ scrollTop: 0, scrollLeft });
      }
    },
    []
  );

  const getColumnWidth = useCallback((index) => {
    return 200;
  }, []);

  const getRowHeight = useCallback(() => ROW_HEIGHT, []);

  const Th = useMemo(
    () => ({ columnIndex, rowIndex, style, data }: GridChildComponentProps) => {
      // first row is reserved for the sticky header
      return (
        <div style={style} className="grid__th">
          {data[columnIndex].title}
        </div>
      );
    },
    []
  );

  const Td = useMemo(
    () => ({ columnIndex, rowIndex, style, data }: GridChildComponentProps) => {
      // first row is reserved for the sticky header
      const field = columns[columnIndex].field;
      return (
        <div
          style={style}
          className={cn('grid__td', { 'row-even': !!(rowIndex % 2) })}
        >
          {data[rowIndex][field]}
        </div>
      );
    },
    [columns]
  );

  return (
    <AutoSizer>
      {({ height, width }) => {
        return (
          <div className="grid">
            <VariableSizeGrid
              ref={header}
              columnCount={columnCount}
              rowCount={1}
              height={ROW_HEIGHT}
              width={width}
              columnWidth={getColumnWidth}
              rowHeight={getRowHeight}
              className="grid__header"
              itemData={columns}
            >
              {Th}
            </VariableSizeGrid>
            {/* TODO: implement itemKey for sorting */}
            <VariableSizeGrid
              columnCount={columnCount}
              rowCount={1000}
              height={height - ROW_HEIGHT}
              width={width}
              columnWidth={getColumnWidth}
              rowHeight={getRowHeight}
              onScroll={onBodyScroll}
              itemData={data}
            >
              {Td}
            </VariableSizeGrid>
          </div>
        );
      }}
    </AutoSizer>
  );
};
