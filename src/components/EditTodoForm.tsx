import { useState } from "react";
import { type ITodo } from "./types";

interface EditTodoFormProps {
  editTodo: (task: string, id: string) => void;
  task: ITodo;
}

const EditTodoForm = ({ editTodo, task }: EditTodoFormProps) => {
  const [value, setValue] = useState(task.task);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editTodo(value, task.id);
    setValue("");
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-update-input"
        value={value}
        placeholder="update task"
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="todo-update-btn">
        Update Task
      </button>
    </form>
  );
};

export default EditTodoForm;
