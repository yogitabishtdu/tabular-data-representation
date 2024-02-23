import React from "react";
import { useForm } from "react-hook-form";

function FormInput({ labelValue, errorMessage, pattern }) {
  const {
    register,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <label>labelValue</label>
      <input
        {...register(labelValue, {
          required: errorMessage,
          pattern: pattern,
        })}
      />
      {errors.labelValue && <span>{errors.labelValue.errorMessage}</span>}
    </div>
  );
}

export default FormInput;
