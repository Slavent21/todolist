type Props = {
  task: any;
  styles: any;
  onClick: () => void;
};

export function TaskCard({ task, styles, onClick }: Props) {
  return (
      <div
          style={styles.taskCard}
          className="task-card"
          onClick={onClick}
      >
          <span>Приоритет: {task.priority}</span>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={styles.taskTitle}>{task.title}</div>
          </div>
      </div>
  );
}