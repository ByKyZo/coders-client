import React from 'react';
import Table from 'rc-table';
import 'rc-table/assets/index.css';
import Button from '@components/elements/button/Button';

const columns = [
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    width: 100,
  },
  {
    title: 'Report count',
    dataIndex: 'reportCount',
    key: 'reportCount',
    width: 200,
  },
  {
    title: 'Operations',
    dataIndex: '',
    key: 'operations',
    render: () => (
      <div className="space-x-2">
        <Button styleType="secondaryOutline" sizeType="medium">
          Ban
        </Button>
      </div>
    ),
  },
];

const data = [
  { username: 'Jack', age: 28, reportCount: 3, key: '1' },
  { username: 'Rose', age: 36, reportCount: 2, key: '2' },
];

const UserReportTable = () => {
  return (
    <div>
      <Button className="mb-2" styleType="secondaryOutline" sizeType="medium">
        Reload
      </Button>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default UserReportTable;
