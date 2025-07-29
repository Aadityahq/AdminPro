import React, { useState } from 'react';
import { 
  Folder, 
  File, 
  Upload, 
  Download, 
  Trash2, 
  Edit2, 
  Search,
  Grid,
  List,
  Plus,
  MoreVertical,
  Image,
  FileText,
  Archive
} from 'lucide-react';
import Card from '../components/Common/Card';
import { useTheme } from '../contexts/ThemeContext';
import { format } from 'date-fns';

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  size?: number;
  modified: Date;
  icon: React.ComponentType<any>;
  color: string;
}

const FileManager: React.FC = () => {
  const { theme, colorScheme } = useTheme();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPath, setCurrentPath] = useState(['Home']);

  const files: FileItem[] = [
    {
      id: '1',
      name: 'Documents',
      type: 'folder',
      modified: new Date('2024-01-15T10:30:00'),
      icon: Folder,
      color: 'text-blue-500'
    },
    {
      id: '2',
      name: 'Images',
      type: 'folder',
      modified: new Date('2024-01-14T15:20:00'),
      icon: Folder,
      color: 'text-green-500'
    },
    {
      id: '3',
      name: 'Reports',
      type: 'folder',
      modified: new Date('2024-01-13T09:45:00'),
      icon: Folder,
      color: 'text-purple-500'
    },
    {
      id: '4',
      name: 'dashboard-report.pdf',
      type: 'file',
      size: 2048000,
      modified: new Date('2024-01-15T14:30:00'),
      icon: FileText,
      color: 'text-red-500'
    },
    {
      id: '5',
      name: 'user-analytics.xlsx',
      type: 'file',
      size: 1024000,
      modified: new Date('2024-01-15T11:15:00'),
      icon: FileText,
      color: 'text-green-600'
    },
    {
      id: '6',
      name: 'logo-design.png',
      type: 'file',
      size: 512000,
      modified: new Date('2024-01-14T16:45:00'),
      icon: Image,
      color: 'text-pink-500'
    },
    {
      id: '7',
      name: 'backup-2024.zip',
      type: 'file',
      size: 10485760,
      modified: new Date('2024-01-12T08:30:00'),
      icon: Archive,
      color: 'text-orange-500'
    }
  ];

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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileAction = (action: string, file: FileItem) => {
    switch (action) {
      case 'open':
        if (file.type === 'folder') {
          setCurrentPath([...currentPath, file.name]);
        } else {
          alert(`Opening ${file.name}`);
        }
        break;
      case 'download':
        alert(`Downloading ${file.name}`);
        break;
      case 'delete':
        if (confirm(`Are you sure you want to delete ${file.name}?`)) {
          alert(`Deleted ${file.name}`);
        }
        break;
      case 'rename':
        const newName = prompt('Enter new name:', file.name);
        if (newName) {
          alert(`Renamed to ${newName}`);
        }
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">File Manager</h1>
          <p className="text-gray-500">Organize and manage your files</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => alert('Upload functionality would be implemented')}
            className={`
              px-4 py-2 rounded-lg bg-gradient-to-r ${getColorClasses()} text-white
              hover:opacity-90 transition-all duration-200 hover:scale-105
              flex items-center gap-2
            `}
          >
            <Upload size={16} />
            Upload
          </button>
          
          <button
            onClick={() => alert('Create new folder')}
            className={`
              px-4 py-2 rounded-lg border transition-colors
              ${theme === 'dark' 
                ? 'border-gray-700 hover:bg-gray-800' 
                : 'border-gray-300 hover:bg-gray-50'
              }
              flex items-center gap-2
            `}
          >
            <Plus size={16} />
            New Folder
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2">
            {currentPath.map((path, index) => (
              <React.Fragment key={index}>
                <button
                  onClick={() => setCurrentPath(currentPath.slice(0, index + 1))}
                  className="text-sm hover:text-blue-600 transition-colors"
                >
                  {path}
                </button>
                {index < currentPath.length - 1 && (
                  <span className="text-gray-400">/</span>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`
                  pl-9 pr-3 py-2 w-64 rounded-lg border transition-colors
                  ${theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }
                  focus:outline-none focus:ring-2 focus:ring-${colorScheme}-500 focus:border-transparent
                `}
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-gray-100 dark:bg-gray-700">
              <button
                onClick={() => setViewMode('grid')}
                className={`
                  p-2 rounded transition-colors
                  ${viewMode === 'grid' 
                    ? `bg-gradient-to-r ${getColorClasses()} text-white` 
                    : 'hover:bg-gray-200 dark:hover:bg-gray-600'
                  }
                `}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`
                  p-2 rounded transition-colors
                  ${viewMode === 'list' 
                    ? `bg-gradient-to-r ${getColorClasses()} text-white` 
                    : 'hover:bg-gray-200 dark:hover:bg-gray-600'
                  }
                `}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* File Grid/List */}
      <Card className="p-6">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredFiles.map(file => (
              <div
                key={file.id}
                className="group relative p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 cursor-pointer"
                onDoubleClick={() => handleFileAction('open', file)}
              >
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="relative">
                    <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>

                <div className="text-center">
                  <file.icon className={`w-12 h-12 mx-auto mb-2 ${file.color}`} />
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {file.type === 'file' && file.size ? formatFileSize(file.size) : 'Folder'}
                  </p>
                  <p className="text-xs text-gray-400">
                    {format(file.modified, 'MMM dd, yyyy')}
                  </p>
                </div>

                {/* Quick Actions */}
                <div className="absolute inset-x-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFileAction('download', file);
                      }}
                      className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      title="Download"
                    >
                      <Download size={14} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFileAction('rename', file);
                      }}
                      className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      title="Rename"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFileAction('delete', file);
                      }}
                      className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            <div className="grid grid-cols-12 gap-4 p-3 text-sm font-medium text-gray-500 border-b border-gray-200 dark:border-gray-700">
              <div className="col-span-6">Name</div>
              <div className="col-span-2">Size</div>
              <div className="col-span-3">Modified</div>
              <div className="col-span-1">Actions</div>
            </div>
            
            {filteredFiles.map(file => (
              <div
                key={file.id}
                className="grid grid-cols-12 gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                onDoubleClick={() => handleFileAction('open', file)}
              >
                <div className="col-span-6 flex items-center gap-3">
                  <file.icon className={`w-5 h-5 ${file.color}`} />
                  <span className="font-medium">{file.name}</span>
                </div>
                <div className="col-span-2 text-sm text-gray-500">
                  {file.type === 'file' && file.size ? formatFileSize(file.size) : '--'}
                </div>
                <div className="col-span-3 text-sm text-gray-500">
                  {format(file.modified, 'MMM dd, yyyy HH:mm')}
                </div>
                <div className="col-span-1">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFileAction('download', file);
                      }}
                      className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      title="Download"
                    >
                      <Download size={14} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFileAction('delete', file);
                      }}
                      className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredFiles.length === 0 && (
          <div className="text-center py-12">
            <File className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">No files found</p>
          </div>
        )}
      </Card>

      {/* Storage Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h4 className="font-semibold mb-4">Storage Usage</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Used</span>
              <span className="font-bold">2.4 GB</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className={`h-2 rounded-full bg-gradient-to-r ${getColorClasses()}`}
                style={{ width: '48%' }}
              />
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>2.4 GB of 5 GB used</span>
              <span>52% free</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="font-semibold mb-4">Recent Files</h4>
          <div className="space-y-3">
            {files.slice(0, 3).map(file => (
              <div key={file.id} className="flex items-center gap-3">
                <file.icon className={`w-4 h-4 ${file.color}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {format(file.modified, 'MMM dd')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="font-semibold mb-4">File Types</h4>
          <div className="space-y-3">
            {[
              { type: 'Documents', count: 24, color: 'bg-blue-500' },
              { type: 'Images', count: 18, color: 'bg-green-500' },
              { type: 'Archives', count: 6, color: 'bg-orange-500' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="text-sm">{item.type}</span>
                </div>
                <span className="text-sm font-medium">{item.count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FileManager;