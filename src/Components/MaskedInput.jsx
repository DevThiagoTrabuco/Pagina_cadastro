import { IMaskInput } from "react-imask";

export default function MaskedInput({
  id,
  name,
  label,
  placeholder,
  mask,
  value,
  onAccept,
  error,
  icon,
}) {
  const errorStyle = error ? "border-red-500" : "";

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className={`${icon} text-gray-400`}></i>
          </div>
        )}
        <IMaskInput
          mask={mask}
          lazy={false}
          id={id}
          name={name || id}
          type="text"
          placeholder={placeholder}
          value={value}
          onAccept={onAccept}
          className={`w-full py-2 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errorStyle} ${
            icon ? "pl-10" : "px-4"
          }`}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
