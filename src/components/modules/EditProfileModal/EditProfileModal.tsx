import BackgroundPicture from '@components/elements/background-picture/BackgroundPicture';
import Input from '@components/elements/input/Input';
import Modal, { ModalProps } from '@components/elements/modal';
import ProfilePicture from '@components/elements/profile-picture/ProfilePicture';
import { useMeQuery } from '@graphql/users/get-me/index.generated';
import { useUpdateSelfMutation } from '@graphql/users/update-self/index.generated';
import { useImage } from '@hooks/useImageFile';
import useRouterRefresh from '@hooks/useRouterRefresh';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import Dropzone from 'react-dropzone';
import * as Yup from 'yup';
import { toastError } from '../../../helpers/index';
import { IoAdd } from 'react-icons/io5';

interface EditProfileModalProps extends ModalProps {}

const IMAGE_MAX_SIZE = 2_000_000;
const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp'];

const EditProfileModal = ({
  closeFn,
  isOpen,
  ...rest
}: EditProfileModalProps) => {
  const { data: user } = useMeQuery();
  const [updateSelfMutation, { error }] = useUpdateSelfMutation();
  const refreshRouter = useRouterRefresh();

  const [backgroundImage, setBackgroundImage, resetBackgroundImage] =
    useImage();
  const [profileImage, setProfileImage, resetProfileImage] = useImage();

  const formik = useFormik({
    initialValues: {
      displayname: '',
      bio: '',
    },
    validationSchema: Yup.object().shape({
      displayname: Yup.string()
        .required('Displayname is required field')
        .min(1, 'Displayname is too short min 2 chars')
        .max(45, 'Displayname is too long max 26 chars'),
      bio: Yup.string().max(300),
    }),
    onSubmit: async (values) => {
      try {
        const { data, extensions } = await updateSelfMutation({
          variables: {
            update: {
              profile: {
                displayname: values.displayname,
                bio: values.bio,
              },
            },
            profilePictureFile: profileImage.images && profileImage.images[0],
            backgroundPictureFile:
              backgroundImage.images && backgroundImage.images[0],
          },
        });

        refreshRouter();
        closeFn && closeFn();
      } catch (err: any) {
        toastError();
      }
    },
  });

  const setCurrentUserData = () => {
    if (!user) return;
    formik.setFieldValue('displayname', user.me.profile.displayname);
    formik.setFieldValue('bio', user.me.profile.bio);
  };

  useEffect(() => {
    setCurrentUserData();
  }, [user]);

  useEffect(() => {
    if (isOpen) {
      setCurrentUserData();
    } else {
      resetBackgroundImage();
      resetProfileImage();
      formik.resetForm();
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      closeFn={closeFn}
      title="Edit Profile"
      btnAction={{
        fn: () => {
          formik.handleSubmit();
        },
        label: 'Save',
      }}
      {...rest}
    >
      <div className="relative mb-24 bg-cover bg-no-repeat">
        <Dropzone
          maxSize={IMAGE_MAX_SIZE}
          maxFiles={1}
          multiple={false}
          accept={ALLOWED_MIME}
          onDrop={(acceptedFiles: File[]) => {
            setBackgroundImage({
              images: acceptedFiles,
              preview: URL.createObjectURL(acceptedFiles[0]),
            });
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <BackgroundPicture
                url={
                  backgroundImage.preview || user?.me.profile.backroundPicture!
                }
              />
              <div className="text-white bg-gray-800 bg-opacity-60 rounded-full p-1 text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <IoAdd />
              </div>
            </div>
          )}
        </Dropzone>

        <Dropzone
          maxSize={IMAGE_MAX_SIZE}
          maxFiles={1}
          multiple={false}
          accept={ALLOWED_MIME}
          onDrop={(acceptedFiles) =>
            setProfileImage({
              images: acceptedFiles,
              preview: URL.createObjectURL(acceptedFiles[0]),
            })
          }
        >
          {({ getRootProps, getInputProps }) => (
            <div
              className="absolute bottom-0 left-4 translate-y-1/2"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <ProfilePicture
                size="large"
                url={profileImage.preview || user?.me.profile.profilePicture!}
              />
              <div className="text-white bg-gray-800 bg-opacity-60 rounded-full p-1 text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <IoAdd />
              </div>
            </div>
          )}
        </Dropzone>
      </div>

      <Input
        {...formik.getFieldProps('displayname')}
        error={formik.errors.displayname}
        isTouched={formik.touched.bio}
        id="edit_profile-input-displayname"
        placeholder="Displayname"
      />

      <Input
        {...formik.getFieldProps('bio')}
        error={formik.errors.bio}
        isTouched={formik.touched.bio}
        as="texarea"
        id="edit_profile-input-displayname"
        placeholder="Bio"
      />

      {error?.name === 'PayloadTooLargeError' && (
        <p className="text-red-500">File too large</p>
      )}
    </Modal>
  );
};

export default EditProfileModal;
