import dayjs from 'dayjs';
import Table from 'rc-table';
import React, { useEffect } from 'react';
import { useGetPostReportsQuery } from '../../../graphql/queries/get-post-reports/index.generated';

interface IPostReportTableCellExpand {
  postId: number;
}

const columns = [
  {
    title: 'userId',
    dataIndex: 'userId',
    key: 'userId',
    width: 100,
  },
  {
    title: 'username',
    dataIndex: 'username',
    key: 'username',
    width: 100,
  },
  {
    title: 'reason',
    dataIndex: 'reason',
    colspan: 2,
    key: 'reason',
    width: 100,
  },
  {
    title: 'Created at',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 200,
  },
];

const PostReportTableCellExpand = ({ postId }: IPostReportTableCellExpand) => {
  const { data: postReports } = useGetPostReportsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      postId,
    },
  });

  const formatedData = postReports?.post.reports.list?.map((post, i) => {
    return {
      userId: post.user.id,
      username: post.user.username,
      reason: post.reason,
      createdAt: dayjs(post.createdAt).format('DD/MM/YYYY h:mm A'),
      key: i,
    };
  });

  useEffect(() => {
    console.log('expand MOUNT');
  }, []);

  return (
    <div>
      <Table columns={columns} data={formatedData} />
    </div>
  );
};

export default PostReportTableCellExpand;
