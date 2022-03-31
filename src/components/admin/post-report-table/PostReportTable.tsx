import React, { useEffect, useState } from 'react';
import Table from 'rc-table';
import 'rc-table/assets/index.css';
import Button from '@components/elements/button/Button';
import { useGetPostReportedQuery } from '../../../graphql/queries/get-post-reported/index.generated';
import { useDeletePostMutation } from '../../../graphql/mutations/delete-post/index.generated';
import { toastError, toastInfo } from '../../../helpers/index';
import { ReportPostSubDocument } from '../../../graphql/subscriptions/report-post/index.generated';
import PostReportTableCellExpand from './PostReportTableExpand';
import dayjs from 'dayjs';
import ConfirmModal from '@components/elements/modal/ConfirmModal';
import Modal from '@components/elements/modal';
import Post from '@components/modules/Post/Post';
import ViewPostModal from './ViewPostModal';
import DeletePostConfirm from './DeletePostConfirm';

const PostReportTable = () => {
  const { data: postReported, subscribeToMore } = useGetPostReportedQuery({
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    // NOTE : Ecoute la subscription 'reportPost'
    subscribeToMore({
      document: ReportPostSubDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        // @ts-ignore
        const newPostReport = subscriptionData.data.reportPost;

        return Object.assign({}, prev, {
          posts: {
            list: [newPostReport, ...prev.posts.list],
          },
        });
      },
    });
  }, []);

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
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 200,
    },
    {
      title: 'Operations',
      dataIndex: '',
      key: 'operations',
      render: (props: any) => (
        <div key={props.postId} className="space-x-2">
          <DeletePostConfirm postId={props.postId} />
          <ViewPostModal postId={props.postId} />
        </div>
      ),
    },
  ];

  const formatedData = postReported?.posts.list?.map((post, i) => {
    return {
      postId: post.id,
      userId: post.author.id,
      username: post.author.username,
      reportCount: post.reports.total,
      createdAt: dayjs(post.createdAt).format('DD/MM/YYYY h:mm A'),
      key: i,
    };
  });

  return (
    <div>
      <Table
        columns={columns}
        rowKey={(record) => record.postId}
        expandable={{
          expandedRowRender: (record, index, indent, expanded) =>
            expanded ? (
              <PostReportTableCellExpand postId={record.postId} />
            ) : null,
        }}
        data={formatedData}
      />
    </div>
  );
};

export default PostReportTable;
