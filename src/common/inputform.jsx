import React from "react";

const InputForm = ({ name, value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{name}</label>
      <br />
      <input
        autoFocus
        name={name}
        value={value}
        onChange={onChange}
        id={name}
        type="text"
      />
    </div>
  );
};

export default InputForm;
