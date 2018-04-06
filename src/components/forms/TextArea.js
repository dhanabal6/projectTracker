import React from 'react';
import InputValidationError from './InputValidationError';

export default field => (
  <div className="inputdetail">
    <label for={field.name}> {field.label}</label>
    <div className="input">
      <textarea
        {...field.input}
        className={field.className}
        placeholder={field.placeholder}
        rows="3"
      />
      <InputValidationError field={field} />
    </div>
  </div>
);
