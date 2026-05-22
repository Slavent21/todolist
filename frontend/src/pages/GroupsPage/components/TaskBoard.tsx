import { useState, useMemo } from 'react';
import { Group } from '../../../types';
import { TaskCard } from './TaskCard';
import { TaskModal } from './TaskModal';

type Props = {
    styles: any;
    currentGroup: Group | null;
    newTaskTitle: string;
    setNewTaskTitle: React.Dispatch<React.SetStateAction<string>>;
    addTask: () => void;
    newSubtaskTitles: Record<string, string>;
    setNewSubtaskTitles: React.Dispatch<React.SetStateAction<Record<string, string>>>;
    addSubtask: (taskId: string) => void;
    deleteTask: (taskId: string) => void;
};

// Типы сортировки
type SortOption = 'date' | 'priority' | 'alphabetical';

export function TaskBoard({
    styles,
    currentGroup,
    newTaskTitle,
    setNewTaskTitle,
    addTask,
    newSubtaskTitles,
    setNewSubtaskTitles,
    addSubtask,
    deleteTask,
}: Props) {
    const [selectedTask, setSelectedTask] = useState<any | null>(null);
    const [sortBy, setSortBy] = useState<SortOption>('date');

    // Логика сортировки задач
    const sortedTasks = useMemo(() => {
        if (!currentGroup?.tasks) return [];
        
        return [...currentGroup.tasks].sort((a, b) => {
            if (sortBy === 'priority') {
                return (b.priority || 0) - (a.priority || 0); // По убыванию приоритета
            }
            if (sortBy === 'alphabetical') {
                return a.title.localeCompare(b.title);
            }
            // По умолчанию по дате (новые сверху)
            return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        });
    }, [currentGroup?.tasks, sortBy]);

    return (
        <main style={styles.content}>
            {currentGroup ? (
                <div style={{ maxWidth: 700, margin: '0 auto' }}>
                    <h1 style={styles.contentTitle}>{currentGroup.name}</h1>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            addTask();
                        }}
                        style={styles.taskCreate}
                    >
                        <input
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            placeholder="Добавить задачу в список..."
                            style={styles.input}
                        />
                        <button style={styles.primaryButton} className="action-button">
                            Добавить задачу
                        </button>
                    </form>

                    {/* Блок управления сортировкой */}
                    <div style={{ marginBottom: 16, display: 'flex', gap: 10, alignItems: 'center' }}>
                        <span style={{ fontSize: 13, color: '#666' }}>Сортировать:</span>
                        <select 
                            value={sortBy} 
                            onChange={(e) => setSortBy(e.target.value as SortOption)}
                            style={{
                                padding: '4px 8px',
                                borderRadius: 6,
                                border: '1px solid #ddd',
                                fontSize: 13,
                                outline: 'none'
                            }}
                        >
                            <option value="date">По дате создания</option>
                            <option value="priority">По приоритету</option>
                            <option value="alphabetical">По алфавиту</option>
                        </select>
                    </div>

                    <div style={styles.taskList}>
                        {sortedTasks.map((task: any) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                styles={styles}
                                onClick={() => setSelectedTask(task)}
                            />
                        ))}
                    </div>

                    {selectedTask && (
                        <TaskModal
                            task={selectedTask}
                            styles={styles}
                            newSubtaskTitle={newSubtaskTitles[selectedTask.id] || ''}
                            setNewSubtaskTitle={(value) =>
                                setNewSubtaskTitles((prev) => ({
                                    ...prev,
                                    [selectedTask.id]: value,
                                }))
                            }
                            addSubtask={() => addSubtask(selectedTask.id)}
                            deleteTask={() => {
                                deleteTask(selectedTask.id);
                                setSelectedTask(null);
                            }}
                            onClose={() => setSelectedTask(null)}
                        />
                    )}
                </div>
            ) : (
                <div style={styles.centeredNotice}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>🎯</div>
                    Выберите проект для начала работы
                </div>
            )}
        </main>
    );
}