import { memo, useCallback } from 'react';
import { Radio, Typography } from 'antd';

import { getScreenDevice, useNavigation } from '@hooks';
import { BoxFlex } from './Box';

const { Title, Text } = Typography;

interface IPagination {
  value: any;
}

const PaginationTable = (props: IPagination) => {
  const screen = getScreenDevice();

  const { searchParams, setSearchParams } = useNavigation();
  // Value data
  const lastPage: number = props?.value?.last_page;
  const currentPage: number = props?.value?.current_page;
  const perPage: number = props?.value?.per_page;
  const total: number = props?.value?.total || 0;
  const dataCount: number = props?.value?.data?.length || 0;

  // Get the page and total value
  const page: number = +(searchParams.get('page') || 1);

  const totalItemPagination = lastPage;

  const perITem = currentPage * perPage || 0;
  const currentItems = total < perITem ? total : perITem;

  const backValue = page - 1 <= 0 ? page : page - 1;
  const nextValue = page + 1 > totalItemPagination ? page : page + 1;

  // console.table({ total, itemPerPage, totalItemPagination, page });

  const renderListPage = useCallback(() => {
    // Counts the number of elements base on the screen breakpoint.
    const count = screen.sm ? 2 : screen.md ? 3 : 3;
    let rules = false;
    return [...Array(totalItemPagination)]?.map((item: any, index: number) => {
      const value = index + 1;

      if (screen?.xs) {
        // Show number when  show start > index > end and current Page
        if (index === 0 || index === totalItemPagination - 1 || page === index + 1) {
          if (page === index + 1) rules = true;
          return (
            <Radio.Button className='btnPagePagination btnPagination' key={index} value={value}>
              {value}
            </Radio.Button>
          );
        } else if (index === page || index == page - 2) {
          // Add three dots index < page > index
          return (
            <Radio.Button className='btnPagePagination btnPagination' key={index} value={value}>
              ...
            </Radio.Button>
          );
        }
      } else {
        // Show number when  show number > index > totalItemCount - count, last item and current Page
        if (index < count || index > totalItemPagination - count - 1 || index === totalItemPagination - 1 || page === index + 1) {
          return (
            <Radio.Button className='btnPagePagination btnPagination' key={index} value={value}>
              {value}
            </Radio.Button>
          );
          // Add three dots index < page > index
        } else if (index === page || index == page - 2) {
          rules = true;
          return (
            <Radio.Button className='btnPagePagination btnPagination' key={index} value={value}>
              ...
            </Radio.Button>
          );
          // If page at positive first or less than counter -> then return three dots at next last child
        } else if (!rules && index === totalItemPagination - 3) {
          return (
            <Radio.Button className='btnPagePagination btnPagination' key={index} value={value}>
              ...
            </Radio.Button>
          );
        }
      }
    });
  }, [totalItemPagination, page, screen]);

  return (
    <BoxFlex className='alignItemsCenter flexWrap spaceBetween' style={{ marginTop: 20, gap: 20 }}>
      <Radio.Group
        value={page}
        // disabled={total <= 0  ? true : false}
        disabled={total <= 0 ? true : false}
        onChange={(e) => {
          const value = e?.target?.value;

          setSearchParams(
            (prev: any) => {
              prev.set('page', value);
              return prev;
            },
            { replace: true },
          );
        }}
      >
        <Radio.Button className='btnPrimary btnPaginationAction btnPagination' value={1}>
          最初
        </Radio.Button>
        <Radio.Button className='btnPrimary btnPaginationAction btnPagination' value={backValue}>
          前
        </Radio.Button>
        {renderListPage()}
        <Radio.Button className='btnPrimary btnPaginationAction btnPagination' value={nextValue}>
          次
        </Radio.Button>
        <Radio.Button className='btnPrimary btnPaginationAction btnPagination' value={totalItemPagination}>
          最後
        </Radio.Button>
      </Radio.Group>

      <Text>{`${+currentItems}件 / ${+total}件`}</Text>
    </BoxFlex>
  );
};

export default memo(PaginationTable);
