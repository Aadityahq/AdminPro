import React from 'react';
import DataTable from '../components/Common/DataTable';
import { useApp } from '../contexts/AppContext';
import { format } from 'date-fns';

const Tables: React.FC = () => {
  const { users, tasks } = useApp();

  const userColumns = [
    { key: 'avatar', label: 'Avatar', render: (value: string) => (
      <img src={value} alt="User" className="w-8 h-8 rounded-full" />
    )},
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      render: (value: string) => (
        <span className={`
          px-2 py-1 rounded-full text-xs font-medium
          ${value === 'active' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }
        `}>
          {value}
        </span>
      )
    },
    { 
      key: 'lastLogin', 
      label: 'Last Login', 
      sortable: true,
      render: (value: Date) => format(value, 'MMM dd, yyyy')
    }
  ];

  const taskColumns = [
    { key: 'title', label: 'Title', sortable: true },
    { key: 'assignee', label: 'Assignee', sortable: true },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      render: (value: string) => (
        <span className={`
          px-2 py-1 rounded-full text-xs font-medium
          ${value === 'done' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
            : value === 'in-progress'
            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
          }
        `}>
          {value.replace('-', ' ')}
        </span>
      )
    },
    { 
      key: 'priority', 
      label: 'Priority', 
      sortable: true,
      render: (value: string) => (
        <span className={`
          px-2 py-1 rounded-full text-xs font-medium
          ${value === 'high' 
            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
            : value === 'medium'
            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
          }
        `}>
          {value}
        </span>
      )
    },
    { 
      key: 'dueDate', 
      label: 'Due Date', 
      sortable: true,
      render: (value: Date) => format(value, 'MMM dd, yyyy')
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Data Tables</h1>
        <p className="text-gray-500">Manage and view your data with interactive tables</p>
      </div>

      <DataTable
        data={users}
        columns={userColumns}
        title="Users Management"
        searchable
      />

      <DataTable
        data={tasks}
        columns={taskColumns}
        title="Tasks Overview"
        searchable
      />
    </div>
  );
};

export default Tables;