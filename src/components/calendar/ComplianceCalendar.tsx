import React, { useState } from 'react';
import { ComplianceTask } from '../../types';
import { formatDate } from '../../utils/dateUtils';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface ComplianceCalendarProps {
  tasks: ComplianceTask[];
}

const ComplianceCalendar: React.FC<ComplianceCalendarProps> = ({ tasks }) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  // Calendar navigation functions
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    setSelectedDate(null);
  };
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    setSelectedDate(null);
  };
  
  // Getting days in month for the calendar grid
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  // Rendering the calendar
  const renderCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200 bg-gray-50"></div>);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split('T')[0];
      
      // Filter tasks for this day
      const dayTasks = tasks.filter(task => {
        const taskDate = new Date(task.dueDate);
        return taskDate.getFullYear() === year && 
               taskDate.getMonth() === month && 
               taskDate.getDate() === day;
      });
      
      // Determine if this day has tasks by status
      const hasPending = dayTasks.some(task => task.status === 'Pending');
      const hasCompleted = dayTasks.some(task => task.status === 'Completed');
      const hasOverdue = dayTasks.some(task => task.status === 'Overdue');
      
      const isSelected = selectedDate && 
                         selectedDate.getFullYear() === year &&
                         selectedDate.getMonth() === month &&
                         selectedDate.getDate() === day;
      
      days.push(
        <div 
          key={day} 
          className={`h-24 border border-gray-200 p-1 ${isSelected ? 'bg-blue-50 border-blue-300' : ''} hover:bg-gray-50 cursor-pointer`}
          onClick={() => setSelectedDate(date)}
        >
          <div className="flex justify-between items-start">
            <span className={`text-sm font-medium ${isSelected ? 'text-blue-600' : ''}`}>
              {day}
            </span>
            <div className="flex space-x-1">
              {hasPending && <div className="w-2 h-2 rounded-full bg-[#F8B817]"></div>}
              {hasCompleted && <div className="w-2 h-2 rounded-full bg-[#059669]"></div>}
              {hasOverdue && <div className="w-2 h-2 rounded-full bg-[#DC2626]"></div>}
            </div>
          </div>
          {dayTasks.length > 0 && (
            <div className="mt-1 text-xs">
              {dayTasks.slice(0, 2).map((task, index) => (
                <div 
                  key={index} 
                  className={`truncate px-1 py-0.5 rounded-sm mb-0.5
                    ${task.status === 'Pending' ? 'bg-[#FEF3C7] text-[#D97706]' : ''}
                    ${task.status === 'Completed' ? 'bg-[#D1FAE5] text-[#059669]' : ''}
                    ${task.status === 'Overdue' ? 'bg-[#FEE2E2] text-[#DC2626]' : ''}`
                  }
                >
                  {task.title}
                </div>
              ))}
              {dayTasks.length > 2 && (
                <div className="text-xs text-gray-500 pl-1">+{dayTasks.length - 2} more</div>
              )}
            </div>
          )}
        </div>
      );
    }
    
    return days;
  };
  
  // Get tasks for selected date
  const getSelectedDateTasks = () => {
    if (!selectedDate) return [];
    
    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return taskDate.getFullYear() === selectedDate.getFullYear() && 
             taskDate.getMonth() === selectedDate.getMonth() && 
             taskDate.getDate() === selectedDate.getDate();
    });
  };
  
  const selectedDateTasks = getSelectedDateTasks();
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-[#31A7BC] mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">
            Compliance Calendar
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={prevMonth}
            className="p-1 rounded-full hover:bg-gray-200"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-lg font-medium">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </span>
          <button
            onClick={nextMonth}
            className="p-1 rounded-full hover:bg-gray-200"
            aria-label="Next month"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-7 gap-px mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center py-2 text-sm font-medium text-gray-600">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-px">
          {renderCalendarDays()}
        </div>
        
        {selectedDate && (
          <div className="mt-6 border-t border-gray-200 pt-4">
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Tasks for {formatDate(selectedDate.toISOString())}
            </h3>
            
            {selectedDateTasks.length > 0 ? (
              <div className="space-y-2">
                {selectedDateTasks.map((task) => (
                  <div 
                    key={task.id} 
                    className={`p-3 rounded-md border-l-4 
                      ${task.status === 'Pending' ? 'border-[#F8B817] bg-[#FEF3C7]/30' : ''}
                      ${task.status === 'Completed' ? 'border-[#059669] bg-[#D1FAE5]/30' : ''}
                      ${task.status === 'Overdue' ? 'border-[#DC2626] bg-[#FEE2E2]/30' : ''}`
                    }
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">{task.title}</h4>
                        <p className="text-sm text-gray-500">Assigned to: {task.assignedTo}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                        ${task.status === 'Pending' ? 'bg-[#FEF3C7] text-[#D97706]' : ''}
                        ${task.status === 'Completed' ? 'bg-[#D1FAE5] text-[#059669]' : ''}
                        ${task.status === 'Overdue' ? 'bg-[#FEE2E2] text-[#DC2626]' : ''}`
                      }>
                        {task.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No tasks scheduled for this date</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplianceCalendar;