import React from 'react';
import { ComplianceTask } from '../../types';
import { formatDate } from '../../utils/dateUtils';
import { Bell } from 'lucide-react';

interface NotificationsProps {
  tasks: ComplianceTask[];
}

const Notifications: React.FC<NotificationsProps> = ({ tasks }) => {
  // Filter tasks to show only those that are overdue or due in the next 7 days
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);
  
  const urgentTasks = tasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    return (
      task.status !== 'Completed' && 
      (dueDate <= nextWeek || task.status === 'Overdue')
    );
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center">
        <Bell className="h-5 w-5 text-[#F8B817] mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Important Notifications</h2>
      </div>
      <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
        {urgentTasks.map((task) => {
          const dueDate = new Date(task.dueDate);
          const isOverdue = dueDate < today;
          const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          
          let message = '';
          if (isOverdue) {
            message = `${task.title} is overdue by ${Math.abs(daysUntilDue)} days`;
          } else if (daysUntilDue <= 2) {
            message = `${task.title} due in ${daysUntilDue} days`;
          } else {
            message = `${task.title} due on ${formatDate(task.dueDate)}`;
          }
          
          return (
            <div 
              key={task.id}
              className={`p-3 rounded-md ${
                isOverdue ? 'bg-red-50 border-l-4 border-red-500' : 
                daysUntilDue <= 2 ? 'bg-yellow-50 border-l-4 border-yellow-500' : 
                'bg-blue-50 border-l-4 border-blue-500'
              } transition-all hover:shadow-md`}
            >
              <p className="text-sm font-medium">
                {message}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Assigned to: {task.assignedTo}
              </p>
            </div>
          );
        })}
        {urgentTasks.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            <p>No urgent notifications</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;