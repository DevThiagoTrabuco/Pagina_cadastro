export default function Card({ data, onEdit, onDelete }) {
  if (!data) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out flex flex-col justify-between">
      <h3
        className="text-xl font-bold text-gray-800 mb-4 truncate"
        title={data.nome}
      >
        {data.nome} {data.sobrenome}
      </h3>
      <div className="space-y-2 text-sm text-gray-600">
        <p className="truncate">
          <i className="fas fa-envelope mr-2 text-gray-400"></i>
          {data.email}
        </p>
        <p>
          <i className="fas fa-user-tag mr-2 text-gray-400"></i>
          {data.tipoPessoa}
        </p>
        <p>
          <i className="fas fa-id-card mr-2 text-gray-400"></i>
          {data.documento}
        </p>
        <p>
          <i className="fas fa-phone mr-2 text-gray-400"></i>
          {data.telefone}
        </p>
      </div>
      <div className="flex justify-end space-x-3 mt-4 pt-4 border-t border-gray-200">
        <button
          onClick={onEdit}
          className="text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
        >
          <i className="fas fa-pencil-alt mr-1"></i>Editar
        </button>
        <button
          onClick={onDelete}
          className="text-sm text-red-600 hover:text-red-800 font-semibold transition-colors duration-200"
        >
          <i className="fas fa-trash-alt mr-1"></i>Excluir
        </button>
      </div>
    </div>
  );
}
