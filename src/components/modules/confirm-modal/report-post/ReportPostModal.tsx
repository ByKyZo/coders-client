import Input from '@components/elements/input/Input';
import { ModalProps } from '@components/elements/modal';
import ConfirmModal from '@components/elements/modal/ConfirmModal';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useReportPostMutation } from '../../../../graphql/mutations/report-post/index.generated';
import * as Yup from 'yup';
import { toastInfo } from '@helpers/index';
import { toastError } from '../../../../helpers/index';
import { useEffect } from 'react';

interface MyProfileMenuProps extends ModalProps {
  postId: number;
}

const ReportPostModal = ({
  postId,
  onRequestClose,
  ...rest
}: MyProfileMenuProps) => {
  const [reportPost] = useReportPostMutation();

  const formik = useFormik({
    initialValues: {
      reason: '',
    },
    validationSchema: Yup.object({
      reason: Yup.string().min(1).max(150).required(),
    }),
    onSubmit: async (values) => {
      try {
        await reportPost({
          variables: {
            input: {
              postId: postId,
              reason: values.reason,
            },
          },
        });
        // @ts-ignore
        onRequestClose && onRequestClose();
        toastInfo('Post successfully reported');
        formik.resetForm();
      } catch {
        toastError('Error while reporting post');
      }
    },
  });

  return (
    <>
      <ConfirmModal
        onRequestClose={onRequestClose}
        sentence="Why do you want to report this post?"
        onConfirm={formik.handleSubmit}
        {...rest}
      >
        <Input
          {...formik.getFieldProps('reason')}
          error={formik.errors.reason}
          isTouched={formik.touched.reason}
          id="input-report-post-reason"
          placeholder="Reason"
          as="texarea"
        />
      </ConfirmModal>
    </>
  );
};

export default ReportPostModal;
