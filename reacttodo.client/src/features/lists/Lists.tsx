import React from 'react';
import { api } from '../../app/api';
import { ListManagement } from './components/ListManagement';

export function Lists() {
  const { data, isLoading } = api.useListTodoListsQuery();
  const [createList] = api.useCreateTodoListMutation();

  return (
    <ListManagement
      lists={data ?? []}
      onCreateList={(name) => createList({ todoListCreateDto: { name } })}
      isLoading={isLoading}
    />
  );
}
