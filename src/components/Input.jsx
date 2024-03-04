import React from "react";

const Input = ({ register, type, placeholder, name, errors }) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-3 py-1.5 border rounded focus:border-violet-500 focus:outline-none"
        {...register(name, { required: `${name} is required field` })}
      />
      {errors?.[name] && (
        <p className="text-rose-500 text-xs">{errors[name].message}</p>
      )}
    </div>
  );
};

export default Input;
