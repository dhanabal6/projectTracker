import React from 'react';
import InputValidationError from './InputValidationError';

export default field => (
  <div className="inputdetail">
    <label for={field.name}> {field.label}</label>
    <div className="input">
      <select
        {...field.input}
        className={field.meta.touched && field.meta.error ? "error-field" : ""}
        onChange={event => {
          console.log(event.target.value);
          field.input.onChange(event); // <-- Propagate the event
          // return event.target.value;
        }}
      >
        {field.children}
      </select>
      <InputValidationError field={field} />
    </div>
  </div>
);
