import { IEditableField } from "../interfaces";
import styles from "./EditableField.module.scss";
import React, { useState } from "react";

const EditableField: React.FC<IEditableField> = ({ text, storageKey }) => {
  const [inputValue, setInputValue] = useState(text);
  const onChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    localStorage.setItem(storageKey, event.target.value);
  };
  return (
    <div className={styles.editableField}>
      <input type="text" value={inputValue} onChange={onChangeInputValue}/>
    </div>
  );
};

export default EditableField;
