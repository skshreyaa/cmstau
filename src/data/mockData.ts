import { ComplianceTask, DepartmentReport } from '../types';

export const mockTasks: ComplianceTask[] = [
  {
    id: '1',
    title: 'TDS Filing - Accounts Dept.',
    category: 'Government',
    description: 'Quarterly Tax Deducted at Source (TDS) filing for the Accounts Department.',
    dueDate: '2025-05-02',
    assignedTo: 'Ms. Y',
    status: 'Pending',
    recurrence: 'Quarterly',
    documents: [
      { id: 'd1', name: 'Previous Quarter Filing.pdf', uploadDate: '2025-01-15' }
    ],
    auditTrail: [
      { id: 'a1', date: '2025-01-15', action: 'Created', user: 'Officer X' },
      { id: 'a2', date: '2025-01-16', action: 'Assigned to Ms. Y', user: 'Officer X' }
    ]
  },
  {
    id: '2',
    title: 'Fire Safety AMC Renewal',
    category: 'Internal',
    description: 'Annual Maintenance Contract renewal for fire safety equipment.',
    dueDate: '2025-04-10',
    assignedTo: 'Mr. Z',
    status: 'Overdue',
    recurrence: 'Yearly',
    documents: [],
    auditTrail: [
      { id: 'a3', date: '2025-03-01', action: 'Created', user: 'Admin A' },
      { id: 'a4', date: '2025-03-02', action: 'Assigned to Mr. Z', user: 'Admin A' }
    ]
  },
  {
    id: '3',
    title: 'Annual Health Inspection',
    category: 'Government',
    description: 'University health facilities inspection by health department.',
    dueDate: '2025-06-15',
    assignedTo: 'Dr. W',
    status: 'Pending',
    recurrence: 'Yearly',
    documents: [
      { id: 'd2', name: 'Last year inspection report.pdf', uploadDate: '2024-06-20' }
    ],
    auditTrail: [
      { id: 'a5', date: '2025-04-01', action: 'Created', user: 'Dean K' },
      { id: 'a6', date: '2025-04-02', action: 'Assigned to Dr. W', user: 'Dean K' }
    ]
  },
  {
    id: '4',
    title: 'Student Enrollment Reporting',
    category: 'Government',
    description: 'Reporting of student enrollment figures to education department.',
    dueDate: '2025-06-30',
    assignedTo: 'Ms. P',
    status: 'Pending',
    recurrence: 'Yearly',
    documents: [],
    auditTrail: [
      { id: 'a7', date: '2025-04-05', action: 'Created', user: 'Registrar M' },
      { id: 'a8', date: '2025-04-05', action: 'Assigned to Ms. P', user: 'Registrar M' }
    ]
  },
  {
    id: '5',
    title: 'Annual Financial Audit',
    category: 'Government',
    description: 'Yearly financial audit by external auditors.',
    dueDate: '2025-04-05',
    assignedTo: 'Mr. F',
    status: 'Completed',
    recurrence: 'Yearly',
    documents: [
      { id: 'd3', name: 'Financial statements.pdf', uploadDate: '2025-03-15' },
      { id: 'd4', name: 'Audit report.pdf', uploadDate: '2025-04-03' }
    ],
    auditTrail: [
      { id: 'a9', date: '2025-02-15', action: 'Created', user: 'CFO J' },
      { id: 'a10', date: '2025-02-16', action: 'Assigned to Mr. F', user: 'CFO J' },
      { id: 'a11', date: '2025-04-03', action: 'Marked as Completed', user: 'Mr. F' }
    ]
  }
];

export const mockDepartmentReports: DepartmentReport[] = [
  { name: 'Finance', total: 12, completed: 9, overdue: 1, escalations: 1 },
  { name: 'Facilities', total: 8, completed: 5, overdue: 2, escalations: 2 },
  { name: 'HR', total: 10, completed: 7, overdue: 0, escalations: 0 },
  { name: 'Academics', total: 15, completed: 10, overdue: 2, escalations: 1 },
  { name: 'Research', total: 7, completed: 6, overdue: 0, escalations: 0 }
];