import React from 'react';
import { action } from '@storybook/addon-actions';
import { OssoGeneratedFields } from '../src/components/OssoGeneratedFields';

export default {
  title: 'Osso Generated Fields',
  component: Button,
};

export const HTMLElements = () => {
  return <OssoGeneratedFields providerDetails={providerDetails} samlProvider={data} />;
};

// export const Text = () => <Button onClick={action('clicked')}>Hello Button</Button>;

// export const Emoji = () => (
//   <Button onClick={action('clicked')}>
//     <span role="img" aria-label="so cool">
//       😀 😎 👍 💯
//     </span>
//   </Button>
// );
