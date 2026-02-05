import { useState, type FormEvent } from 'react';
import './Register.css';

interface RegisterProps {
    onBackToLogin: () => void;
    onRegisterSuccess: () => void;
}

export default function Register({ onBackToLogin, onRegisterSuccess }: RegisterProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('User');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Le password non coincidono');
            return;
        }

        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Recupera utenti esistenti dal localStorage
        const savedUsers = JSON.parse(localStorage.getItem('mock_users') || '[]');

        // Controlla se l'utente esiste già
        const userExists = savedUsers.some((u: any) => u.username === username);
        if (userExists || username === 'admin' || username === 'user' || username === 'demo') {
            setError('Username già esistente');
            setIsLoading(false);
            return;
        }

        // Aggiungi nuovo utente
        const newUser = { username, password, role, createdAt: new Date().toISOString() };
        savedUsers.push(newUser);
        localStorage.setItem('mock_users', JSON.stringify(savedUsers));

        setIsLoading(false);
        onRegisterSuccess();
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">Registrazione</h1>
                <p className="login-subtitle">Crea un nuovo account locale</p>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <label className="input-label">Username</label>
                        <input
                            type="text"
                            className="input-field"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Scegli un username"
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Ruolo</label>
                        <select
                            className="input-field select-field"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="User">User</option>
                            <option value="Editor">Editor</option>
                            <option value="Guest">Guest</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Password</label>
                        <input
                            type="password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Inserisci password"
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Conferma Password</label>
                        <input
                            type="password"
                            className="input-field"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder="Ripeti password"
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="submit-button" disabled={isLoading}>
                        {isLoading ? 'Registrazione...' : 'Crea Account'}
                    </button>

                    <button type="button" className="back-button" onClick={onBackToLogin}>
                        Hai già un account? Accedi
                    </button>
                </form>
            </div>
        </div>
    );
}
