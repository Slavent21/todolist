import { Group } from '../../../types';

type Props = {
    styles: any;
    isMobile: boolean;
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    groups: Group[];
    selectedGroup: Group | null;
    groupName: string;
    setGroupName: React.Dispatch<React.SetStateAction<string>>;
    createGroup: () => void;
    selectGroup: (group: Group) => void;
    deleteGroup: (groupId: string) => void;
};

export function Sidebar({
    styles,
    isMobile,
    isSidebarOpen,
    setIsSidebarOpen,
    groups,
    selectedGroup,
    groupName,
    setGroupName,
    createGroup,
    selectGroup,
    deleteGroup,
}: Props) {
    if (isMobile && !isSidebarOpen) {
        return (
            <button onClick={() => setIsSidebarOpen(true)} style={styles.menuButton}>
                ☰
            </button>
        );
    }

    return (
        <>
            <style>{`
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
            {isMobile && (
                <button
                    onClick={() => setIsSidebarOpen((prev) => !prev)}
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
                            e.preventDefault();
                            createGroup();
                        }}
                        style={styles.groupCreate}
                    >
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
        </>
    );
}