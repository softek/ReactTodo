/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import { Input, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { TodoList } from '../../../../data';
import { NewList } from '../NewList';

type ListManagementProps = {
  lists: TodoList[];
  isLoading: boolean;
  onCreateList: (name: string) => void;
}

function ListItemPlaceholder() {
  return (
    <ListGroupItem>
      <span className="placeholder col-12 placeholder-lg" />
    </ListGroupItem>
  );
}

function LoadingView() {
  return (
    <div style={{ width: '300px' }}>
      <div className="p-0 d-flex mb-4">
        <Input
          className="placeholder"
          type="text"
          disabled
        />
        <a tabIndex={-1} className="btn btn-success disabled placeholder col-4" aria-hidden="true" />
      </div>
      <ListGroup className="placeholder-glow">
        <ListItemPlaceholder />
        <ListItemPlaceholder />
        <ListItemPlaceholder />
      </ListGroup>
    </div>
  );
}

export function ListManagement({ lists, isLoading, onCreateList }: ListManagementProps) {
  return isLoading
    ? <LoadingView />
    : (
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
