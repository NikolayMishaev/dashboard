export interface ITicketFields {
  title: string;
  priority:string;
  description?:string;
  completed:boolean;
  uid:string;
  displayName:string;
  photoURL:string;
  id:string;
  confirmDelete?:boolean;
  createdAt: {seconds: number};
  editedAt: {seconds: number};
  completedAt: {seconds: number};
}

export interface ITicketFieldsUpdate {
  title?: string;
  priority?: string;
  description?: string;
  completed?: boolean;
}

export interface IStyle {
  [key:string]:string
}