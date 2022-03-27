import { ComponentMeta, ComponentStory } from '@storybook/react';
import Button from './Button';

export default {
  title: 'Elements/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

export const Sandbox: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>Button</Button>
);
Sandbox.args = {
  styleType: 'primary',
  sizeType: 'medium',
};

export const Primary: ComponentStory<typeof Button> = (args) => (
  <>
    <Button as="button" styleType="primary" sizeType="medium">
      Button
    </Button>
    <Button as="button" styleType="primaryOutline" sizeType="medium">
      Button
    </Button>
    {/* <Button>Button</Button> */}
  </>
);

export const Loading: ComponentStory<typeof Button> = (args) => (
  <>
    <Button as="button" styleType="primary" sizeType="medium" isLoading={true}>
      Button
    </Button>
    <Button
      as="button"
      styleType="primaryOutline"
      sizeType="medium"
      isLoading={true}
    >
      Button
    </Button>
    {/* <Button>Button</Button> */}
  </>
);

export const Disabled: ComponentStory<typeof Button> = (args) => (
  <>
    <Button as="button" styleType="primary" sizeType="medium" disabled={true}>
      Button
    </Button>
    <Button
      as="button"
      styleType="primaryOutline"
      sizeType="medium"
      disabled={true}
    >
      Button
    </Button>
    {/* <Button>Button</Button> */}
  </>
);

export const Toto: ComponentStory<typeof Button> = (args) => (
  <>
    <Button
      as="button"
      styleType="primaryOutline"
      sizeType="small"
      disabled={true}
    >
      Button
    </Button>
    {/* <Button>Button</Button> */}
  </>
);

// export const Primary: ComponentStory<typeof Button> = (args) => (
//   <>
//     <Button appearance="primary">Button</Button>
//     <Button appearance="primaryOutline">Button</Button>
//   </>
// );

// export const Loading: ComponentStory<typeof Button> = (args) => (
//   <>
//     <Button appearance="primary" isLoading={true}>
//       Button
//     </Button>
//     <Button appearance="primaryOutline" isLoading={true}>
//       Button
//     </Button>
//   </>
// );

// export const Disabled: ComponentStory<typeof Button> = (args) => (
//   <>
//     <Button appearance="primary" disabled={true}>
//       Button
//     </Button>
//     <Button appearance="primaryOutline" disabled={true}>
//       Button
//     </Button>
//   </>
// );

// storiesOf('UI/Button', Button);

// story

// .add('default', () => '' );
