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
          field.input.onChange(event);
        }}
      >
        {field.children}
      </select>
      <InputValidationError field={field} />
    </div>
  </div>
);
