import Input from '@components/elements/input/Input';
import AuthLayout from '@components/layouts/AuthLayout';
import { loginUser } from '@helpers/index';
import { useFormik } from 'formik';
import { withNoAuth } from 'hoc/withNoAuth';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useLoginLazyQuery } from '../../graphql/users/login/index.generated';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loginQuery] = useLoginLazyQuery();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required('Email is required field'),
      password: Yup.string().required('Password is required field'),
    }),
    onSubmit: async (values) => {
      if (isLoading) return;

      setIsLoading(true);
      setIsError(false);

      try {
        const { data } = await loginQuery({
          variables: {
            input: {
              email: values.email,
              password: values.password,
            },
          },
        });

        if (!data) {
          setIsError(true);
          throw new Error();
        }

        console.log('Connected', data);

        loginUser(data.login.accessToken);
      } catch (err: any) {
        setIsError(true);
        console.log('Authentication failed : ', err.message);
      }

      setIsLoading(false);
    },
  });

  return (
    <AuthLayout
      isLoading={isLoading}
      isError={isError}
      errorMessage="Incorrect email or password"
      onFormSubmit={formik.handleSubmit}
      isFormValid={formik.isValidating}
      isFormSubmiting={formik.isSubmitting}
      isSignin={true}
    >
      <Input
        {...formik.getFieldProps('email')}
        id={'login-input-email'}
        error={formik.errors.email}
        isTouched={formik.touched.email}
        type="email"
        placeholder="Email"
        autoComplete="username"
      />
      <Input
        {...formik.getFieldProps('password')}
        id={'login-input-password'}
        error={formik.errors.password}
        isTouched={formik.touched.password}
        type="password"
        placeholder="Password"
        autoComplete="current-password"
      />
    </AuthLayout>
  );
};

export default withNoAuth(Login);
