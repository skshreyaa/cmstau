export interface ComplianceTask {
  id: string;
  title: string;
  category: 'Government' | 'Internal';
  description: string;
  dueDate: string;
  assignedTo: string;
  status: 'Pending' | 'Completed' | 'Overdue';
  recurrence: 'None' | 'Monthly' | 'Quarterly' | 'Yearly';
  documents: Document[];
  auditTrail: AuditEntry[];
}

export interface Document {
  id: string;
  name: string;
  uploadDate: string;
}

export interface AuditEntry {
  id: string;
  date: string;
  action: string;
  user: string;
}

export interface DepartmentReport {
  name: string;
  total: number;
  completed: number;
  overdue: number;
  escalations: number;
}