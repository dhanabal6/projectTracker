import React from "react";

const InputValidationError = ({ field }) => {
  const isErrorVisible = field.meta.touched && field.meta.error;

  if (!isErrorVisible) {
    return null;
  }

  return <div className="InputValidationError">{field.meta.error}</div>;
};

export default InputValidationError;
