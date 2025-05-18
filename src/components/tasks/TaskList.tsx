import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ComplianceTask } from '../../types';
import { formatDate } from '../../utils/dateUtils';
import { Eye, Edit, Trash, FileText } from 'lucide-react';

interface TaskListProps {
  tasks: ComplianceTask[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('dueDate');
  
  const filteredTasks = tasks.filter(task => {
    // Filter by status
    if (filter !== 'all' && task.status.toLowerCase() !== filter) {
      return false;
    }
    
    // Filter by search term
    if (search && !task.title.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    
    return true;
  }).sort((a, b) => {
    // Sort tasks
    if (sortBy === 'dueDate') {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    } else if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else {
      return 0;
    }
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
        <div className="w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search compliance tasks..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#31A7BC]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-3">
          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#31A7BC]"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
          
          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#31A7BC]"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="dueDate">Sort by Due Date</option>
            <option value="title">Sort by Title</option>
          </select>
          
          <Link
            to="/tasks/new"
            className="px-4 py-2 bg-[#F8B817] text-white font-medium rounded hover:bg-[#e6a915] transition-colors"
          >
            Create New Task
          </Link>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Compliance Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assigned To
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="font-medium text-gray-900">{task.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {task.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(task.dueDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {task.assignedTo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${task.status === 'Pending' ? 'bg-[#FEF3C7] text-[#D97706]' : ''}
                    ${task.status === 'Completed' ? 'bg-[#D1FAE5] text-[#059669]' : ''}
                    ${task.status === 'Overdue' ? 'bg-[#FEE2E2] text-[#DC2626]' : ''}`
                  }>
                    {task.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <Link to={`/tasks/${task.id}`} className="text-[#31A7BC] hover:text-[#2590a3]">
                      <Eye className="h-5 w-5" />
                    </Link>
                    <Link to={`/tasks/edit/${task.id}`} className="text-blue-600 hover:text-blue-900">
                      <Edit className="h-5 w-5" />
                    </Link>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredTasks.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                  No compliance tasks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">
            Showing {filteredTasks.length} of {tasks.length} tasks
          </p>
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-white rounded border border-gray-300">Previous</button>
          <button className="px-3 py-1 bg-white rounded border border-gray-300">Next</button>
        </div>
      </div>
    </div>
  );
};

export default TaskList;