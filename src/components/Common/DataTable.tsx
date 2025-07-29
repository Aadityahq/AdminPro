import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, Search, Filter } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import Card from './Card';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  searchable?: boolean;
  title?: string;
}

const DataTable: React.FC<DataTableProps> = ({ data, columns, searchable = true, title }) => {
  const { theme, colorScheme } = useTheme();
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getColorClasses = () => {
    const colors = {
      blue: 'text-blue-500 hover:text-blue-600',
      purple: 'text-purple-500 hover:text-purple-600',
      green: 'text-green-500 hover:text-green-600',
      orange: 'text-orange-500 hover:text-orange-600',
      red: 'text-red-500 hover:text-red-600',
      pink: 'text-pink-500 hover:text-pink-600',
      indigo: 'text-indigo-500 hover:text-indigo-600',
      teal: 'text-teal-500 hover:text-teal-600'
    };
    return colors[colorScheme];
  };

  const sortedAndFilteredData = useMemo(() => {
    let filteredData = data;

    // Filter by search term
    if (searchTerm) {
      filteredData = data.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Sort data
    if (sortConfig) {
      filteredData = [...filteredData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredData;
  }, [data, sortConfig, searchTerm]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedAndFilteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedAndFilteredData, currentPage]);

  const totalPages = Math.ceil(sortedAndFilteredData.length / itemsPerPage);

  const handleSort = (key: string) => {
    setSortConfig(prevSort => {
      if (prevSort?.key === key) {
        return {
          key,
          direction: prevSort.direction === 'asc' ? 'desc' : 'asc'
        };
      }
      return { key, direction: 'asc' };
    });
  };

  return (
    <Card className="w-full">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          
          {searchable && (
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`
                  pl-10 pr-4 py-2 w-full rounded-lg border transition-colors
                  ${theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }
                  focus:outline-none focus:ring-2 focus:ring-${colorScheme}-500 focus:border-transparent
                `}
              />
            </div>
          )}
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <div className="min-w-full">
          <table className="w-full">
            <thead className={`
              ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}
              border-b border-gray-200 dark:border-gray-700
            `}>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`
                      px-4 sm:px-6 py-4 text-left text-xs font-medium uppercase tracking-wider
                      ${column.sortable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600' : ''}
                      whitespace-nowrap
                    `}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center gap-2">
                      {column.label}
                      {column.sortable && sortConfig?.key === column.key && (
                        <div className={getColorClasses()}>
                          {sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedData.map((row, index) => (
                <tr 
                  key={index}
                  className={`
                    transition-colors
                    ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}
                  `}
                >
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 sm:px-6 py-4 text-sm">
                      <div className="max-w-xs truncate">
                        {column.render ? column.render(row[column.key], row) : row[column.key]}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-4 sm:px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm text-gray-500">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedAndFilteredData.length)} of {sortedAndFilteredData.length} results
            </div>
            <div className="flex items-center gap-2 overflow-x-auto">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`
                  px-3 py-1 rounded text-sm transition-colors whitespace-nowrap
                  ${currentPage === 1 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : `${getColorClasses()} hover:bg-gray-100 dark:hover:bg-gray-700`
                  }
                `}
              >
                Previous
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`
                        px-3 py-1 rounded text-sm transition-colors
                        ${pageNum === currentPage 
                          ? `bg-${colorScheme}-500 text-white` 
                          : `${getColorClasses()} hover:bg-gray-100 dark:hover:bg-gray-700`
                        }
                      `}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`
                  px-3 py-1 rounded text-sm transition-colors whitespace-nowrap
                  ${currentPage === totalPages 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : `${getColorClasses()} hover:bg-gray-100 dark:hover:bg-gray-700`
                  }
                `}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default DataTable;