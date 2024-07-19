import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { TodoList } from '../../../../data';
import { NewList } from '../NewList';

type ListManagementProps = {
  lists: TodoList[];
  onCreateList: (name: string) => void;
}

export function ListManagement({ lists, onCreateList }: ListManagementProps) {
  return (
    <div>
      <NewList onCreateList={(name) => onCreateList(name)} />
      <ListGroup>
        {lists.map((list) => (
          <ListGroupItem
            key={list.id}
            action
            tag="button"
          >
            {list.name}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
