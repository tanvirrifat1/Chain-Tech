import { Controller, useForm, useFormContext } from "react-hook-form";
import { getErrorMessageByPropertyName } from "./schema";

const FormInput = ({
  name,
  type,
  value,
  placeholder,
  label,
  className,
  id,
  readonly,
}) => {
  const { control, reset, formState: errors } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);
  return (
    <>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label ? label : null}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <input
            type={type}
            placeholder={placeholder}
            className={className}
            id={id}
            {...field}
            value={value ? value : field.value}
            required
            readOnly={readonly}
          />
        )}
      />
      <small style={{ color: "red" }}>{errorMessage}</small>
    </>
  );
};

export default FormInput;
