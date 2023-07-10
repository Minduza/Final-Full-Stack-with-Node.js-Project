import React from "react";
import "./TextareaItem.scss";

const TextareaItem = ({ label, className, onChange, value, ...props }) => {
  return (
    <div>
      <div className="labelItem">
        <label>{label}</label>
      </div>
      <textarea
        className={`textareaInput ${className}`}
        onChange={onChange}
        value={value}
        {...props}
      />
      <div>Max characters: {value.length}/2000</div>
    </div>
  );
};

export default TextareaItem;
