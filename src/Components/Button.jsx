export default function Button({ type = 'button', onClick, children }){
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-1/2 bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
    >
      {children}
    </button>
  );
};