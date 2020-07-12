import React, { FC, useCallback } from 'react';
import cn from 'classnames';
import {
  VariableSizeGrid,
  GridChildComponentProps,
  GridOnScrollProps,
} from 'react-window';
import './grid.scss';

export type GridProps = {};

const Td = ({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
  // first row is reserved for the sticky header
  return (
    <div
      style={style}
      className={cn('grid__td', { 'row-even': !!(rowIndex % 2) })}
    >
      Item {rowIndex},{columnIndex}
    </div>
  );
};

const columnCount = 30;

const Th = ({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
  // first row is reserved for the sticky header
  return (
    <div style={style} className="grid__th">
      Header {rowIndex},{columnIndex}
    </div>
  );
};

const ROW_HEIGHT = 40;

export const Grid: FC<GridProps> = (props) => {
  const header: any = React.useRef(null);

  const onBodyScroll = useCallback(
    ({ scrollLeft, scrollUpdateWasRequested }: GridOnScrollProps) => {
      if (!scrollUpdateWasRequested) {
        header!.current.scrollTo({ scrollTop: 0, scrollLeft });
      }
    },
    []
  );

  return (
    <div className="grid">
      <VariableSizeGrid
        ref={header}
        columnCount={columnCount}
        rowCount={1}
        height={ROW_HEIGHT}
        width={800}
        columnWidth={() => 100}
        rowHeight={() => ROW_HEIGHT}
        className="grid__header"
      >
        {Th}
      </VariableSizeGrid>
      <VariableSizeGrid
        columnCount={columnCount}
        rowCount={1000}
        height={500}
        width={800}
        columnWidth={() => 100}
        rowHeight={() => ROW_HEIGHT}
        onScroll={onBodyScroll}
      >
        {Td}
      </VariableSizeGrid>
    </div>
  );
};
