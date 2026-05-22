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