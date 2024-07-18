import type { Meta, StoryObj } from '@storybook/react';
import {
  expect, fn, userEvent, waitFor, within,
} from '@storybook/test';
import { TodoListItem } from './TodoListItem';

const meta = {
  title: 'Features/TodoListItem',
  component: TodoListItem,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
  },
  args: {
    onDelete: fn(),
    onToggle: fn(),
    onRename: fn(),
  },
} satisfies Meta<typeof TodoListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IncompleteTask: Story = {
  args: {
    task: { id: '1', name: 'Task 1', isComplete: false },
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');
    await expect(checkbox).toBeInTheDocument();
    await userEvent.click(checkbox);
    await waitFor(() => expect(args.onToggle).toHaveBeenCalled());

    const editButton = canvas.getByRole('button', { name: /Edit/i });
    await expect(editButton).toBeInTheDocument();
    await userEvent.click(editButton);

    const inputBox = canvas.getByRole('textbox');
    await expect(inputBox).toBeInTheDocument();
    await expect(inputBox).toHaveValue('Task 1');

    const saveButton = canvas.getByRole('button', { name: /Save/i });
    userEvent.clear(inputBox);
    await userEvent.click(saveButton);
    await expect(inputBox).toBeInTheDocument();

    await userEvent.type(inputBox, 'Renamed Task 1');
    await userEvent.click(saveButton);
    await waitFor(() => expect(args.onRename).toHaveBeenCalledWith('Renamed Task 1'));
    await expect(inputBox).not.toBeInTheDocument();
  },
};

export const CompletedTask: Story = {
  args: {
    task: { id: '1', name: 'Task 1', isComplete: true },
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const deleteButton = canvas.getByRole('button', { name: /Delete/i });
    await expect(deleteButton).toBeInTheDocument();
    await userEvent.click(deleteButton);
    await waitFor(() => expect(args.onDelete).toHaveBeenCalled());

    const checkbox = canvas.getByRole('checkbox');
    await expect(checkbox).toBeInTheDocument();
    await userEvent.click(checkbox);
    await waitFor(() => expect(args.onToggle).toHaveBeenCalled());
  },
};
