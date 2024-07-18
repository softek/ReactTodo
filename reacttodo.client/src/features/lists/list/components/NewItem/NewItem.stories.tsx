import type { Meta, StoryObj } from '@storybook/react';
import {
  expect, fn, userEvent, waitFor, within,
} from '@storybook/test';
import { NewItem } from './NewItem';

const meta = {
  title: 'Features/TodoList/NewItem',
  component: NewItem,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
  },
  args: {
    onCreateTask: fn(),
  },
} satisfies Meta<typeof NewItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const inputBox = canvas.getByPlaceholderText('New task');
    await expect(inputBox).toBeInTheDocument();

    const createButton = canvas.getByRole('button', { name: /Create Task/i });
    await expect(createButton).toBeInTheDocument();

    await userEvent.click(createButton);
    await expect(args.onCreateTask).not.toHaveBeenCalled();

    await userEvent.type(inputBox, 'New Task Name');
    await userEvent.click(createButton);
    await waitFor(() => expect(args.onCreateTask).toHaveBeenCalledWith('New Task Name'));
    await expect(inputBox).toHaveValue('');
  },
};
