// import AuthInput from '@components/elements/input/input';
import { useMutation } from '@apollo/client';
// import { USER_CREATE } from '@apollo/mutations/createUser';
import Input from '@components/elements/input/Input';
import AuthLayout from '@components/layouts/AuthLayout';
import { createUser, createUserInput } from '@graphql/mutations/createUser';
// import axios from '@config/axios';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import * as Yup from 'yup';

/**
 * ? First and displayname min and max chars source :
 * ? https://www.isignthis.com/knowledge/what-are-the-max-length-characters-for-first-name-and-last-name
 */

const Register = () => {
  const [queryRegister] = useMutation<any, createUserInput>(createUser);

  const formik = useFormik({
    initialValues: {
      username: '',
      displayname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .required('Username is required field')
        .min(2, 'Username is too short min 2 chars')
        .max(26, 'Username is too long max 26 chars'),
      displayname: Yup.string()
        .required('Display name is required field')
        .min(2, 'Display name is too short min 2 chars')
        .max(26, 'Display name is too long max 26 chars'),
      email: Yup.string().email().required('Email is required field'),
      password: Yup.string().required('Password is required field'),
      confirmPassword: Yup.string()
        .required('Please confirm your password')
        .oneOf([Yup.ref('password'), null], 'Password must matched'),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await queryRegister({
          variables: {
            username: values.username,
            displayname: values.displayname,
            email: values.email,
            password: values.password,
          },
        });
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
      <div className="flex w-full">
        <div className="mr-2">
          <Input
            {...formik.getFieldProps('username')}
            error={formik.errors.username}
            isTouched={formik.touched.username}
            autoComplete="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <Input
          {...formik.getFieldProps('displayname')}
          error={formik.errors.displayname}
          isTouched={formik.touched.displayname}
          type="text"
          placeholder="Display name"
        />
      </div>
      <Input
        {...formik.getFieldProps('email')}
        error={formik.errors.email}
        isTouched={formik.touched.email}
        type="email"
        placeholder="Email"
        autoComplete="current-password"
      />
      <Input
        {...formik.getFieldProps('password')}
        error={formik.errors.password}
        isTouched={formik.touched.password}
        type="password"
        placeholder="Password"
        autoComplete="current-password"
      />
      <Input
        {...formik.getFieldProps('confirmPassword')}
        error={formik.errors.confirmPassword}
        isTouched={formik.touched.confirmPassword}
        type="password"
        placeholder="Confirm Password"
        autoComplete="current-password"
      />
    </AuthLayout>
  );
};

export default Register;
