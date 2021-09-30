import React, { useState } from "react";
import { ITodoItem } from "../interfaces";
import styles from "./InputForm.module.scss";

type InputFormProps = {
  addTodo(newTodo: ITodoItem): void;
};

const InputForm: React.FC<InputFormProps> = ({ addTodo }) => {
  const [textValue, setTextValue] = useState("");
  const onTextInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTextValue(event.target.value);
  };
  const onClickAdd = () => {
    if (textValue.trim()) {
      setTextValue("");
      addTodo({
        id: Date.now(),
        text: textValue,
        done: false,
      });
    }
  };
  const onKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && textValue.trim()) {
      onClickAdd();
    }
  };
  return (
    <div className={styles.inputForm}>
      <input
        type="text"
        value={textValue}
        onChange={onTextInput}
        onKeyPress={onKeyPress}
        placeholder="Enter task"
      />
      <button className={styles.button} onClick={onClickAdd}>
        <svg
          height="448pt"
          viewBox="0 0 448 448"
          width="448pt"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m408 184h-136c-4.417969 0-8-3.582031-8-8v-136c0-22.089844-17.910156-40-40-40s-40 17.910156-40 40v136c0 4.417969-3.582031 8-8 8h-136c-22.089844 0-40 17.910156-40 40s17.910156 40 40 40h136c4.417969 0 8 3.582031 8 8v136c0 22.089844 17.910156 40 40 40s40-17.910156 40-40v-136c0-4.417969 3.582031-8 8-8h136c22.089844 0 40-17.910156 40-40s-17.910156-40-40-40zm0 0" />
        </svg>
      </button>
    </div>
  );
};

export default InputForm;
