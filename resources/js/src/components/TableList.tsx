import { useState, memo, useLayoutEffect } from 'react';
import { Table } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import type { TableProps } from 'antd/es/table';
import type { Key, TableRowSelection } from 'antd/es/table/interface';

interface ITable {
  value: any[] | any;
  columns: any[];
  onRowSelected: (selectedRowKeys: any, selectedRows: any) => void;
}

const TableList = ({ value, columns, onRowSelected }: ITable) => {
  // Selects the titles of a user.

  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState<SizeType>('large');

  const [rowSelection, setRowSelection] = useState<TableRowSelection<any> | undefined>({});
  const [hasData, setHasData] = useState(true);
  const [tableLayout, setTableLayout] = useState(undefined);
  const [ellipsis, setEllipsis] = useState(false);
  const [yScroll, setYScroll] = useState(false);
  const [xScroll, setXScroll] = useState<string | undefined>(undefined);

  const [selectRowKeys, setSelectRowKeys] = useState<Key[]>([]);
  // Mutation

  // Clear row selected when value table has change
  useLayoutEffect(() => {
    if (value) {
      setSelectRowKeys([]);
      onRowSelected(null, []);
    }
  }, [value]);

  // Functions
  const scroll: { x?: number | string; y?: number | string } = {};
  if (yScroll) {
    scroll.y = 240;
  }
  if (xScroll) {
    scroll.x = '100vw';
  }

  const tableColumns = columns.map((item) => ({ ...item, ellipsis }));
  if (xScroll === 'fixed') {
    tableColumns[0].fixed = true;
    tableColumns[tableColumns.length - 1].fixed = 'right';
  }

  const tableProps: TableProps<any> = {
    loading,
    size,
    rowSelection,
    scroll,
    tableLayout,
  };

  return (
    <Table
      {...tableProps}
      columns={tableColumns}
      pagination={false}
      dataSource={hasData ? value?.data : []}
      scroll={{ x: 900 }}
      rowSelection={{
        selectedRowKeys: selectRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          setSelectRowKeys(selectedRowKeys);
          onRowSelected(selectedRowKeys, selectedRows);
        },
      }}
    />
  );
};

export default memo(TableList);
