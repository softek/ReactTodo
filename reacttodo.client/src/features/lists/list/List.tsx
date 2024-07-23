import React from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../../app/api';
import { TodoList } from './components/TodoList';

type ListParams = 'listId';

export function List() {
  const { listId } = useParams<ListParams>();
  if (listId === undefined) {
    throw new Error('List ID is required');
  }

  const { data } = api.useGetTodoListDetailsQuery({ listId });
  const [deleteTask] = api.useDeleteTodoTaskMutation();
  const [updateTask] = api.useUpdateTodoTaskMutation();
  const [createTask] = api.useCreateTodoTaskMutation();

  return (
    <TodoList
      name={data?.name ?? ''}
      tasks={data?.tasks ?? []}
      onDeleteTask={(id) => deleteTask({ listId, taskId: id })}
      onUpdateTask={(task) => updateTask({ listId, taskId: task.id, todoTaskUpdateDto: task })}
      onCreateTask={(name) => createTask({ listId, todoTaskCreateDto: { name } })}
    />
  );
}
