import { useLazyQuery } from '@apollo/client';
import Input from '@components/elements/input/Input';
import AuthLayout from '@components/layouts/AuthLayout';
import { login } from '@graphql/queries/login/login';
import { loginUser } from '@helpers/index';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import * as Yup from 'yup';
import {
  LoginQuery,
  LoginQueryVariables,
} from '../../graphql/queries/login/login.generated';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginQuery] = useLazyQuery<LoginQuery, LoginQueryVariables>(login);

  const router = useRouter();

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
          throw new Error();
        }

        console.log('Connected', data);

        loginUser(data.login.accessToken);
      } catch (err: any) {
        console.log('Authentication failed : ', err.message);
      }

      setIsLoading(false);
    },
  });

  return (
    <AuthLayout
      isLoading={isLoading}
      onFormSubmit={formik.handleSubmit}
      isFormValid={formik.isValidating}
      isFormSubmiting={formik.isSubmitting}
      isSignin={true}
    >
      <Input
        {...formik.getFieldProps('email')}
        error={formik.errors.email}
        isTouched={formik.touched.email}
        type="email"
        placeholder="Email"
        autoComplete="username"
      />
      <Input
        {...formik.getFieldProps('password')}
        error={formik.errors.password}
        isTouched={formik.touched.password}
        type="password"
        placeholder="Password"
        autoComplete="current-password"
      />
    </AuthLayout>
  );
};

export default Login;
