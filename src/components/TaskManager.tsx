import { useState, useEffect } from 'react';
import './TaskManager.css';

interface Task {
    id: string;
    title: string;
    date: string;
    category: 'Lavoro' | 'Personale' | 'Urgente';
    completed: boolean;
    username: string;
}

interface TaskManagerProps {
    username: string;
}

export default function TaskManager({ username }: TaskManagerProps) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [category, setCategory] = useState<'Lavoro' | 'Personale' | 'Urgente'>('Lavoro');
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('user_tasks') || '[]');
        setTasks(savedTasks.filter((t: Task) => t.username === username));
    }, [username]);

    const saveToLocal = (allTasks: Task[]) => {
        localStorage.setItem('user_tasks', JSON.stringify(allTasks));
        setTasks(allTasks.filter((t: Task) => t.username === username));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        const allTasks = JSON.parse(localStorage.getItem('user_tasks') || '[]');

        if (editingId) {
            const updated = allTasks.map((t: Task) =>
                t.id === editingId ? { ...t, title, date, category } : t
            );
            saveToLocal(updated);
            setEditingId(null);
        } else {
            const newTask: Task = {
                id: crypto.randomUUID(),
                title,
                date,
                category,
                completed: false,
                username
            };
            saveToLocal([...allTasks, newTask]);
        }

        setTitle('');
        setDate(new Date().toISOString().split('T')[0]);
        setCategory('Lavoro');
    };

    const startEdit = (task: Task) => {
        setEditingId(task.id);
        setTitle(task.title);
        setDate(task.date);
        setCategory(task.category);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleTask = (id: string) => {
        const allTasks = JSON.parse(localStorage.getItem('user_tasks') || '[]');
        const updated = allTasks.map((t: Task) =>
            t.id === id ? { ...t, completed: !t.completed } : t
        );
        saveToLocal(updated);
    };

    const deleteTask = (id: string) => {
        const allTasks = JSON.parse(localStorage.getItem('user_tasks') || '[]');
        const updated = allTasks.filter((t: Task) => t.id !== id);
        saveToLocal(updated);
    };

    return (
        <div className="task-manager-container">
            <div className="task-input-card">
                <h3>{editingId ? '✏️ Modifica Task' : '➕ Nuovo Task'}</h3>
                <form onSubmit={handleSubmit} className="task-form">
                    <input
                        type="text"
                        placeholder="Cosa devi fare?"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input-field"
                    />
                    <div className="form-row">
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="input-field"
                        />
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value as any)}
                            className="input-field select-field"
                        >
                            <option value="Lavoro">Lavoro</option>
                            <option value="Personale">Personale</option>
                            <option value="Urgente">Urgente</option>
                        </select>
                    </div>
                    <div className="button-group">
                        <button type="submit" className="submit-button">
                            {editingId ? 'Salva Modifiche' : 'Aggiungi Task'}
                        </button>
                        {editingId && (
                            <button
                                type="button"
                                onClick={() => {
                                    setEditingId(null);
                                    setTitle('');
                                }}
                                className="cancel-btn"
                            >
                                Annulla
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="task-list">
                <h3>📋 I tuoi Task ({tasks.length})</h3>
                {tasks.length === 0 ? (
                    <p className="no-tasks">Nessun task per ora.</p>
                ) : (
                    <div className="tasks-grid">
                        {tasks.sort((a, b) => a.date.localeCompare(b.date)).map(task => (
                            <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''} mono-theme category-${task.category.toLowerCase()}`}>
                                <div className="task-info">
                                    <span className="task-date">{new Date(task.date).toLocaleDateString()}</span>
                                    <span className="task-title">{task.title.replace(/\p{Emoji}/gu, '')}</span>
                                    <span className={`task-badge category-${task.category.toLowerCase()}`}>{task.category}</span>
                                </div>
                                <div className="task-actions">
                                    <button onClick={() => toggleTask(task.id)} className="action-btn mono" title="Completa">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M20 6L9 17l-5-5" />
                                        </svg>
                                    </button>
                                    <button onClick={() => startEdit(task)} className="action-btn mono" title="Modifica">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                        </svg>
                                    </button>
                                    <button onClick={() => deleteTask(task.id)} className="action-btn mono danger" title="Elimina">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
