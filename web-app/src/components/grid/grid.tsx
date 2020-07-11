import React, { FC, forwardRef, useCallback } from 'react';
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
    <div style={style} className="grid__td">
      Item {rowIndex},{columnIndex}
    </div>
  );
};

const columnCount = 30;

const innerElementType = forwardRef(({ children, ...rest }, ref) => (
  <div>
    <div className="grid__header">
      {Array.from({ length: columnCount }, (_, i) => (
        <div>Header {i}</div>
      ))}
    </div>
    {children}
  </div>
));

const Th = ({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
  // first row is reserved for the sticky header
  return (
    <div style={style} className="grid__th">
      Header {rowIndex},{columnIndex}
    </div>
  );
};

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
        height={50}
        width={800}
        columnWidth={() => 100}
        rowHeight={() => 50}
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
        rowHeight={() => 50}
        onScroll={onBodyScroll}
      >
        {Td}
      </VariableSizeGrid>
    </div>
  );
};
