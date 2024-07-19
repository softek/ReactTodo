/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
  FormGroup, Input, Label, ListGroupItem,
} from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '../../../../../components';
import { TodoTask } from '../../../../../data';

export type TodoListItemProps = {
  task: TodoTask;
  onDelete: () => void;
  onToggle: () => void;
  onRename: (name: string) => void;
}

type RenameItemProps = {
  task: TodoTask;
  onRename: (name: string) => void;
  onCancel: () => void;
}

type RenameInputs = {
  name: string;
}

function RenameItem({
  task, onRename, onCancel,
}: RenameItemProps) {
  const { control, handleSubmit, formState: { errors } } = useForm<RenameInputs>({
    defaultValues: { name: task.name },
  });

  const onSubmit = (data: { name: string }) => {
    onRename(data.name);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Input
            invalid={!!errors.name}
            {...field}
            autoFocus
            type="text"
          />
        )}
      />
      <Button
        label="Save"
        type="primary"
        onClick={handleSubmit(onSubmit)}
      />
      <Button
        label="Cancel"
        type="secondary"
        onClick={onCancel}
      />
    </form>
  );
}

export function TodoListItem({
  task,
  onDelete,
  onToggle,
  onRename,
}: TodoListItemProps) {
  const textClass = task.isCompleted ? 'text-decoration-line-through' : '';
  const [isEditing, setIsEditing] = useState(false);

  const handleRename = (name: string) => {
    onRename(name);
    setIsEditing(false);
  };

  const id = `task-completion-${task.id}`;

  return (
    <ListGroupItem>
      {
        isEditing
          ? (
            <RenameItem task={task} onRename={handleRename} onCancel={() => setIsEditing(false)} />
          )
          : (
            <>
              <FormGroup
                check
                inline
              >
                <Input
                  id={id}
                  type="checkbox"
                  checked={task.isCompleted}
                  onClick={onToggle}
                />
                <Label check for={id} className={textClass}>
                  {task.name}
                </Label>
              </FormGroup>
              {task.isCompleted && (
                <Button
                  label="Delete"
                  type="danger"
                  onClick={onDelete}
                />
              )}
              {!task.isCompleted && (
                <Button
                  label="Edit"
                  type="secondary"
                  onClick={() => setIsEditing(true)}
                />
              )}
            </>
          )
      }
    </ListGroupItem>
  );
}
