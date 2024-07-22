import React from 'react';
import { ListGroup } from 'reactstrap';
import { TodoTask } from '../../../../../data';
import { TodoListItem } from '../TodoListItem';
import { NewItem } from '../NewItem';

export type TodoLisProps = {
  name: string;
  tasks: TodoTask[];
  onDeleteTask: (id: string) => void;
  onUpdateTask: (task: TodoTask) => void;
  onCreateTask: (name: string) => void;
}

export function TodoList({
  name, tasks, onDeleteTask, onUpdateTask, onCreateTask,
}: TodoLisProps) {
  return (
    <div>
      <h1>{name}</h1>
      <NewItem onCreateTask={(task) => onCreateTask(task)} />
      <ListGroup>
        {tasks.map((task) => (
          <TodoListItem
            key={task.id}
            task={task}
            onDelete={() => onDeleteTask(task.id)}
            onToggle={() => onUpdateTask({ ...task, isCompleted: !task.isCompleted })}
            onRename={(newName) => onUpdateTask({ ...task, name: newName })}
          />
        ))}
      </ListGroup>
    </div>
  );
}
