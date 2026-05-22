type Props = {
    task: any;
    styles: any;
    newSubtaskTitle: string;
    setNewSubtaskTitle: (value: string) => void;
    addSubtask: () => void;
    deleteTask: () => void;
  };
  
  export function TaskCard({
    task,
    styles,
    newSubtaskTitle,
    setNewSubtaskTitle,
    addSubtask,
    deleteTask,
  }: Props) {
    return (
      <div key={task.id} style={styles.taskCard} className="task-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={styles.taskTitle}>{task.title}</div>
          <button
            onClick={deleteTask}
            style={styles.deleteButton}
            className="action-button"
            title="Удалить задачу"
          >
            ×
          </button>
        </div>
  
        <div style={styles.subtaskList}>
          {task.subtasks?.map((subtask: any) => (
            <div key={subtask.id} style={styles.subtaskItem}>
              <div style={styles.subtaskDot} />
              {subtask.title}
            </div>
          ))}
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
      </div>
    );
  }