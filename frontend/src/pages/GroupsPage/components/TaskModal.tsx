type Props = {
    task: any;
    styles: any;
    newSubtaskTitle: string;
    setNewSubtaskTitle: (value: string) => void;
    addSubtask: () => void;
    deleteTask: () => void;
    onClose: () => void;
};

export function TaskModal({
    task,
    styles,
    newSubtaskTitle,
    setNewSubtaskTitle,
    addSubtask,
    deleteTask,
    onClose,
}: Props) {
    return (
        <div style={styles.modalOverlay} onClick={onClose}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={styles.modalTitle}>{task.title}</h2>
                    <button onClick={onClose} style={styles.deleteButton} className="action-button">
                        ×
                    </button>
                </div>

                <div style={{ marginTop: 16 }}>
                    <div style={styles.subtaskList}>
                        {task.subtasks?.map((subtask: any) => (
                            <div key={subtask.id} style={styles.subtaskItem}>
                                <div style={styles.subtaskDot} />
                                {subtask.title}
                            </div>
                        ))}
                    </div>
                </div>

                <div style={styles.subtaskCreate}>
                    <input
                        value={newSubtaskTitle}
                        onChange={(e) => setNewSubtaskTitle(e.target.value)}
                        placeholder="Добавить подзадачу"
                        style={styles.smallInput}
                    />
                    <button onClick={addSubtask} style={styles.secondaryButton}>
                        +
                    </button>
                </div>

                <div style={{ marginTop: 16 }}>
                    <button onClick={deleteTask} style={styles.deleteButton} className="action-button">
                        Удалить задачу
                    </button>
                </div>
            </div>
        </div>
    );
}