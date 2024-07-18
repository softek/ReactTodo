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
  },
};

export const CompletedTask: Story = {
  args: {
    task: { id: '1', name: 'Task 1', isComplete: true },
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /Delete/i });
    await expect(button).toBeInTheDocument();
    await userEvent.click(button);
    await waitFor(() => expect(args.onDelete).toHaveBeenCalled());

    const checkbox = canvas.getByRole('checkbox');
    await expect(checkbox).toBeInTheDocument();
    await userEvent.click(checkbox);
    await waitFor(() => expect(args.onToggle).toHaveBeenCalled());
  },
};
