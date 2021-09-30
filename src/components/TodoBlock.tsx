import React, {useState} from "react";
import defaultAvatar from "../img/default-avatar.jpg";
import TodoItem from "./TodoItem";
import styles from "./TodoBlock.module.scss";
import InputForm from "./InputForm";
import { ITodoItem } from "../interfaces";

const getTodos = (): ITodoItem[]  => {
  return [
    {
      id: 1,
      text: "Pick up Flowers",
      done: false,
    },
    {
      id: 2,
      text: "Finish the presentation",
      done: true,
    },
    {
      id: 3,
      text: "Buy new macbook",
      done: true,
    },
  ];
};

const TodoBlock: React.FC = () => {
  const [todos, setTodos] = useState<ITodoItem[]>(getTodos());
  const addHandler = (newTodo: ITodoItem): void => {
    setTodos(prev => [...prev, newTodo]);
  };

  const deleteHandler = (id: number): void => {
    setTodos(prev => prev.filter(item => item.id !== id))
  }

  return (
    <div className={styles.todoBlock}>
      <header className={styles.todoHeader}>
        <div className={styles.left}>
          <h3>Daily Todo list</h3>
          <p>Practice programming every day!</p>
        </div>
        <img src={defaultAvatar} alt="Default avatar" />
      </header>
      <div className={styles.line}></div>
      <main>
        {todos.length ? (
          <ul>
            {todos.map((item) => (
              <TodoItem key={item.id} {...item} deleteTodo={deleteHandler} />
            ))}
          </ul>
        ) : (
          <span className={styles.empty}>No work for today! 😋 </span>
        )}
      
        <InputForm addTodo={addHandler} />
      </main>
    </div>
  );
};

export default TodoBlock;
