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

interface EditProfileModal extends ModalProps {}

const IMAGE_MAX_SIZE = 2_000_000;

const EditProfileModal = ({ closeFn, isOpen, ...rest }: EditProfileModal) => {
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
        const { data, errors, extensions } = await updateSelfMutation({
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
        console.log(extensions);

        refreshRouter();
        closeFn && closeFn();

        console.log('Update user success : ', data);
      } catch (err: any) {
        // if (errorData.error.maxFileSize) {
        // }
        // console.log(
        //   'Update user error : ',
        //   err.graphQLErrors[0].extensions.exception.response
        // );
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
      onAfterClose={() => console.log('close')}
      title="Edit Profile"
      btnAction={{
        fn: () => {
          formik.handleSubmit();
          console.log('save');
        },
        label: 'Save',
      }}
      {...rest}
    >
      <div className="relative mb-24 bg-cover bg-no-repeat">
        <Dropzone
          maxSize={IMAGE_MAX_SIZE}
          maxFiles={1}
          accept={['image/jpeg', 'image/png', 'image/webp']}
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
            </div>
          )}
        </Dropzone>

        <Dropzone
          maxSize={IMAGE_MAX_SIZE}
          onDropRejected={() => console.log('rejects')}
          maxFiles={1}
          accept={['image/jpeg', 'image/png', 'image/webp']}
          onDrop={(acceptedFiles) =>
            setProfileImage({
              images: acceptedFiles,
              preview: URL.createObjectURL(acceptedFiles[0]),
            })
          }
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <ProfilePicture
                size="large"
                className="absolute bottom-0 left-4 translate-y-1/2"
                url={profileImage.preview || user?.me.profile.profilePicture!}
              />
            </div>
          )}
        </Dropzone>
      </div>

      <Input
        {...formik.getFieldProps('displayname')}
        id="edit_profile-input-displayname"
        placeholder="Displayname"
      />

      <Input
        {...formik.getFieldProps('bio')}
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
