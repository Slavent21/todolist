export type Group = {
    [x: string]: any;
    id: string;
    name: string;
    color?: string | null;
  };
  
  export type Task = {
    id: string;
    title: string;
    description?: string | null;
    completed: boolean;
    groupId: string;
    priority: number
  };
  
  export type Comment = {
    id: string;
    text: string;
    taskId: string;
  };
  
  export type Subtask = {
    id: string;
    title: string;
    completed: boolean;
    taskId: string;
  };