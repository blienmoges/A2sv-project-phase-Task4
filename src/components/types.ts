export interface ITodo {
  id: string;
  task: string;
  completed: boolean;
  isEditing: boolean;
}

export type FilterType = 'all' | 'active' | 'completed';