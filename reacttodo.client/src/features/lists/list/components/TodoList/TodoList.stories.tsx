import type { Meta, StoryObj } from '@storybook/react';
import {
  expect, fn, userEvent, waitFor, within,
} from '@storybook/test';
import { TodoList } from './TodoList';

const meta = {
  title: 'Features/TodoList',
  component: TodoList,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
  },
  args: {
    onDeleteTask: fn(),
    onUpdateTask: fn(),
  },
} satisfies Meta<typeof TodoList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'My List',
    tasks: [
      { id: '1', name: 'Task 1', isComplete: false },
      { id: '2', name: 'Task 2', isComplete: true },
    ],
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const box = canvas.getByLabelText('Task 1');
    await expect(box).toBeInTheDocument();
    userEvent.click(box);
    await waitFor(() => expect(args.onUpdateTask).toHaveBeenCalledWith({ id: '1', name: 'Task 1', isComplete: true }));

    const deleteButton = canvas.getByRole('button', { name: /Delete/i });
    await expect(deleteButton).toBeInTheDocument();
    await userEvent.click(deleteButton);
    await waitFor(() => expect(args.onDeleteTask).toHaveBeenCalledWith('2'));

    const editButton = canvas.getByRole('button', { name: /Edit/i });
    await expect(editButton).toBeInTheDocument();
    await userEvent.click(editButton);
    const inputBox = canvas.getByRole('textbox');
    await expect(inputBox).toBeInTheDocument();
    await userEvent.clear(inputBox);
    await userEvent.type(inputBox, 'Renamed Task 1');
    const saveButton = canvas.getByRole('button', { name: /Save/i });
    await userEvent.click(saveButton);
    await waitFor(() => expect(args.onUpdateTask).toHaveBeenCalledWith({ id: '1', name: 'Renamed Task 1', isComplete: false }));
  },
};
