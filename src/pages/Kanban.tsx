import React, { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Plus, MoreHorizontal, Calendar, User } from 'lucide-react';
import Card from '../components/Common/Card';
import { useApp } from '../contexts/AppContext';
import { useTheme } from '../contexts/ThemeContext';
import { Task } from '../types';
import { format } from 'date-fns';

const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
  const { theme } = useTheme();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        p-4 rounded-lg border cursor-grab active:cursor-grabbing transition-all duration-200
        ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
        hover:shadow-md
      `}
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-medium text-sm flex-1">{task.title}</h4>
        <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          <MoreHorizontal size={14} />
        </button>
      </div>
      
      <p className="text-xs text-gray-500 mb-3 line-clamp-2">{task.description}</p>
      
      <div className="flex items-center justify-between">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </span>
        
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span>{format(task.dueDate, 'MMM dd')}</span>
          </div>
          <div className="flex items-center gap-1">
            <User size={12} />
            <span>{task.assignee.split(' ')[0]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const KanbanColumn: React.FC<{
  title: string;
  tasks: Task[];
  status: string;
  color: string;
}> = ({ title, tasks, status, color }) => {
  const { theme } = useTheme();

  return (
    <div className={`
      flex-1 min-w-80 rounded-lg border
      ${theme === 'dark' ? 'bg-gray-800/30 border-gray-700' : 'bg-gray-50 border-gray-200'}
    `}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${color}`} />
            <h3 className="font-semibold">{title}</h3>
            <span className="text-sm text-gray-500">({tasks.length})</span>
          </div>
          <button className={`
            p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
          `}>
            <Plus size={16} />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {tasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </SortableContext>
        
        {tasks.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No tasks in this column</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Kanban: React.FC = () => {
  const { tasks, updateTask } = useApp();
  const { colorScheme } = useTheme();
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-400' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-400' },
    { id: 'done', title: 'Done', color: 'bg-green-400' },
  ];

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeTask = tasks.find(task => task.id === active.id);
    if (!activeTask) return;

    // Determine the new status based on the drop target
    let newStatus = activeTask.status;
    
    // Check if dropped on a column
    const overColumn = columns.find(col => over.id === col.id);
    if (overColumn) {
      newStatus = overColumn.id as any;
    } else {
      // Check if dropped on another task
      const overTask = tasks.find(task => task.id === over.id);
      if (overTask) {
        newStatus = overTask.status;
      }
    }

    if (newStatus !== activeTask.status) {
      updateTask(activeTask.id, { status: newStatus as any });
    }

    setActiveId(null);
  };

  const activeTask = activeId ? tasks.find(task => task.id === activeId) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Kanban Board</h1>
          <p className="text-gray-500">Manage your tasks with drag and drop</p>
        </div>
        
        <button className={`
          px-4 py-2 rounded-lg bg-gradient-to-r 
          ${colorScheme === 'blue' ? 'from-blue-500 to-blue-600' : 
            colorScheme === 'purple' ? 'from-purple-500 to-purple-600' :
            colorScheme === 'green' ? 'from-green-500 to-green-600' :
            colorScheme === 'orange' ? 'from-orange-500 to-orange-600' :
            colorScheme === 'red' ? 'from-red-500 to-red-600' :
            colorScheme === 'pink' ? 'from-pink-500 to-pink-600' :
            colorScheme === 'indigo' ? 'from-indigo-500 to-indigo-600' :
            'from-teal-500 to-teal-600'
          }
          text-white hover:opacity-90 transition-all duration-200 hover:scale-105
          flex items-center gap-2
        `}>
          <Plus size={16} />
          Add Task
        </button>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-6 overflow-x-auto pb-4">
          {columns.map(column => (
            <SortableContext
              key={column.id}
              items={getTasksByStatus(column.id).map(task => task.id)}
              strategy={verticalListSortingStrategy}
            >
              <KanbanColumn
                title={column.title}
                tasks={getTasksByStatus(column.id)}
                status={column.id}
                color={column.color}
              />
            </SortableContext>
          ))}
        </div>

        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Kanban;