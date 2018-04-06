import React from 'react';

const renderFileInput = ({ input, resetKey }) => {
  const { value, ...inputProps } = input;

  const handleChange = e => {
    input.onChange(e.target.files[0]);
  };

  return (
    <input
      {...inputProps}
      key={resetKey}
      type="file"
      onChange={handleChange}
      onBlur={() => {}}
    />
  );
};

export default renderFileInput;
