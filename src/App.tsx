import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [view, setView] = useState<'login' | 'register' | 'dashboard'>('login');
  const [username, setUsername] = useState('');

  const handleLoginSuccess = (user: string) => {
    setUsername(user);
    setView('dashboard');
  };

  const handleLogout = () => {
    setView('login');
    setUsername('');
  };

  const handleRegisterSuccess = () => {
    setView('login');
    // Potresti anche mostrare un messaggio di successo
  };

  return (
    <>
      {view === 'login' && (
        <Login
          onLoginSuccess={handleLoginSuccess}
          onShowRegister={() => setView('register')}
        />
      )}
      {view === 'register' && (
        <Register
          onBackToLogin={() => setView('login')}
          onRegisterSuccess={handleRegisterSuccess}
        />
      )}
      {view === 'dashboard' && (
        <Dashboard username={username} onLogout={handleLogout} />
      )}
    </>
  );
}

export default App;
