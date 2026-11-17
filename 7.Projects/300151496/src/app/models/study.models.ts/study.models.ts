export interface Course { id: string; name: string; code: string; color: string; instructor?: string; }
export type TaskType = 'Devoir' | 'Révision' | 'Lecture' | 'Projet';
export interface StudyTask { id: string; title: string; courseId: string; dueDate: string; priority: 'Basse' | 'Moyenne' | 'Haute'; type: TaskType; done: boolean; notes?: string; }
