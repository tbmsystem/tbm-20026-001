import './Dashboard.css';

interface DashboardProps {
    username: string;
    onLogout: () => void;
}

export default function Dashboard({ username, onLogout }: DashboardProps) {
    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div className="header-content">
                    <h1 className="dashboard-title">Dashboard</h1>
                    <div className="user-info">
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
                <div className="welcome-card">
                    <div className="welcome-icon">👋</div>
                    <h2>Benvenuto, {username}!</h2>
                    <p>Hai effettuato l'accesso con successo.</p>
                </div>

                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                            📊
                        </div>
                        <div className="stat-content">
                            <h3>Dashboard</h3>
                            <p className="stat-value">Active</p>
                            <p className="stat-label">Status</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                            🔐
                        </div>
                        <div className="stat-content">
                            <h3>Security</h3>
                            <p className="stat-value">Verified</p>
                            <p className="stat-label">Authentication</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                            ⚡
                        </div>
                        <div className="stat-content">
                            <h3>Performance</h3>
                            <p className="stat-value">Excellent</p>
                            <p className="stat-label">System Status</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
                            ✨
                        </div>
                        <div className="stat-content">
                            <h3>Experience</h3>
                            <p className="stat-value">Premium</p>
                            <p className="stat-label">User Level</p>
                        </div>
                    </div>
                </div>

                <div className="info-section">
                    <h3>🎯 Informazioni App</h3>
                    <div className="info-content">
                        <p>Questa è una demo di login con autenticazione mock.</p>
                        <p>L'applicazione utilizza React + TypeScript + Vite.</p>
                        <p>Il design è moderno con effetti glassmorphism e animazioni fluide.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
