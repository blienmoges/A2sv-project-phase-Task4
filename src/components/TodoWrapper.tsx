import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import EditTodoForm from "./EditTodoForm";
import { type ITodo, type FilterType } from "./types";

const TodoWrapper = () => {
  const [todos, setTodos] = useState<ITodo[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const addTodo = (todo: string) => {
    if (todo.trim() === "") return;
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  };

  const deleteTodo = (id: string) =>
    setTodos(todos.filter((todo) => todo.id !== id));

  const toggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task: string, id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: false } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeTasksCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="TodoWrapper">
      <div className="header">
        <div className="date">{currentDate}</div>
        <div className="task-count">{activeTasksCount} Active Tasks</div>
        <h1>Get things done!</h1>
      </div>

      <div className="filter-buttons">
        <button
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All Tasks
        </button>
        <button
          className={`filter-btn ${filter === "active" ? "active" : ""}`}
          onClick={() => setFilter("active")}
        >
          Incomplete
        </button>
        <button
          className={`filter-btn ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      <TodoForm addTodo={addTodo} />

      {filteredTodos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};

export default TodoWrapper;
