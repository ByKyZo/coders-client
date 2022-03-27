import AdminHeading from '@components/admin/AdminHeading';
import UserReportTable from '@components/admin/UserReportTable';
import { getAdminLayout } from '@components/layouts/AdminLayout';
import React from 'react';
import { NextComponent } from '../../../typescript/index';

const User: NextComponent = () => {
  return (
    <div>
      <AdminHeading>User report</AdminHeading>
      <UserReportTable />
    </div>
  );
};

User.getLayout = getAdminLayout;

export default User;
