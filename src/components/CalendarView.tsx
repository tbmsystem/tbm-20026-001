import { useState, useEffect } from 'react';
import './CalendarView.css';

interface Task {
    date: string;
    title: string;
    category: string;
    username: string;
}

interface CalendarViewProps {
    username: string;
}

export default function CalendarView({ username }: CalendarViewProps) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('user_tasks') || '[]');
        setTasks(savedTasks.filter((t: Task) => t.username === username));
    }, [username]);

    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) => {
        let day = new Date(year, month, 1).getDay();
        return day === 0 ? 6 : day - 1; // Adjust to Monday start
    };

    const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthName = currentDate.toLocaleString('it-IT', { month: 'long' });

    const days = [];
    const startDay = firstDayOfMonth(year, month);
    const totalDays = daysInMonth(year, month);

    // Padding days
    for (let i = 0; i < startDay; i++) {
        days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Actual days
    for (let d = 1; d <= totalDays; d++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        const dayTasks = tasks.filter(t => t.date === dateStr);
        const isToday = new Date().toISOString().split('T')[0] === dateStr;

        days.push(
            <div key={d} className={`calendar-day ${isToday ? 'today' : ''} ${dayTasks.length > 0 ? 'has-tasks' : ''}`}>
                <span className="day-number">{d}</span>
                <div className="day-tasks-labels">
                    {dayTasks.slice(0, 3).map((t, i) => (
                        <div key={i} className={`task-label-mini mono category-${t.category.toLowerCase()}`} title={t.title}>
                            {t.title}
                        </div>
                    ))}
                    {dayTasks.length > 3 && (
                        <div className="more-tasks">+{dayTasks.length - 3} altro</div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <button onClick={prevMonth} className="nav-btn mono">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>
                <h2>{monthName} {year}</h2>
                <button onClick={nextMonth} className="nav-btn mono">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
            </div>

            <div className="calendar-grid">
                {['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'].map(d => (
                    <div key={d} className="calendar-weekday">{d}</div>
                ))}
                {days}
            </div>
        </div>
    );
}
