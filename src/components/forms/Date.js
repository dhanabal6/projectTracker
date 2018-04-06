import React from "react";
import InputValidationError from "./InputValidationError";

export default field => (
  <div>
    <label htmlFor={field.name}>{field.label}</label>
    <input
      {...field.input}
      type="date"
      className={field.meta.touched && field.meta.error ? "error-field" : ""}
      placeholder={field.placeholder}
      pattern={"d{4}-d{1,2}-d{1,2}"}
    />
    <InputValidationError field={field} />
  </div>
);
