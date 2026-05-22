import { useEffect, useMemo, useState } from 'react';
import { api } from '../api/client';
import { Group } from '../types';
import { getStyles } from './styles';

export function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [groupName, setGroupName] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newSubtaskTitles, setNewSubtaskTitles] = useState<Record<string, string>>({});
  const [newCommentTitles, setNewCommentTitles] = useState<Record<string, string>>({});

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const styles = useMemo(() => getStyles(isMobile), [isMobile]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadGroups = async () => {
    const res = await api.get('/groups');
    setGroups(res.data);
    if (selectedGroup) {
      const updatedSelected = res.data.find((g: Group) => g.id === selectedGroup.id);
      setSelectedGroup(updatedSelected || null);
    }
  };

  useEffect(() => {
    loadGroups();
  }, []);

  const createGroup = async () => {
    if (!groupName.trim()) return;
    await api.post('/groups', { name: groupName });
    setGroupName('');
    await loadGroups();
  };

  const selectGroup = (group: Group) => {
    setSelectedGroup(group);
    setNewTaskTitle('');
    setNewSubtaskTitles({});
  };

  const deleteGroup = async (groupId: string) => {
    await api.delete(`/groups/${groupId}`);

    if (selectedGroup?.id === groupId) {
      setSelectedGroup(null);
      setNewTaskTitle('');
      setNewSubtaskTitles({});
    }

    await loadGroups();
  };

  const addTask = async () => {
    if (!selectedGroup || !newTaskTitle.trim()) return;
    await api.post('/tasks', { title: newTaskTitle, groupId: selectedGroup.id });
    setNewTaskTitle('');
    await loadGroups();
  };

  const addSubtask = async (taskId: string) => {
    const title = newSubtaskTitles[taskId];
    if (!title?.trim()) return;
    await api.post('/subtasks', { title, taskId });
    setNewSubtaskTitles((prev) => ({ ...prev, [taskId]: '' }));
    await loadGroups();
  };

  const addComment = async (taskId: string) => {
    const text = newCommentTitles[taskId];
    if (!text?.trim()) return;

    await api.post('/comments', { text, taskId });
    setNewCommentTitles(prev => ({ ...prev, [taskId]: '' }));
    await loadGroups();
  };

  const currentGroup = groups.find((g) => g.id === selectedGroup?.id) || null;

  return (
    <div style={styles.container}>
      {/* Глобальные стили для анимаций */}
      <style>{`
        * {
          box-sizing: border-box;
        }

        .group-item {
          transition: all 0.2s ease;
        }
        .group-item:hover {
          background-color: #3d3d3d !important;
          padding-left: 18px !important;
        }
        .task-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .task-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
        }
        .action-button {
          transition: filter 0.2s ease;
        }
        .action-button:hover {
          filter: brightness(1.2);
        }
      `}</style>

      {(isMobile) && (
        <button
          onClick={() => setIsSidebarOpen(prev => !prev)}
          style={styles.menuButton}
        >
          ☰
        </button>
      )}

      {(!isMobile || isSidebarOpen) && (
        <aside style={styles.sidebar}>
          <div style={styles.sidebarHeader}>
            <h2 style={styles.title}>Проекты</h2>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault(); // Обязательно отменяем перезагрузку страницы
              createGroup();
            }}
            style={styles.groupCreate}>
            <input
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Новая группа"
              style={styles.sidebarInput}
            />
            <button style={styles.primaryButton} className="action-button">
              +
            </button>
          </form>

          <div style={styles.groupList}>
            {groups.map((group) => (
              <div
                key={group.id}
                className="group-item"
                style={{
                  ...styles.groupItem,
                  ...(selectedGroup?.id === group.id ? styles.groupItemActive : {}),
                }}
              >
                <button
                  onClick={() => selectGroup(group)}
                  style={styles.groupSelectButton}
                >
                  <span style={{ marginRight: 8 }}>#</span>
                  <span>{group.name}</span>
                </button>

                <button
                  onClick={() => deleteGroup(group.id)}
                  style={styles.deleteButton}
                  className="action-button"
                  title="Удалить группу"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </aside>
      )}

      <main style={styles.content}>
        {currentGroup ? (
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <h1 style={styles.contentTitle}>{currentGroup.name}</h1>

            <div style={styles.taskCreate}>
              <input
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Добавить задачу в список..."
                style={styles.input}
              />
              <button onClick={addTask} style={styles.primaryButton} className="action-button">
                Добавить задачу
              </button>
            </div>

            <div style={styles.taskList}>
              {currentGroup.tasks?.map((task: any) => (
                <div key={task.id} style={styles.taskCard}>
                  <div style={styles.taskTitle}>{task.title}</div>

                  {/* ПОДЗАДАЧИ */}
                  <div style={styles.subtaskList}>
                    {task.subtasks?.map((subtask: any) => (
                      <div key={subtask.id} style={styles.subtaskItem}>
                        <div style={styles.subtaskDot} />
                        {subtask.title}
                      </div>
                    ))}
                  </div>

                  {/* КОММЕНТАРИИ */}
                  <div style={{ ...styles.subtaskList, borderTop: '1px solid #f0f0f0', paddingTop: 10, marginTop: 10 }}>
                    <span style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>Комментарии:</span>
                    {task.comments?.map((comment: any) => (
                      <div key={comment.id} style={{ ...styles.subtaskItem, color: '#444', fontStyle: 'italic' }}>
                        💬 {comment.text}
                      </div>
                    ))}
                  </div>

                  {/* ВВОД НОВОЙ ПОДЗАДАЧИ */}
                  <div style={styles.subtaskCreate}>
                    <input
                      value={newSubtaskTitles[task.id] || ''}
                      onChange={(e) => setNewSubtaskTitles(prev => ({ ...prev, [task.id]: e.target.value }))}
                      placeholder="Добавить подзадачу"
                      style={styles.smallInput}
                    />
                    <button onClick={() => addSubtask(task.id)} style={styles.secondaryButton}>+</button>
                  </div>

                  {/* ВВОД КОММЕНТАРИЯ */}
                  <div style={{ ...styles.subtaskCreate, marginTop: 8 }}>
                    <input
                      value={newCommentTitles[task.id] || ''}
                      onChange={(e) => setNewCommentTitles(prev => ({ ...prev, [task.id]: e.target.value }))}
                      placeholder="Написать комментарий..."
                      style={{ ...styles.smallInput, backgroundColor: '#f9f9f9' }}
                    />
                    <button
                      onClick={() => addComment(task.id)}
                      style={{ ...styles.secondaryButton, backgroundColor: '#888' }}
                    >
                      ➤
                    </button>
                  </div>
                </div>
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
    </div>
  );
}