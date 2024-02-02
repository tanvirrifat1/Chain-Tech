import { useFormContext, Controller } from "react-hook-form";

const SelectFormField = ({
  name,
  placeholder = "select",
  options,
  label,
  id,
  className,
}) => {
  const { control } = useFormContext();

  return (
    <div className="form-control w-full">
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label ? label : null}
      </label>
      <Controller
        control={control}
        name={name} // Specify the name only here
        render={({ field }) => (
          <select className={className} required {...field}>
            <option value="">{placeholder}</option>
            {options?.map((option, index) => (
              <option value={option.value} key={index}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      />
    </div>
  );
};

export default SelectFormField;
