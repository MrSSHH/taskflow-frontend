export interface DueDates {
  id: number;
  dueDates: string;
}

export interface Task {
  id: number;
  title: string;
  body: string;
  dueDates: DueDates[] | string[];
}
