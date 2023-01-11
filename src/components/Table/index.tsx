import { v4 as uuidv4 } from 'uuid';
import { memo } from 'react';
import classnames from 'classnames';

export type ColumnsProps = {
  id?: string;
  accessor: any;
  width?: number;
  headerName?: string;
  cellProps?: object;
  headerCellProps?: object;
};

type TableProps = {
  columns: ColumnsProps[];
  rows: any[];
  containerClass?: string;
  tableClass?: string;
  tableRowBodyProps?: any;
  tableHeaderProps?: any;
  scrollReveal?: boolean;
};

const Table = ({
  columns,
  rows,
  containerClass,
  tableClass,
  tableRowBodyProps,
  tableHeaderProps,
  scrollReveal = false,
}: TableProps) => (
  <div className={classnames('overflow-x-auto shadow-md', containerClass)} data-testid="table">
    <table className={classnames('table w-full', tableClass)}>
      <thead>
        <tr {...tableHeaderProps}>
          {columns.map((col) => (
            <th key={uuidv4()} {...col.headerCellProps}>
              {col.headerName}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={uuidv4()} {...tableRowBodyProps} onClick={() => tableRowBodyProps?.onClick(row)}>
            {columns.map((col) => (
              <td key={uuidv4()} {...col.cellProps}>
                {typeof col.accessor === 'function' ? col.accessor(row) : row[col.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default memo(Table);
