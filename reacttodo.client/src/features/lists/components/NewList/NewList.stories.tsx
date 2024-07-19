import type { Meta, StoryObj } from '@storybook/react';
import {
  expect, fn, userEvent, waitFor, within,
} from '@storybook/test';
import { NewList } from './NewList';

const meta = {
  title: 'Features/ListManagement/NewList',
  component: NewList,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
  },
  args: {
    onCreateList: fn(),
  },
} satisfies Meta<typeof NewList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const inputBox = canvas.getByPlaceholderText('New list');
    await expect(inputBox).toBeInTheDocument();

    const createButton = canvas.getByRole('button', { name: /Create List/i });
    await expect(createButton).toBeInTheDocument();

    await userEvent.click(createButton);
    await expect(args.onCreateList).not.toHaveBeenCalled();

    await userEvent.type(inputBox, 'New List Name');
    await userEvent.click(createButton);
    await waitFor(() => expect(args.onCreateList).toHaveBeenCalledWith('New List Name'));
    await expect(inputBox).toHaveValue('');
  },
};
