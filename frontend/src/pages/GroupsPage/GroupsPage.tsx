import { useMemo } from "react";
import { useGroupsPage } from "../../hooks/useGroupsPage";
import { Sidebar } from "./components/Sidebar";
import { TaskBoard } from "./components/TaskBoard";
import { getStyles } from "../styles";

export function GroupsPage() {
  const {
    groups,
    selectedGroup,
    groupName,
    setGroupName,
    newTaskTitle,
    setNewTaskTitle,
    newSubtaskTitles,
    setNewSubtaskTitles,
    isSidebarOpen,
    setIsSidebarOpen,
    isMobile,
    selectGroup,
    createGroup,
    deleteGroup,
    addTask,
    addSubtask,
    deleteTask,
  } = useGroupsPage();

  const styles = useMemo(() => getStyles(isMobile), [isMobile]);

  return (
    <div style={styles.container}>
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

      <Sidebar
        styles={styles}
        isMobile={isMobile}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        groups={groups}
        selectedGroup={selectedGroup}
        groupName={groupName}
        setGroupName={setGroupName}
        createGroup={createGroup}
        selectGroup={selectGroup}
        deleteGroup={deleteGroup}
      />

      <TaskBoard
        styles={styles}
        currentGroup={selectedGroup}
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
        addTask={addTask}
        newSubtaskTitles={newSubtaskTitles}
        setNewSubtaskTitles={setNewSubtaskTitles}
        addSubtask={addSubtask}
        deleteTask={deleteTask}
      />
    </div>
  );
}