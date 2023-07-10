import Input from "../Input/Input";
import "./FormItem.scss";

const FormItem = ({ label, type, className, onChange, value, ...props }) => {
  return (
    <div>
      <div className="labelItem">
        <label>{label}</label>
      </div>
      <Input
        type={type}
        className={className}
        onChange={onChange}
        value={value}
        {...props}
      />
    </div>
  );
};

export default FormItem;
