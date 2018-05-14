import React from 'react';
import InputValidationError from './InputValidationError';

export default field => (
  <div className="inputdetail">
      <label for={field.name}> {field.label}</label>
    <div className="input">
      <input
        {...field.input}
        type="password"
        className={field.meta.touched && field.meta.error ? "error-field" : ""}
        placeholder={field.placeholder}
      />
      <InputValidationError field={field} />
    </div>
  </div>
);
