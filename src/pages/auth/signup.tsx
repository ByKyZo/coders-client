import Input from '@components/elements/input/Input';
import AuthLayout from '@components/layouts/AuthLayout';
import { loginUser } from '@helpers/index';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useCreateUserMutation } from '../../graphql/users/create-user/index.generated';
import { withNoAuth } from '../../hoc/withNoAuth';

/**
 * ? First and displayname min and max chars source :
 * ? https://www.isignthis.com/knowledge/what-are-the-max-length-characters-for-first-name-and-last-name
 */

const Register = () => {
  const [createUserMutation] = useCreateUserMutation();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .required('Username is required field')
        .min(2, 'Username is too short min 2 chars')
        .max(26, 'Username is too long max 26 chars'),
      email: Yup.string().email().required('Email is required field'),
      password: Yup.string().required('Password is required field'),
      confirmPassword: Yup.string()
        .required('Please confirm your password')
        .oneOf([Yup.ref('password'), null], 'Password must matched'),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await createUserMutation({
          variables: {
            input: {
              username: values.username,
              email: values.email,
              password: values.password,
            },
          },
        });

        if (!data) {
          throw new Error();
        }

        loginUser(data.createUser.accessToken);

        console.log('Create user success : ', data);
      } catch (err: any) {
        console.log('Create user error : ', err.message);
      }
    },
  });

  useEffect(() => {
    console.log(formik.errors);
  }, [formik.errors]);

  return (
    <AuthLayout
      onFormSubmit={formik.handleSubmit}
      isFormValid={formik.isValid}
      isFormSubmiting={formik.isSubmitting}
      isSignin={false}
    >
      <Input
        {...formik.getFieldProps('username')}
        id={'registe-input-username'}
        error={formik.errors.username}
        isTouched={formik.touched.username}
        autoComplete="username"
        type="text"
        placeholder="Username"
      />
      <Input
        {...formik.getFieldProps('email')}
        id={'registe-input-email'}
        error={formik.errors.email}
        isTouched={formik.touched.email}
        type="email"
        placeholder="Email"
        autoComplete="current-password"
      />
      <Input
        {...formik.getFieldProps('password')}
        id={'registe-input-password'}
        error={formik.errors.password}
        isTouched={formik.touched.password}
        type="password"
        placeholder="Password"
        autoComplete="current-password"
      />
      <Input
        {...formik.getFieldProps('confirmPassword')}
        id={'registe-input-confirmPassword'}
        error={formik.errors.confirmPassword}
        isTouched={formik.touched.confirmPassword}
        type="password"
        placeholder="Confirm Password"
        autoComplete="current-password"
      />
    </AuthLayout>
  );
};

export default withNoAuth(Register);
