import React, { useCallback, useMemo, useEffect, PointerEvent } from 'react';
import cn from 'classnames';
import { useImmer } from 'use-immer';
import AutoSizer from 'react-virtualized-auto-sizer';
import {
  VariableSizeGrid,
  GridChildComponentProps,
  GridOnScrollProps,
} from 'react-window';
import { useWindowEvent } from 'hooks';
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
  const [columnsMeta, updateColumnsMeta] = useImmer(
    columns.map(() => ({ width: 100 }))
  );
  const columnResizingRef = React.useRef({
    moving: false,
    start: 0,
    columnIndex: 0,
  });

  const onBodyScroll = useCallback(
    ({ scrollLeft, scrollUpdateWasRequested }: GridOnScrollProps) => {
      if (!scrollUpdateWasRequested) {
        header!.current.scrollTo({ scrollTop: 0, scrollLeft });
      }
    },
    []
  );

  const getColumnWidth = useCallback((index) => columnsMeta[index].width, [
    columnsMeta,
  ]);
  const getRowHeight = useCallback(() => ROW_HEIGHT, []);

  const handleOnPointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>, columnIndex: number) => {
      columnResizingRef.current.moving = true;
      columnResizingRef.current.start = event.clientX;
      columnResizingRef.current.columnIndex = columnIndex;
    },
    []
  );

  const handleOnPointerMove = useCallback(
    (event: Event) => {
      if (columnResizingRef.current.moving) {
        const delta =
          (event as MouseEvent).clientX - columnResizingRef.current.start;
        updateColumnsMeta((draft) => {
          draft[columnResizingRef.current.columnIndex].width =
            draft[columnResizingRef.current.columnIndex].width + delta;
        });
      }
    },
    [updateColumnsMeta]
  );

  const handleOnPointerUp = useCallback(() => {
    columnResizingRef.current.moving = false;
    console.log('Pointer up');
  }, []);

  useWindowEvent('pointermove', handleOnPointerMove);
  useWindowEvent('pointerup', handleOnPointerUp);

  const Th = useMemo(
    () => ({ columnIndex, rowIndex, style, data }: GridChildComponentProps) => {
      // first row is reserved for the sticky header
      return (
        <div style={style} className="grid__th">
          {data[columnIndex].title}
          <div
            className="grid__th__grip"
            onPointerDown={(event) => handleOnPointerDown(event, columnIndex)}
          ></div>
        </div>
      );
    },
    [handleOnPointerDown]
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
