import React, { useState } from 'react';
import Login from './pages/Login';
import Permissions from './pages/Permissions';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import './index.css';

function App() {
  const [screen, setScreen] = useState('login');

  return (
    <div>
      {screen === 'login' && <Login onLogin={() => setScreen('permissions')} />}
      {screen === 'permissions' && <Permissions onComplete={() => setScreen('profile')} />}
      {screen === 'profile' && <Profile onComplete={() => setScreen('dashboard')} />}
      {screen === 'dashboard' && <Dashboard />}
    </div>
  );
}

export default App;