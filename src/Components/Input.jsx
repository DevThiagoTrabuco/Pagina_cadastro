export default function Input({ id, label, error, icon, ...props }) {
  const errorStyle = error ? "border-red-500" : "";
  const iconPadding = icon ? "pl-10" : "px-4";

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
        <input
          id={id}
          className={`w-full py-2 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errorStyle} ${iconPadding}`}
          {...props}
          maxLength={props.length}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
