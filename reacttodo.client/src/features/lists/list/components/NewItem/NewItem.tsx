import React from 'react';
import { Button, Input } from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';

type NewItemProps = {
  onCreateTask: (name: string) => void;
}

type NewTaskInputs = {
  name: string;
}

export function NewItem({ onCreateTask }: NewItemProps) {
  const {
    control, handleSubmit, formState: { errors }, reset,
  } = useForm<NewTaskInputs>({
    defaultValues: { name: '' },
  });

  const onSubmit = (data: { name: string }) => {
    onCreateTask(data.name);
    reset({}, { keepValues: false, keepErrors: false });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-0 d-flex mb-4">
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              placeholder="New task"
              invalid={!!errors.name}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...field}
              autoFocus
              type="text"
            />
          )}
        />
        <Button color="success" onClick={handleSubmit(onSubmit)}>Create Task</Button>
      </div>
    </form>
  );
}
