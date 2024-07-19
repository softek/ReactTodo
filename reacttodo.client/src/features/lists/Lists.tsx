import React from 'react';
import { api } from '../../app/api';
import { ListManagement } from './components/ListManagement';

export function Lists() {
  const { data } = api.useListTodoListsHandleQuery();
  const [createList] = api.useCreateTodoListHandleMutation();

  return (
    <ListManagement
      lists={data ?? []}
      onCreateList={(name) => createList({ todoListCreateDto: { name } })}
    />
  );
}
