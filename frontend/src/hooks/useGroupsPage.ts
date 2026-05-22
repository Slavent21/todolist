import { useEffect, useState } from 'react';
import { Group } from '../types';
import { api } from '../api/client';

export function useGroupsPage() {
    const [groups, setGroups] = useState<Group[]>([]);
    const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
    const [groupName, setGroupName] = useState('');
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newSubtaskTitles, setNewSubtaskTitles] = useState<Record<string, string>>({});
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const loadGroups = async () => {
        const res = await api.get('/groups');
        setGroups(res.data);
    };

    useEffect(() => {
        loadGroups();
    }, []);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const selectedGroup = groups.find((g) => g.id === selectedGroupId) || null;

    const selectGroup = (group: Group) => {
        setSelectedGroupId(group.id);
        if (isMobile) setIsSidebarOpen(false);
    };

    const createGroup = async () => {
        if (!groupName.trim()) return;
        await api.post('/groups', { name: groupName });
        setGroupName('');
        await loadGroups();
    };

    const deleteGroup = async (groupId: string) => {
        await api.delete(`/groups/${groupId}`);
        if (selectedGroupId === groupId) setSelectedGroupId(null);
        await loadGroups();
    };

    const addTask = async () => {
        if (!selectedGroupId || !newTaskTitle.trim()) return;
        await api.post('/tasks', {
            groupId: selectedGroupId,
            title: newTaskTitle,
        });
        setNewTaskTitle('');
        await loadGroups();
    };

    const addSubtask = async (taskId: string) => {
        const title = newSubtaskTitles[taskId];
        if (!title?.trim()) return;

        await api.post('/subtasks', {
            taskId,
            title,
        });

        setNewSubtaskTitles((prev) => ({
            ...prev,
            [taskId]: '',
        }));

        await loadGroups();
    };

    const deleteTask = async (taskId: string) => {
        await api.delete(`/tasks/${taskId}`);
        await loadGroups();
    };

    const deleteComment = async (commentId: string) => {
        await api.delete(`/comments/${commentId}`);
        await loadGroups();
    };

    return {
        groups,
        selectedGroupId,
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
        setIsMobile,
        selectGroup,
        createGroup,
        deleteGroup,
        addTask,
        addSubtask,
        deleteTask,
        deleteComment,
        loadGroups,
    };
}