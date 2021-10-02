import React, { useState } from "react";
import styles from "./TodoItem.module.scss";

const TodoItem: React.FC<{
  id: number;
  text: string;
  done: boolean;
  deleteTodo(id: number): void;
  setDoneStatus(id: number, done: boolean): void;
}> = ({ text, done, id, deleteTodo, setDoneStatus }) => {
  const [itemDone, setItemDone] = useState(done);

  const onClickItem = (): void => {
    setDoneStatus(id, !itemDone);
    setItemDone(!itemDone);
  };

  return (
    <li
      className={`${styles.todoItem} ${itemDone && styles.done}`}
      onClick={onClickItem}
    >
      <mark>
        <svg
          id="bold"
          enable-background="new 0 0 24 24"
          height="512"
          viewBox="0 0 24 24"
          width="512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path d="m9.707 19.121c-.187.188-.442.293-.707.293s-.52-.105-.707-.293l-5.646-5.647c-.586-.586-.586-1.536 0-2.121l.707-.707c.586-.586 1.535-.586 2.121 0l3.525 3.525 9.525-9.525c.586-.586 1.536-.586 2.121 0l.707.707c.586.586.586 1.536 0 2.121z" />
          </g>
        </svg>
      </mark>
      <span>{text.length >= 37 ? text.slice(0, 37) + "..." : text}</span>
      <i onClick={() => deleteTodo(id)}>
        <svg
          height="365.696pt"
          viewBox="0 0 365.696 365.696"
          width="365.696pt"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m243.1875 182.859375 113.132812-113.132813c12.5-12.5 12.5-32.765624 0-45.246093l-15.082031-15.082031c-12.503906-12.503907-32.769531-12.503907-45.25 0l-113.128906 113.128906-113.132813-113.152344c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503907-12.5 32.769531 0 45.25l113.152344 113.152344-113.128906 113.128906c-12.503907 12.503907-12.503907 32.769531 0 45.25l15.082031 15.082031c12.5 12.5 32.765625 12.5 45.246093 0l113.132813-113.132812 113.128906 113.132812c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082031c12.5-12.503906 12.5-32.769531 0-45.25zm0 0" />
        </svg>
      </i>
    </li>
  );
};

export default TodoItem;
