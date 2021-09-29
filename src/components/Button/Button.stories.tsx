import React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import Button, { ButtonType } from './Button';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'Button',
  decorators: [withKnobs],
};

export const Primary: ComponentStory<typeof Button> = () => {
  const label = text('Label', 'See now');
  const outlined = boolean('Oultined', false);
  return <Button type={ButtonType.Primary} onClick={action('clicked')} outlined={outlined} label={label} />;
};
