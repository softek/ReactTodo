import type { Meta, StoryObj } from '@storybook/react';
import {
  expect, fn, userEvent, waitFor, within,
} from '@storybook/test';
import { ListManagement } from './ListManagement';

const meta = {
  title: 'Features/ListManagement',
  component: ListManagement,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
  },
  args: {
    onCreateList: fn(),
  },
} satisfies Meta<typeof ListManagement>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    lists: [
      { id: '1', name: 'List 1' },
      { id: '2', name: 'List 2' },
    ],
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const inputBox = canvas.getByPlaceholderText('New list');
    await expect(inputBox).toBeInTheDocument();

    const createButton = canvas.getByRole('button', { name: /Create List/i });
    await expect(createButton).toBeInTheDocument();

    await userEvent.type(inputBox, 'New List Name');
    await userEvent.click(createButton);
    await waitFor(() => expect(args.onCreateList).toHaveBeenCalledWith('New List Name'));
    await expect(inputBox).toHaveValue('');
  },
};
