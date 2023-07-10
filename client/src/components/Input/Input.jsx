import "./Input.scss";

const Input = ({ type, className, onChange, value, ...props }) => {
  return (
    <input
      type={type}
      className={`inputField ${className}`}
      onChange={onChange}
      value={value}
      {...props}
    />
  );
};

export default Input;
