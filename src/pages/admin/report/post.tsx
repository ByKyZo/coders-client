import AdminHeading from '@components/admin/AdminHeading';
import PostReportTable from '@components/admin/PostReportTable';
import { getAdminLayout } from '@components/layouts/AdminLayout';
import React from 'react';

const Post = () => {
  return (
    <div>
      <AdminHeading>Post report</AdminHeading>
      <PostReportTable />
    </div>
  );
};

Post.getLayout = getAdminLayout;

export default Post;
