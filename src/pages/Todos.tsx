import React, { useState } from 'react';
import { Plus, Check, X, Clock, Flag } from 'lucide-react';
import Card from '../components/Common/Card';
import { useApp } from '../contexts/AppContext';
import { useTheme } from '../contexts/ThemeContext';
import { format } from 'date-fns';

const Todos: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask } = useApp();
  const { theme, colorScheme } = useTheme();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [filter, setFilter] = useState<'all' | 'todo' | 'in-progress' | 'done'>('all');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as const,
    assignee: 'John Doe',
    dueDate: new Date()
  });

  const getColorClasses = () => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      purple: 'from-purple-500 to-purple-600',
      green: 'from-green-500 to-green-600',
      orange: 'from-orange-500 to-orange-600',
      red: 'from-red-500 to-red-600',
      pink: 'from-pink-500 to-pink-600',
      indigo: 'from-indigo-500 to-indigo-600',
      teal: 'from-teal-500 to-teal-600'
    };
    return colors[colorScheme];
  };

  const filteredTasks = filter === 'all' ? tasks : tasks.filter(task => task.status === filter);

  const handleAddTask = () => {
    if (newTask.title) {
      addTask({
        ...newTask,
        status: 'todo'
      });
      setNewTask({
        title: '',
        description: '',
        priority: 'medium',
        assignee: 'John Doe',
        dueDate: new Date()
      });
      setShowTaskForm(false);
    }
  };

  const handleStatusChange = (taskId: string, newStatus: any) => {
    updateTask(taskId, { status: newStatus });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'todo': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Todo Manager</h1>
          <p className="text-gray-500">Organize and track your tasks efficiently</p>
        </div>
        
        <button
          onClick={() => setShowTaskForm(true)}
          className={`
            px-4 py-2 rounded-lg bg-gradient-to-r ${getColorClasses()} text-white
            hover:opacity-90 transition-all duration-200 hover:scale-105
            flex items-center gap-2
          `}
        >
          <Plus size={16} />
          Add Task
        </button>
      </div>

      {/* Task Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Tasks</p>
              <p className="text-2xl font-bold">{tasks.length}</p>
            </div>
            <div className={`p-3 rounded-lg bg-gradient-to-r ${getColorClasses()}`}>
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">To Do</p>
              <p className="text-2xl font-bold">
                {tasks.filter(t => t.status === 'todo').length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-r from-gray-500 to-gray-600">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">In Progress</p>
              <p className="text-2xl font-bold">
                {tasks.filter(t => t.status === 'in-progress').length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-2xl font-bold">
                {tasks.filter(t => t.status === 'done').length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600">
              <Check className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filter Tabs */}
      <Card className="p-4">
        <div className="flex gap-2">
          {[
            { key: 'all', label: 'All Tasks' },
            { key: 'todo', label: 'To Do' },
            { key: 'in-progress', label: 'In Progress' },
            { key: 'done', label: 'Completed' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${filter === tab.key 
                  ? `bg-gradient-to-r ${getColorClasses()} text-white` 
                  : `${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map(task => (
          <Card key={task.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-lg">{task.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    {task.status.replace('-', ' ')}
                  </span>
                  <Flag className={`w-4 h-4 ${getPriorityColor(task.priority)}`} />
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-3">{task.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Assigned to: {task.assignee}</span>
                  <span>Due: {format(task.dueDate, 'MMM dd, yyyy')}</span>
                  <span>Priority: {task.priority}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {task.status !== 'done' && (
                  <button
                    onClick={() => handleStatusChange(task.id, task.status === 'todo' ? 'in-progress' : 'done')}
                    className={`
                      p-2 rounded-lg transition-colors
                      ${task.status === 'todo' 
                        ? 'text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20' 
                        : 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'
                      }
                    `}
                  >
                    <Check size={16} />
                  </button>
                )}
                
                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </Card>
        ))}
        
        {filteredTasks.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-gray-500">No tasks found. Create your first task!</p>
          </Card>
        )}
      </div>

      {/* Add Task Modal */}
      {showTaskForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4 p-6">
            <h3 className="text-lg font-semibold mb-4">Add New Task</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Task Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className={`
                    w-full px-3 py-2 rounded-lg border transition-colors
                    ${theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                    }
                    focus:outline-none focus:ring-2 focus:ring-${colorScheme}-500
                  `}
                  placeholder="Enter task title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className={`
                    w-full px-3 py-2 rounded-lg border transition-colors resize-none
                    ${theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                    }
                    focus:outline-none focus:ring-2 focus:ring-${colorScheme}-500
                  `}
                  rows={3}
                  placeholder="Task description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                    className={`
                      w-full px-3 py-2 rounded-lg border transition-colors
                      ${theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                      }
                      focus:outline-none focus:ring-2 focus:ring-${colorScheme}-500
                    `}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Due Date</label>
                  <input
                    type="date"
                    value={newTask.dueDate.toISOString().split('T')[0]}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: new Date(e.target.value) })}
                    className={`
                      w-full px-3 py-2 rounded-lg border transition-colors
                      ${theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                      }
                      focus:outline-none focus:ring-2 focus:ring-${colorScheme}-500
                    `}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Assignee</label>
                <input
                  type="text"
                  value={newTask.assignee}
                  onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                  className={`
                    w-full px-3 py-2 rounded-lg border transition-colors
                    ${theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                    }
                    focus:outline-none focus:ring-2 focus:ring-${colorScheme}-500
                  `}
                  placeholder="Assign to..."
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={() => setShowTaskForm(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className={`
                  px-4 py-2 rounded-lg bg-gradient-to-r ${getColorClasses()} text-white
                  hover:opacity-90 transition-all duration-200 hover:scale-105
                `}
              >
                Add Task
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Todos;