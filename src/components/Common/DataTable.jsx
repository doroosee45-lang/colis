import React, { useState } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

const DataTable = ({
  columns = [],
  data,
  onRowClick,
  onSort,
  onSearch,
  pagination = true,
  pageSize = 10,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig]   = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm]   = useState('');

  // ✅ PROTECTION — toujours un tableau, jamais de crash
  const safeData = Array.isArray(data) ? data : [];

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
    if (onSort) onSort(key, direction);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
    if (onSearch) onSearch(value);
  };

  const totalPages  = Math.ceil(safeData.length / pageSize);
  const startIndex  = (currentPage - 1) * pageSize;
  const endIndex    = startIndex + pageSize;
  const currentData = pagination ? safeData.slice(startIndex, endIndex) : safeData;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">

      {onSearch && (
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-sky-400
                       focus:border-transparent text-sm"
            />
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th key={column.key} scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {column.sortable ? (
                    <button onClick={() => handleSort(column.key)}
                      className="flex items-center gap-1 hover:text-gray-700">
                      <span>{column.label}</span>
                      {sortConfig.key === column.key && (
                        sortConfig.direction === 'asc'
                          ? <ChevronUpIcon className="w-3 h-3" />
                          : <ChevronDownIcon className="w-3 h-3" />
                      )}
                    </button>
                  ) : column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {currentData.length > 0 ? (
              currentData.map((row, index) => (
                <tr key={row._id || row.id || index}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={`transition-colors ${onRowClick ? 'cursor-pointer hover:bg-gray-50' : 'hover:bg-gray-50/50'}`}>
                  {columns.map((column) => (
                    <td key={column.key}
                      className="px-6 py-3.5 whitespace-nowrap text-sm text-gray-800">
                      {column.render
                        ? column.render(row[column.key], row)
                        : (row[column.key] ?? '-')}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length}
                  className="px-6 py-12 text-center text-sm text-gray-400">
                  Aucune donnée disponible
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pagination && totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {startIndex + 1}–{Math.min(endIndex, safeData.length)} sur {safeData.length} résultats
          </p>
          <div className="flex items-center gap-2">
            <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-gray-200 disabled:opacity-40
                       disabled:cursor-not-allowed hover:bg-gray-50 transition-colors">
              <ChevronLeftIcon className="w-4 h-4" />
            </button>
            <span className="text-sm text-gray-600 px-1">{currentPage} / {totalPages}</span>
            <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-gray-200 disabled:opacity-40
                       disabled:cursor-not-allowed hover:bg-gray-50 transition-colors">
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;