import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
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
          >
            <Link to={`list/${list.id}`}>
              {list.name}
            </Link>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
