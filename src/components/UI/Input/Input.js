import React from "react";
import styles from "./Input.module.css";

const input = (props) => {
  let inputElement = null;
  const inputClasses = [styles.InputElement];
  let validateionMessage = null;
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(styles.Invalid);
    validateionMessage = <p>Please enter a valid value</p>;
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((op) => (
            <option key={op.value} value={op.value}>
              {op.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }

  return (
    <div className={styles.Input}>
      <label className={styles.Laebl}>{props.label}</label>
      {inputElement}
      {validateionMessage}
    </div>
  );
};

export default input;
