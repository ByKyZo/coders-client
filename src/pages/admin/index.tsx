import React, { useEffect } from 'react';
import withAccess from 'hoc/withAccess';
import { UserRoles } from '@typescript/index';
import { NextComponent } from '../../typescript/index';
import AdminLayout, { getAdminLayout } from '@components/layouts/AdminLayout';
import { useRedirectOnMount } from '../../hooks/useRedirectOnMount';

const Admin: NextComponent = () => {
  useRedirectOnMount('/admin/report/user');

  return <div>Admin</div>;
};

Admin.getLayout = getAdminLayout;

export default Admin;
