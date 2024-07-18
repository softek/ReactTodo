import React from 'react';
import { ListGroup } from 'reactstrap';
import { TodoTask } from '../../../../../data';
import { TodoListItem } from '../TodoListItem';

export type TodoLisProps = {
  name: string;
  tasks: TodoTask[];
  onDeleteTask: (id: string) => void;
  onUpdateTask: (task: TodoTask) => void;
}

export function TodoList({
  name, tasks, onDeleteTask, onUpdateTask,
}: TodoLisProps) {
  return (
    <>
      <h1>{name}</h1>
      <ListGroup>
        {tasks.map((task) => (
          <TodoListItem
            key={task.id}
            task={task}
            onDelete={() => onDeleteTask(task.id)}
            onToggle={() => onUpdateTask({ ...task, isComplete: !task.isComplete })}
            onRename={(newName) => onUpdateTask({ ...task, name: newName })}
          />
        ))}
      </ListGroup>
    </>
  );
}
