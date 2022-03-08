// import {props} from 'react-modal';
import Input from '@components/elements/input/Input';
import InputFile from '@components/elements/input/InputFile';
import Modal, { ModalProps } from '@components/elements/modal';
import { useMeQuery } from '@graphql/users/get-me/index.generated';
import { useUpdateSelfMutation } from '@graphql/users/update-self/index.generated';
import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { BiImageAdd } from 'react-icons/bi';
import * as Yup from 'yup';
import useRouterRefresh from '../../../hooks/useRouterRefresh';

interface EditProfileModal extends ModalProps {}

const EditProfileModal = ({ closeFn, isOpen, ...rest }: EditProfileModal) => {
  const { data: user, refetch: refetchUser } = useMeQuery();
  const [profilePicture, setProfilePicture] = useState<FileList | null>(null);
  const profilePictureRef = useRef<HTMLImageElement>(null);
  const [backgroundPicture, setBackgroundPicture] = useState<FileList | null>(
    null
  );
  const backgroundPictureRef = useRef<HTMLImageElement>(null);
  const [updateSelfMutation] = useUpdateSelfMutation();
  const refreshRouter = useRouterRefresh();

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
        console.log('');

        const { data } = await updateSelfMutation({
          variables: {
            update: {
              profile: {
                displayname: values.displayname,
                bio: values.bio,
              },
            },
          },
        });

        if (!data) {
          throw new Error();
        }

        refreshRouter();
        closeFn && closeFn();

        console.log('Update user success : ', data);
      } catch (err: any) {
        console.log('Update user error : ', err.message);
      }
    },
  });

  useEffect(() => {
    console.log('profile picture');

    if (!profilePictureRef.current || !profilePicture) return;
    const previewURL = URL.createObjectURL(profilePicture[0]);
    profilePictureRef.current.src = previewURL;
  }, [profilePicture]);

  useEffect(() => {
    console.log('background picture');

    if (!backgroundPictureRef.current || !backgroundPicture) return;
    const previewURL = URL.createObjectURL(backgroundPicture[0]);
    backgroundPictureRef.current.src = previewURL;
  }, [backgroundPicture]);

  useEffect(() => {
    if (!user) return;
    console.log('mount');

    formik.setFieldValue('displayname', user.me.profile.displayname);
    formik.setFieldValue('bio', user.me.profile.bio);

    return () => {
      console.log('unmount');
    };
  }, [user]);

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
      <div className="relative mb-28">
        <InputFile
          onFile={setBackgroundPicture}
          className="flex h-32"
          id="edit_profile-input-backround_picture"
        >
          <img
            ref={backgroundPictureRef}
            className="h-full w-full object-cover"
            src="https://picsum.photos/200/300"
            alt="background"
          />
          <div className="absolute rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-600 opacity-70 p-2">
            <BiImageAdd className="text-gray-200 " />
          </div>
        </InputFile>

        <InputFile
          onFile={setProfilePicture}
          className="absolute z-50 left-4 -bottom-1/2 translate-y-6 flex h-28 w-28 rounded-full mb-6"
          id="edit_profile-input-profile_picture"
        >
          <img
            ref={profilePictureRef}
            className="h-full w-full rounded-full object-cover"
            src="https://picsum.photos/200/300"
            alt="profile"
          />
          <div className="absolute rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-600 opacity-70 p-2">
            <BiImageAdd className="text-gray-200 " />
          </div>
        </InputFile>
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
    </Modal>
  );
};

export default EditProfileModal;
