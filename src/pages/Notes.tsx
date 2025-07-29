import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Tag } from 'lucide-react';
import Card from '../components/Common/Card';
import { useApp } from '../contexts/AppContext';
import { useTheme } from '../contexts/ThemeContext';
import { format } from 'date-fns';

const Notes: React.FC = () => {
  const { notes, addNote, updateNote, deleteNote } = useApp();
  const { theme, colorScheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    tags: [] as string[]
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

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSaveNote = () => {
    if (newNote.title && newNote.content) {
      if (editingNote) {
        updateNote(editingNote, newNote);
        setEditingNote(null);
      } else {
        addNote(newNote);
      }
      setNewNote({ title: '', content: '', tags: [] });
      setShowNoteForm(false);
    }
  };

  const handleEditNote = (note: any) => {
    setNewNote({
      title: note.title,
      content: note.content,
      tags: note.tags
    });
    setEditingNote(note.id);
    setShowNoteForm(true);
  };

  const handleDeleteNote = (id: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      deleteNote(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Notes</h1>
          <p className="text-gray-500">Keep track of your thoughts and ideas</p>
        </div>
        
        <button
          onClick={() => setShowNoteForm(true)}
          className={`
            px-4 py-2 rounded-lg bg-gradient-to-r ${getColorClasses()} text-white
            hover:opacity-90 transition-all duration-200 hover:scale-105
            flex items-center gap-2
          `}
        >
          <Plus size={16} />
          New Note
        </button>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`
              w-full pl-10 pr-4 py-2 rounded-lg border transition-colors
              ${theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
              }
              focus:outline-none focus:ring-2 focus:ring-${colorScheme}-500 focus:border-transparent
            `}
          />
        </div>
      </Card>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map(note => (
          <Card key={note.id} className="p-6 hover:shadow-lg transition-all duration-200">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-lg line-clamp-2">{note.title}</h3>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleEditNote(note)}
                  className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
              {note.content}
            </p>
            
            {note.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {note.tags.map(tag => (
                  <span
                    key={tag}
                    className={`
                      px-2 py-1 rounded-full text-xs font-medium
                      ${theme === 'dark' 
                        ? 'bg-gray-700 text-gray-300' 
                        : 'bg-gray-100 text-gray-700'
                      }
                    `}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            
            <div className="text-xs text-gray-500">
              <p>Created: {format(note.createdAt, 'MMM dd, yyyy')}</p>
              {note.updatedAt.getTime() !== note.createdAt.getTime() && (
                <p>Updated: {format(note.updatedAt, 'MMM dd, yyyy')}</p>
              )}
            </div>
          </Card>
        ))}
        
        {filteredNotes.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No notes found. Create your first note!</p>
          </div>
        )}
      </div>

      {/* Note Form Modal */}
      {showNoteForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl mx-4 p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {editingNote ? 'Edit Note' : 'Create New Note'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  className={`
                    w-full px-3 py-2 rounded-lg border transition-colors
                    ${theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                    }
                    focus:outline-none focus:ring-2 focus:ring-${colorScheme}-500
                  `}
                  placeholder="Enter note title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Content</label>
                <textarea
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  className={`
                    w-full px-3 py-2 rounded-lg border transition-colors resize-none
                    ${theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                    }
                    focus:outline-none focus:ring-2 focus:ring-${colorScheme}-500
                  `}
                  rows={8}
                  placeholder="Write your note content here..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tags</label>
                <input
                  type="text"
                  placeholder="Enter tags separated by commas"
                  onChange={(e) => {
                    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
                    setNewNote({ ...newNote, tags });
                  }}
                  className={`
                    w-full px-3 py-2 rounded-lg border transition-colors
                    ${theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                    }
                    focus:outline-none focus:ring-2 focus:ring-${colorScheme}-500
                  `}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate tags with commas (e.g., work, important, ideas)
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowNoteForm(false);
                  setEditingNote(null);
                  setNewNote({ title: '', content: '', tags: [] });
                }}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNote}
                className={`
                  px-4 py-2 rounded-lg bg-gradient-to-r ${getColorClasses()} text-white
                  hover:opacity-90 transition-all duration-200 hover:scale-105
                `}
              >
                {editingNote ? 'Update Note' : 'Save Note'}
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Notes;