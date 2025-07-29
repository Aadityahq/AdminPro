import { User, Task, Event, Note } from '../types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data generators
const generateUsers = (): User[] => [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    status: 'active',
    lastLogin: new Date('2024-01-15T10:30:00')
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Manager',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    status: 'active',
    lastLogin: new Date('2024-01-15T14:20:00')
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'Developer',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    status: 'inactive',
    lastLogin: new Date('2024-01-14T09:15:00')
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    role: 'Designer',
    avatar: 'https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    status: 'active',
    lastLogin: new Date('2024-01-15T16:45:00')
  }
];

const generateTasks = (): Task[] => [
  {
    id: '1',
    title: 'Design new landing page',
    description: 'Create wireframes and mockups for the new landing page',
    status: 'in-progress',
    priority: 'high',
    assignee: 'Sarah Wilson',
    dueDate: new Date('2024-01-20'),
    createdAt: new Date('2024-01-10')
  },
  {
    id: '2',
    title: 'Implement user authentication',
    description: 'Add login and registration functionality',
    status: 'todo',
    priority: 'medium',
    assignee: 'Mike Johnson',
    dueDate: new Date('2024-01-25'),
    createdAt: new Date('2024-01-12')
  },
  {
    id: '3',
    title: 'Database optimization',
    description: 'Optimize database queries for better performance',
    status: 'done',
    priority: 'low',
    assignee: 'John Doe',
    dueDate: new Date('2024-01-15'),
    createdAt: new Date('2024-01-08')
  },
  {
    id: '4',
    title: 'Mobile app testing',
    description: 'Test mobile app across different devices',
    status: 'todo',
    priority: 'high',
    assignee: 'Jane Smith',
    dueDate: new Date('2024-01-22'),
    createdAt: new Date('2024-01-13')
  }
];

const generateEvents = (): Event[] => [
  {
    id: '1',
    title: 'Team Standup',
    description: 'Daily team synchronization meeting',
    date: new Date('2024-01-16'),
    startTime: '09:00',
    endTime: '09:30',
    type: 'meeting',
    color: '#3B82F6'
  },
  {
    id: '2',
    title: 'Project Review',
    description: 'Monthly project progress review',
    date: new Date('2024-01-18'),
    startTime: '14:00',
    endTime: '15:30',
    type: 'meeting',
    color: '#10B981'
  },
  {
    id: '3',
    title: 'Client Presentation',
    description: 'Present new features to client',
    date: new Date('2024-01-20'),
    startTime: '10:00',
    endTime: '11:00',
    type: 'event',
    color: '#F59E0B'
  },
  {
    id: '4',
    title: 'Code Review',
    description: 'Review latest code changes',
    date: new Date('2024-01-17'),
    startTime: '16:00',
    endTime: '17:00',
    type: 'task',
    color: '#8B5CF6'
  }
];

const generateNotes = (): Note[] => [
  {
    id: '1',
    title: 'Meeting Notes - Q1 Planning',
    content: 'Discussed roadmap for Q1. Key priorities: user experience improvements, performance optimization, and new feature rollouts.',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    tags: ['meeting', 'planning', 'q1']
  },
  {
    id: '2',
    title: 'Technical Debt Items',
    content: 'List of technical debt items to address: refactor authentication module, update dependencies, improve test coverage.',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-14'),
    tags: ['technical', 'debt', 'development']
  },
  {
    id: '3',
    title: 'Client Feedback',
    content: 'Client loves the new dashboard design. Requested minor changes to color scheme and additional reporting features.',
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-13'),
    tags: ['client', 'feedback', 'design']
  }
];

export const mockApi = {
  async getUsers(): Promise<User[]> {
    await delay(500);
    return generateUsers();
  },

  async getTasks(): Promise<Task[]> {
    await delay(300);
    return generateTasks();
  },

  async getEvents(): Promise<Event[]> {
    await delay(400);
    return generateEvents();
  },

  async getNotes(): Promise<Note[]> {
    await delay(200);
    return generateNotes();
  },

  async getAnalytics() {
    await delay(600);
    return {
      revenue: [
        { name: 'Jan', value: 4000 },
        { name: 'Feb', value: 3000 },
        { name: 'Mar', value: 5000 },
        { name: 'Apr', value: 4500 },
        { name: 'May', value: 6000 },
        { name: 'Jun', value: 5500 }
      ],
      users: [
        { name: 'New Users', value: 1200 },
        { name: 'Returning Users', value: 3400 },
        { name: 'Inactive Users', value: 800 }
      ],
      performance: [
        { name: 'Page Load Time', value: 2.3 },
        { name: 'API Response Time', value: 150 },
        { name: 'Database Query Time', value: 45 }
      ]
    };
  }
};