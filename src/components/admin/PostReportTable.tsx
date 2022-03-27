import React from 'react';
import Table from 'rc-table';
import 'rc-table/assets/index.css';
import Button from '@components/elements/button/Button';
import { useGetPostReportedQuery } from '../../graphql/queries/get-post-reported/index.generated';

const columns = [
  {
    title: 'PostID',
    dataIndex: 'postId',
    key: 'postId',
    width: 100,
  },
  {
    title: 'AuthorID',
    dataIndex: 'userId',
    colspan: 2,
    key: 'userId',
    width: 100,
  },
  {
    title: 'AuthorUsername',
    dataIndex: 'username',
    colspan: 2,
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
          Ban user
        </Button>
        <Button styleType="secondaryOutline" sizeType="medium">
          Delete post
        </Button>
      </div>
    ),
  },
];

const data = [
  { username: 'Jack', age: 28, reportCount: 3, key: '1' },
  { username: 'Rose', age: 36, reportCount: 2, key: '2' },
];

const PostReportTable = () => {
  const { data: postReported } = useGetPostReportedQuery();

  const formatedData = postReported?.posts.list?.map((post) => {
    return {
      postId: post.id,
      userId: post.author.id,
      username: post.author.username,
      reportCount: post.reports.total,
    };
  });

  return (
    <div>
      <Button className="mb-2" styleType="secondaryOutline" sizeType="medium">
        Reload
      </Button>
      <Table columns={columns} data={formatedData} />
    </div>
  );
};

export default PostReportTable;
