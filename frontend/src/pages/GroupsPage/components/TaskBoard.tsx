import { Group } from '../../../types';
import { TaskCard } from './TaskCard';

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

                    <div style={styles.taskList}>
                        {currentGroup.tasks?.map((task: any) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                styles={styles}
                                newSubtaskTitle={newSubtaskTitles[task.id] || ''}
                                setNewSubtaskTitle={(value) =>
                                    setNewSubtaskTitles((prev) => ({ ...prev, [task.id]: value }))
                                }
                                addSubtask={() => addSubtask(task.id)}
                                deleteTask={() => deleteTask(task.id)}
                            />
                        ))}
                    </div>
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