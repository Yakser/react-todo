import React, { useState, useEffect } from "react";
import defaultAvatar from "../img/default-avatar.jpg";
import TodoItem from "./TodoItem";
import styles from "./TodoBlock.module.scss";
import InputForm from "./InputForm";
import { ITodoItem } from "../interfaces";
import EditableField from './EditableField';

const getItemFromLocalStorage = (key: string):string  => {
  const value = localStorage.getItem(key);
  return value === null ? "" : value;
}

const getTodosFromLocalStorage = (): ITodoItem[] => {
  const todosItem = localStorage.getItem("todos");
  return todosItem === null ? [] : JSON.parse(todosItem);
};

const setTodosToLocalStorage = (newTodos: ITodoItem[]): void => {
  localStorage.setItem("todos", JSON.stringify(newTodos));
};

const initLocalStorageTodos = (): void => {
  const prevTodos = getTodosFromLocalStorage();
  const notDoneTodos = prevTodos.filter(item => item.done === false);
  localStorage.setItem("todos", JSON.stringify(notDoneTodos));
};

const initLocalStorageItem = (key: string, value: string): void => {
  if (localStorage.getItem(key) === null) {
    localStorage.setItem(key, value);
  }
};

const initLocalStorage = (): void => {
  initLocalStorageItem("header", "Daily Todo list");
  initLocalStorageItem("subheader", "Practice programming every day!");
  initLocalStorageTodos();
};

const TodoBlock: React.FC = () => {
  const [todos, setTodos] = useState<ITodoItem[]>(getTodosFromLocalStorage());

  const addTodoHandler = (newTodo: ITodoItem): void => {
    setTodos((prev) => {
      const newTodos = [...prev, newTodo];
      setTodosToLocalStorage(newTodos);
      return newTodos;
    });
  };

  const deleteTodoHandler = (id: number): void => {
    setTodos((prev) => {
      const newTodos = prev.filter((item) => item.id !== id);
      setTodosToLocalStorage(newTodos);
      return newTodos;
    });
  };

  const doneStatusHandler = (id: number, done: boolean): void => {
    setTodos((prev) => {
      const newTodos = prev.map(item => {
        if(item.id === id){
          item.done = done
        }
        return item
      });
      setTodosToLocalStorage(newTodos);
      return newTodos;
    });
  };

  useEffect(() => {
    initLocalStorage();
  });

  return (
    <div className={styles.todoBlock}>
      <header className={styles.todoHeader}>
        <div className={styles.left}>
          <h3>
            <EditableField
              text={getItemFromLocalStorage("header")}
              storageKey="header"
            />
          </h3>
          <span>
            <EditableField
              text={getItemFromLocalStorage("subheader")}
              storageKey="subheader"
            />
          </span>
        </div>
        <img src={defaultAvatar} alt="Default avatar" />
      </header>
      <div className={styles.line}></div>
      <main>
        {todos.length ? (
          <ul>
            {todos.map((item) => (
              <TodoItem
                key={item.id}
                {...item}
                deleteTodo={deleteTodoHandler}
                setDoneStatus={doneStatusHandler}
              />
            ))}
          </ul>
        ) : (
          <ul>
            <span className={styles.empty}>No work for today! 😋</span>
          </ul>
        )}
        <InputForm addTodo={addTodoHandler} />
      </main>
    </div>
  );
};

export default TodoBlock;
