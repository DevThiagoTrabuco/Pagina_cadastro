import React, { useState, forwardRef } from "react";

const Input = forwardRef(
  ({ id, label, type, icon, placeholder, length, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPasswordField = type === "password";
    const currentType = isPasswordField
      ? showPassword
        ? "text"
        : "password"
      : type;

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className="flex-1">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className={`${icon} text-gray-400`}></i>
          </div>
          <input
            id={id}
            type={currentType}
            placeholder={placeholder}
            maxLength={length}
            ref={ref}
            {...props}
            className={`block w-full pl-10 pr-10 py-2 border ${
              error ? "border-red-500" : "border-gray-300"
            } rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
          />
          {isPasswordField && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
              >
                <i
                  className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                ></i>
              </button>
            </div>
          )}
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
