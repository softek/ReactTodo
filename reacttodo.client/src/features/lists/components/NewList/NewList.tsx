import React from 'react';
import { Input } from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '../../../../components';

type NewListProps = {
  onCreateList: (name: string) => void;
}

type NewListInputs = {
  name: string;
}

export function NewList({ onCreateList: onCreateTask }: NewListProps) {
  const {
    control, handleSubmit, formState: { errors }, reset,
  } = useForm<NewListInputs>({
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
              placeholder="New list"
              invalid={!!errors.name}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...field}
              autoFocus
              type="text"
            />
          )}
        />
        <Button
          type="success"
          label="Create List"
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </form>
  );
}
