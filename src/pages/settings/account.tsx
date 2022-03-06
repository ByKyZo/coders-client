import Button from '@components/elements/button/Button';
import Heading from '@components/elements/heading/Heading';
import Input from '@components/elements/input/Input';
import { getSettingsLayout } from '@components/layouts/SettingsLayout';
import { useMeQuery } from '@graphql/users/get-me/index.generated';
import { useFormik } from 'formik';
import withAuth from 'hoc/withAuth';
import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import * as Yup from 'yup';
import { useUpdateSelfMutation } from '../../graphql/users/update-self/index.generated';

const Account = () => {
  const isBreakPoint = useMediaQuery({ minWidth: 1024 });

  const [updateSelfMutation] = useUpdateSelfMutation();
  const { data } = useMeQuery();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      displayname: '',
      bio: '',
      // password: '',
      // confirmPassword: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .required('Username is required field')
        .min(2, 'Username is too short min 2 chars')
        .max(26, 'Username is too long max 26 chars'),
      email: Yup.string().email().required('Email is required field'),
      displayname: Yup.string()
        .required('Displayname is required field')
        .min(1, 'Displayname is too short min 2 chars')
        .max(45, 'Displayname is too long max 26 chars'),
      bio: Yup.string().max(300),
      // password: Yup.string().required('Password is required field'),
      // confirmPassword: Yup.string()
      //   .required('Please confirm your password')
      //   .oneOf([Yup.ref('password'), null], 'Password must matched'),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await updateSelfMutation({
          variables: {
            update: {
              username: values.username,
              email: values.email,
              profile: {
                displayname: values.displayname,
                bio: values.bio,
              },
              // profile: {
              //   displayname: null,
              //   bio: null,
              // },
            },
          },
        });

        if (!data) {
          throw new Error();
        }

        console.log('Update user success : ', data);
      } catch (err: any) {
        console.log('Update user error : ', err.message);
      }
    },
  });

  useEffect(() => {
    if (!data) return;
    formik.setFieldValue('username', data.me.username);
    formik.setFieldValue('displayname', data.me.profile.displayname);
    formik.setFieldValue('email', data.me.email);
    formik.setFieldValue('bio', data.me.profile.bio);
  }, [data]);

  return (
    <div>
      <Heading withGoBack={!isBreakPoint} noBorder title="Account" />
      <div className="mt-2 px-4">
        <form noValidate onSubmit={formik.handleSubmit} action="">
          <Input
            {...formik.getFieldProps('username')}
            id={'update-account-input-username'}
            error={formik.errors.username}
            isTouched={formik.touched.username}
            placeholder="Username"
          />
          <Input
            {...formik.getFieldProps('displayname')}
            id={'update-account-input-displayname'}
            error={formik.errors.username}
            isTouched={formik.touched.username}
            placeholder="Displayname"
          />
          <Input
            {...formik.getFieldProps('email')}
            id={'update-account-input-email'}
            error={formik.errors.email}
            isTouched={formik.touched.email}
            placeholder="Email"
          />
          <Input
            {...formik.getFieldProps('bio')}
            id={'update-account-input-bio'}
            error={formik.errors.bio}
            isTouched={formik.touched.bio}
            placeholder="Bio"
          />
          <Button
            type="submit"
            className="w-full"
            as="button"
            styleType="primary"
            sizeType="extralarge"
          >
            Save
          </Button>
        </form>
      </div>
    </div>
  );
};

const AccountWithAuth = withAuth(Account);

AccountWithAuth.getLayout = getSettingsLayout;

export default AccountWithAuth;
