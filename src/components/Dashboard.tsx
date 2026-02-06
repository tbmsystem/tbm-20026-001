import { useState, useEffect } from 'react';
import Footer from './Footer';
import TaskManager from './TaskManager';
import CalendarView from './CalendarView';
import './Dashboard.css';

interface DashboardProps {
    username: string;
    onLogout: () => void;
    theme: 'dark' | 'light';
    toggleTheme: () => void;
}

interface User {
    username: string;
    role: string;
    createdAt?: string;
}

type Tab = 'overview' | 'tasks' | 'calendar';

export default function Dashboard({ username, onLogout, theme, toggleTheme }: DashboardProps) {
    const [savedUsers, setSavedUsers] = useState<User[]>([]);
    const [activeTab, setActiveTab] = useState<Tab>('overview');

    useEffect(() => {
        const users = JSON.parse(localStorage.getItem('mock_users') || '[]');
        setSavedUsers(users);
    }, []);

    const clearUsers = () => {
        if (confirm('Sei sicuro di voler eliminare tutti gli utenti registrati?')) {
            localStorage.removeItem('mock_users');
            setSavedUsers([]);
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div className="header-content">
                    <h1 className="dashboard-title">Dashboard</h1>

                    {/* Navigation Tabs */}
                    <nav className="dashboard-tabs">
                        <button
                            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                            onClick={() => setActiveTab('overview')}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="tab-icon">
                                <path d="M3 3v18h18M18 17l-5-5-3 3-4-4" />
                            </svg>
                            <span>Overview</span>
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'tasks' ? 'active' : ''}`}
                            onClick={() => setActiveTab('tasks')}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="tab-icon">
                                <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                            </svg>
                            <span>Tasks</span>
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'calendar' ? 'active' : ''}`}
                            onClick={() => setActiveTab('calendar')}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="tab-icon">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            <span>Calendario</span>
                        </button>
                    </nav>

                    <div className="user-info">
                        <button
                            onClick={toggleTheme}
                            className="theme-toggle"
                            title={theme === 'dark' ? 'Passa alla modalità chiara' : 'Passa alla modalità scura'}
                        >
                            {theme === 'dark' ? (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                                </svg>
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                </svg>
                            )}
                        </button>
                        <div className="user-avatar">
                            {username.charAt(0).toUpperCase()}
                        </div>
                        <div className="user-details">
                            <span className="user-name">{username}</span>
                            <span className="user-status">Online</span>
                        </div>
                        <button onClick={onLogout} className="logout-button">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path
                                    d="M13 3H16C16.5304 3 17.0391 3.21071 17.4142 3.58579C17.7893 3.96086 18 4.46957 18 5V15C18 15.5304 17.7893 16.0391 17.4142 16.4142C17.0391 16.7893 16.5304 17 16 17H13M7 13L3 10M3 10L7 7M3 10H13"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="dashboard-content">
                {activeTab === 'overview' && (
                    <>
                        <div className="welcome-card">
                            <h2>Benvenuto, {username}!</h2>
                            <p>Hai effettuato l'accesso con successo alla tua area personale.</p>
                        </div>

                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-icon-mono">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M3 3v18h18M18 17l-5-5-3 3-4-4" />
                                    </svg>
                                </div>
                                <div className="stat-content">
                                    <h3>Performance</h3>
                                    <p className="stat-value">Ottima</p>
                                    <p className="stat-label">System Status</p>
                                </div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-icon-mono">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                </div>
                                <div className="stat-content">
                                    <h3>Team</h3>
                                    <p className="stat-value">{savedUsers.length}</p>
                                    <p className="stat-label">Utenti Locali</p>
                                </div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-icon-mono">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                                    </svg>
                                </div>
                                <div className="stat-content">
                                    <h3>Storage</h3>
                                    <p className="stat-value">Local</p>
                                    <p className="stat-label">Data Mode</p>
                                </div>
                            </div>
                        </div>

                        <div className="info-section">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h3>👥 Gestione Utenti (LocalStorage)</h3>
                                {savedUsers.length > 0 && (
                                    <button onClick={clearUsers} className="clear-button">Pulisci Database</button>
                                )}
                            </div>
                            {savedUsers.length > 0 ? (
                                <div className="users-table-wrapper">
                                    <table className="users-table">
                                        <thead>
                                            <tr>
                                                <th>Username</th>
                                                <th>Ruolo</th>
                                                <th>Data Registrazione</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {savedUsers.map((u, i) => (
                                                <tr key={i}>
                                                    <td>{u.username}</td>
                                                    <td><span className="role-badge">{u.role}</span></td>
                                                    <td>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="no-users">Nessun utente registrato manualmente ancora.</p>
                            )}
                        </div>
                    </>
                )}

                {activeTab === 'tasks' && (
                    <TaskManager username={username} />
                )}

                {activeTab === 'calendar' && (
                    <CalendarView username={username} />
                )}

                <Footer />
            </div>
        </div>
    );
}
