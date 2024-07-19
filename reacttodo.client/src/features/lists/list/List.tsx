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

  const { data } = api.useListTodoTasksHandleQuery({ listId });
  const [deleteTask] = api.useDeleteTodoTaskHandleMutation();
  const [updateTask] = api.useUpdateTodoTaskHandleMutation();
  const [createTask] = api.useCreateTodoTaskHandleMutation();

  return (
    <TodoList
      name="List"
      tasks={data ?? []}
      onDeleteTask={(id) => deleteTask({ listId, taskId: id })}
      onUpdateTask={(task) => updateTask({ listId, taskId: task.id, todoTaskUpdateDto: task })}
      onCreateTask={(name) => createTask({ listId, todoTaskCreateDto: { name } })}
    />
  );
}
