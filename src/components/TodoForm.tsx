import { useState } from "react";

interface TodoFormProps {
  addTodo: (todo: string) => void;
}

const TodoForm = ({ addTodo }: TodoFormProps) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo(value);
    setValue("");
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        value={value}
        placeholder="Enter your task"
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;
