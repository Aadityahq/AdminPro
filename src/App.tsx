import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppProvider } from './contexts/AppContext';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Tables from './pages/Tables';
import Calendar from './pages/Calendar';
import Kanban from './pages/Kanban';
import Users from './pages/Users';
import Messages from './pages/Messages';
import FileManager from './pages/FileManager';
import Notes from './pages/Notes';
import Todos from './pages/Todos';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="tables" element={<Tables />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="kanban" element={<Kanban />} />
              <Route path="users" element={<Users />} />
              <Route path="messages" element={<Messages />} />
              <Route path="files" element={<FileManager />} />
              <Route path="notes" element={<Notes />} />
              <Route path="todos" element={<Todos />} />
              <Route path="reports" element={<Reports />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;