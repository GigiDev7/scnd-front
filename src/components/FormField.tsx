import React from "react";

interface IProps {
  id: string;
  labelText: string;
  value: string;
  errorMessage: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField: React.FC<IProps> = ({
  id,
  labelText,
  handleChange,
  value,
  errorMessage,
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex w-80 justify-between items-center">
        <label className="font-medium" htmlFor={id}>
          {labelText}
        </label>
        <input
          required
          className={`border-2 ${
            errorMessage ? "border-red-500" : "border-black"
          } py-1 pl-1`}
          value={value}
          onChange={(e) => handleChange(e)}
          name={id}
          id={id}
          placeholder={`#${id}`}
          type="text"
        />
      </div>
      {errorMessage && (
        <span className="text-red-500 mt-2 text-sm">{errorMessage}</span>
      )}
    </div>
  );
};

export default FormField;
