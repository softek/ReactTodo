import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  fn, within, userEvent, expect, waitFor,
} from '@storybook/test';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: { control: 'text' },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * When a label is provided but no children, the label will be used as the button content.
 */
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

/**
 * Buttons can contain any JSX content that is allowed under a button element.
 * This allows for text formatting or images to be included.
 */
export const ComplexContent: Story = {
  args: {
    label: 'Button',
    children: <strong>Bold Button</strong>,
  },
};

/**
 * There are several types of buttons available.
 */
export const Types: Story = {
  args: {
    label: 'Button',
  },
  render: () => (
    <div>
      <Button type="primary" label="primary" />
      <Button type="secondary" label="secondary" />
      <Button type="success" label="success" />
      <Button type="danger" label="danger" />
      <Button type="warning" label="warning" />
      <Button type="info" label="info" />
      <Button type="light" label="light" />
      <Button type="dark" label="dark" />
      <Button type="link" label="link" />
    </div>
  ),
};
