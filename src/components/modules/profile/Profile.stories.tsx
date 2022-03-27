import Profile from '@components/modules/profile/Profile';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Elements/Profile',
  component: Profile,
} as ComponentMeta<typeof Profile>;

export const Sandbox: ComponentStory<typeof Profile> = (args) => (
  <Profile {...args}>Profile</Profile>
);

export const Primary: ComponentStory<typeof Profile> = (args) => (
  <>
    <Profile />
    {/* <Profile>Profile</Profile> */}
  </>
);
