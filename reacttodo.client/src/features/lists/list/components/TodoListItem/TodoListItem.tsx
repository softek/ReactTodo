import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import { Button } from '../../../../../components';

export type TodoTask = {
  id: string;
  name: string;
  isComplete: boolean;
}

export type TodoListItemProps = {
  task: TodoTask;
  onDelete: () => void;
  onToggle: () => void;
}

export function TodoListItem({
  task,
  onDelete,
  onToggle,
}: TodoListItemProps) {
  const textClass = task.isComplete ? 'text-decoration-line-through' : '';
  return (
    <div className="list-item">
      <FormGroup
        check
        inline
      >
        <Input
          type="checkbox"
          checked={task.isComplete}
          onClick={onToggle}
        />
        <Label check className={textClass}>
          {task.name}
        </Label>
      </FormGroup>
      {task.isComplete && (
        <Button
          label="Delete"
          type="danger"
          onClick={onDelete}
        />
      )}
    </div>
  );
}
