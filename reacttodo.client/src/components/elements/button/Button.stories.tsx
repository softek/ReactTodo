import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  fn, within, userEvent, expect,
  waitFor,
} from '@storybook/test';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LabelAsContent: Story = {
  args: {
    label: 'Button',
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /Button/i });
    await expect(button).toBeInTheDocument();
    await userEvent.click(button);
    await waitFor(() => expect(args.onClick).toHaveBeenCalled());
  },
};

export const ComplexContent: Story = {
  args: {
    label: 'Button',
    children: <strong>Bold Button</strong>,
  },
};
